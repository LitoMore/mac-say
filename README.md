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

## Options

All available options are listed below:

```typescript
declare function say(text: string, options?: SayOptions): void;

type SayOptions = {
	voice?: string;
	rate?: number;
	audioDevice?: string;
	quality?: number;
	inputFile?: string;
	outputFile?: string;
	networkSend?: string;
	channels?: number;
};
```

Please refer to [`man say`](https://www.unix.com/man-page/osx/1/say/) for usage of all options.

## API

### `getAudioDevices()`

To obtain a list of audio output devices.

Return a [`Promise<Device[]>`][types].

### `getDataFormats(fileFormat)`

To obtain a list of audio data formats for a file format specified explicitly or by file name.

Receives `fileFormat` in `string`. Returns a [`Promise<DataFormat[]>`][types].

### `getFileFormats()`

To obtain a list of writable file formats.

Returns a [`Promise<FileFormat[]>`][types].

### `getVoices()`

To obtain a list of voices installed in the system.

Returns a [`Promise<Voice[]>`][types].

## License

MIT

[types]: https://github.com/LitoMore/mac-say/blob/main/source/types.ts
