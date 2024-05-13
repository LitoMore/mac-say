# mac-say

The macOS built-in `say` CLI for JavaScript

## Install

```shell
npm i mac-say
```

## Example

```javascript
import {say, getVoices} from 'mac-say';

say('Hello, world!');
```

## Options

All available options are listed below:

```
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

## License

MIT
