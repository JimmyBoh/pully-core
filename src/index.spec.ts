import { test, TestContext } from 'ava';
import { query } from './index';

const EMPTY_STRING = '';

async function queryOf(t: TestContext, videoId: string) {
	const data = await query(`https://www.youtube.com/watch?v=${videoId}`);

	t.truthy(data);
	t.truthy(data.raw);
	t.true(Date.now() - data.lastScanned.valueOf() < 1000 * 60);
	t.is(typeof data.videoId, 'string');
	t.is(typeof data.videoTitle, 'string');
	t.is(typeof data.videoUrl, 'string');
	t.is(typeof data.channelId, 'string');
	t.is(typeof data.channelName, 'string');
	t.is(typeof data.channelUrl, 'string');
	t.is(typeof data.description, 'string');
	t.true(data.published instanceof Date);
	t.is(typeof data.views, 'number');
	t.truthy(data.thumbnails);
	t.true(Object.keys(data.thumbnails).length > 0);
}
queryOf.title = (_: string, input: string) => `query returns video data for ${input}`;

test(`query rejects for an unknown video`, async (t) => {
	await t.throws(query(null));
	await t.throws(query(EMPTY_STRING));
	await t.throws(query('https://www.google.com'));
	await t.throws(query('https://www.not-youtube.org/fake?v=cPrjA5mK8Ek'));
	await t.throws(query('https://www.youtube.com/watch?v=fakevideoid'));
});

test(queryOf, 'cPrjA5mK8Ek');
test(queryOf, '8YP_nOCO-4Q');
test(queryOf, 'O-m520BRkfM');
test(queryOf, 'hDACN-BGvI8');
test(queryOf, 'dQw4w9WgXcQ');