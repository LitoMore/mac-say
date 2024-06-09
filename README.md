# mac-say

The macOS built-in `say` CLI for JavaScript

## Install

```shell
npm i mac-say
```

## Usage

```javascript
import {say} from 'mac-say';

await say('Hello, world!');
await say('Hello! My name is Cellos.', {voice: 'Cellos'});
```

## API

### say(text, options?)

#### text

Type: `string`

The content to be converted to audible speech.

#### options

Type: `SayOptions`

Optional. All available options are listed below:

```typescript
type SayOptions = {
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
```

Please refer to [`man say`](https://www.unix.com/man-page/osx/1/say/) for usage of all options.

### getAudioDevices()

To obtain a list of audio output devices.

Returns a [`Promise<Device[]>`][types].

### getDataFormats(fileFormat)

To obtain a list of audio data formats for a file format specified explicitly or by file name.

Returns a [`Promise<DataFormat[]>`][types].

#### fileForamt

Type: `string`

Formats other than linear PCM are specified by giving their format identifiers (aac, alac).

### getFileFormats()

To obtain a list of writable file formats.

Returns a [`Promise<FileFormat[]>`][types].

### getVoices()

To obtain a list of voices installed in the system.

Returns a [`Promise<Voice[]>`][types].

### checkIfSayIsRunning()

To obtain the information of the `say` process.

Returns a [`Promise<ProcessDescriptor | undefined>`](https://github.com/sindresorhus/ps-list/blob/46f7d16920ed12c2866ddacc5044df7f8f87b179/index.d.ts#L13-L38).

### killRunningSay()

To kill the say process if it's running.

## Related

- [Say - Spoken Content](https://raycast.com/litomore/say) - macOS built-in Spoken Content interface

## License

MIT

[types]: https://github.com/LitoMore/mac-say/blob/main/source/types.ts
