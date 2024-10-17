import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { urls } from '$lib/server/db/schema';

export const load = async ({ params }) => {
	const { shortUrl } = params;

	const urlRecord = db.select().from(urls).where(eq(urls.short_url, shortUrl)).get();
	if (urlRecord) {
		throw redirect(302, urlRecord.original_url);
	} else {
		return {
			error: 'Short URL not found'
		};
	}
};
