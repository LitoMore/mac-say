# mac-say

The macOS built-in `say` CLI for JavaScript

## Install

```shell
npm i mac-say
```

## Example

```javascript
import {say} from 'mac-say';

await say('Hello, world!');
await say('Hello! My name is Cellos.', {voice: 'Cellos'});
```

## Options

All available options are listed below:

```typescript
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
```

Please refer to [`man say`](https://www.unix.com/man-page/osx/1/say/) for ussage of all options.

## API

### `getAudioDevices()`

To obtain a list of audio output devices.

### `getDataFormats(fileFormat: string)`

To obtain a list of audio data formats for a file format specified explicitly or by file name.

### `getFileFormats()`

To obtain a list of writable file formats.

### `getVoices()`

To obtain a list of voices installed in the system.

## License

MIT
