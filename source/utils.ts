import fkill from 'fkill';
import spawn from 'nano-spawn';
import psList from 'ps-list';
import type {
	DataFormat, Device, FileFormat, Voice,
} from './types.js';

const audioDeviceLinePattern = /^(?<id>\d+) +(?<name>.+)$/;
const dataFormatPattern = /^(?<format>[a-z]+ +(?<description>.+))$/;
const fileFormatPattern = /^(?<format>[a-zA-Z\d]+) +(?<description>.+[^ ]) +\((?<extensions>(\.[a-z\d]+,*)+)\) +\[(?<accFormats>(([a-z\d]+,*)+))]$/;
const voiceLinePattern = /^(?<name>.+[^ ]) +(?<languageCode>[a-z]{2}_[A-Z\d]{2,}) +# (?<example>.+)$/;

export const parseLine
	= <T>(
		pattern: RegExp,
		options?: {
			groupsParser?: (groups: Record<keyof T, string>) => T;
		},
	) =>
		(line: string) => {
			const match = pattern.exec(line.trim());
			if (match) {
				const groups = {...(match.groups as Record<keyof T, string>)};
				if (options?.groupsParser) {
					return options.groupsParser(groups);
				}

				return groups as T;
			}

			return undefined;
		};

export const getOptionValues = async <T>(
	options: string[],
	parser: (line: string) => T,
) => {
	const {stdout} = await spawn('say', [...options, '?']);
	return [...new Set(stdout.split('\n'))]
		.map(line => parser(line))
		.filter(Boolean) as Array<Exclude<T, undefined>>;
};

export const parseAudioDeviceLine = parseLine<Device>(audioDeviceLinePattern);
export const parseDataFormat = parseLine<DataFormat>(dataFormatPattern);
export const parseFileFormat = parseLine<FileFormat>(fileFormatPattern, {
	groupsParser: groups => ({
		...groups,
		extensions: groups.extensions.split(','),
		accFormats: groups.accFormats.split(','),
	}),
});
export const parseVoiceLine = parseLine<Voice>(voiceLinePattern);

export const getAudioDevices = async () => getOptionValues(['--audio-device'], parseAudioDeviceLine);
export const getDataFormats = async (fileFormat: string) => getOptionValues([`--file-format=${fileFormat}`, '--data-format'], parseDataFormat);
export const getFileFormats = async () => getOptionValues(['--file-format'], parseFileFormat);
export const getVoices = async () => getOptionValues(['--voice'], parseVoiceLine);

export const checkIfSayIsRunning = async () => {
	const processList = await psList();
	const found = processList.find(p => p.name === 'say' && p.cmd?.startsWith('say '));
	return found;
};

export const killRunningSay = async () => {
	const sayProcess = await checkIfSayIsRunning();
	if (sayProcess) {
		await fkill(sayProcess.pid, {force: true, silent: true});
	}
};
