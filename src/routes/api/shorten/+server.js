import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { urls } from '$lib/server/db/schema';
import crypto from 'crypto';

const generateShortUrl = () => {
    return crypto.randomUUID().slice(0, 6);
}

export const POST = async ({ request }) => {
    const { url } = await request.json();

    // Check if there is an existing URL
    const existingUrl = db.select().from(urls).where(eq(urls.original_url, url)).get();
    if (existingUrl) {
        return json({ shortUrl: existingUrl.short_url });
    }

    // Generate a new short URL
    let shortUrl = generateShortUrl();

    // duplicate check
    while (db.select().from(urls).where(eq(urls.short_url, shortUrl)).get()) {
        shortUrl = generateShortUrl();
    }

    // Insert to Database
    db.insert(urls).values({
        original_url: url,
        short_url: shortUrl
    }).run();

    return json({ shortUrl });
}
