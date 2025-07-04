import test from 'ava';
import {say} from 'mac-say';

test('say hello', async t => {
	await say('Hello, world!');
	t.pass();
});
