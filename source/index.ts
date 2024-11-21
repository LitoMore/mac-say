import spawn, {SubprocessError} from 'nano-spawn';
import {killRunningSay} from './utils.js';

export type SayOptions = {
	voice?: string;
	rate?: number;
	audioDevice?: string;
	quality?: number;
	inputFile?: string;
	outputFile?: string;
	networkSend?: string;
	channels?: number;
	skipRunningCheck?: boolean;
};

export async function say(text: string, options: SayOptions = {}) {
	if (!options.skipRunningCheck) {
		await killRunningSay();
	}

	const {voice, rate, audioDevice, quality, inputFile, outputFile, networkSend, channels} = options;
	try {
		await spawn(
			'say',
			[
				text.startsWith('-') ? ` ${text}` : text,
				voice && ['--voice', voice],
				rate && ['--rate', rate.toString()],
				audioDevice && ['--audio-device', audioDevice],
				quality && ['--quality', quality.toString()],
				inputFile && ['--input-file', inputFile],
				outputFile && ['--output-file', outputFile],
				networkSend && ['--network-send', networkSend],
				channels && ['--channels', channels.toString()],
			].flat().filter(Boolean) as string[],
		);
	} catch (error) {
		if (error instanceof SubprocessError && error.signalName === 'SIGKILL') {
			return;
		}

		throw error;
	}
}

export {
	getAudioDevices, getDataFormats, getFileFormats, getVoices, checkIfSayIsRunning, killRunningSay,
} from './utils.js';

export * from './types.js';
