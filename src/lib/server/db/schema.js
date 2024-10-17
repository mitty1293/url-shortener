import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const urls = sqliteTable('urls', {
	id: integer('id').primaryKey(),
	original_url: text('original_url').notNull(),
	short_url: text('short_url').notNull().unique(),
	created_at: text('timestamp')
		.notNull()
		.default(sql`(current_timestamp)`)
});
