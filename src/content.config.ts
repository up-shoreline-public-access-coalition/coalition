import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { EventType } from "./enum/event-type";

const proposals = defineCollection({
	// Load Markdown and MDX files in the `src/content/proposals/` directory.
	loader: glob({ base: "./src/content/proposals", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const events = defineCollection({
	// Load Markdown and MDX files in the `src/content/events/` directory.
	loader: glob({ base: "./src/content/events", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		eventType: z.nativeEnum(EventType),
		eventDate: z.coerce.date(),
		eventTime: z.string(),
	}),
});

export const collections = {
	proposals: proposals,
	events: events,
};
