import { file, glob } from 'astro/loaders'
import { z, reference, defineCollection } from 'astro:content'

const tags = defineCollection({
	loader: file('src/content/tags.json'),
	schema: z.object({
		id: z.string(),
		name: z.string().optional(),
	}),
})

const notes = defineCollection({
	loader: glob({
		base: 'src/content/notes',
		pattern: '**/*.md',
	}),
	schema: ({ image }) => {
		return z.object({
			title: z.string(),
			image: image().optional(),
			description: z.string().optional(),
			created: z.coerce.date(),
			updated: z.coerce.date().optional(),
			tags: z.array(reference('tags')).optional(),
		})
	},
})

const projects = defineCollection({
	loader: glob({
		base: 'src/content/projects',
		pattern: '**/*.md',
	}),
	schema: ({ image }) => {
		return z.object({
			name: z.string(),
			date: z.coerce.date(),
			link: z.string().url().optional(),
			imgs: z.array(image()).optional(),
			desc: z.string().optional(),
			tags: z.array(reference('tags')).optional(),
		})
	},
})

export const collections = {
	tags,
	notes,
	projects,
}
