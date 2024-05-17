import {execa} from 'execa';

export type SayOptions = {
	voice?: string;
	rate?: number;
	audioDevice?: string;
	quality?: number;
	inputFile?: string;
	outputFile?: string;
	networkSend?: string;
	channels?: number;
};

export async function say(text: string, options: SayOptions = {}) {
	const {voice, rate, audioDevice, quality, inputFile, outputFile, networkSend, channels} = options;
	await execa(
		'say',
		[
			text,
			voice && ['--voice', voice],
			rate && ['--rate', rate],
			audioDevice && ['--audio-device', audioDevice],
			quality && ['--quality', quality],
			inputFile && ['--input-file', inputFile],
			outputFile && ['--output-file', outputFile],
			networkSend && ['--network-send', networkSend],
			channels && ['--channels', channels],
		].flat().filter(Boolean) as string[],
	);
}

export {
	getAudioDevices, getDataFormats, getFileFormats, getVoices,
} from './utils.js';

export * from './types.js';
