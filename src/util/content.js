import { getCollection } from 'astro:content'

/**
 * @typedef {import('astro:content').CollectionEntry<'notes'>} Note
 */

/**
 * @template T
 * @param {(n: Note, t?: T) => T} collator
 */
export async function collateTags(collator) {
	/** @type {Map<string, T>} */
	const tagMap = new Map()

	/**
	 * @param {string} id
	 * @param {Note} note
	 */
	const coll = (id, note) => tagMap.set(id, collator(note, tagMap.get(id)))

	const notes = await getCollection('notes')

	for (const note of notes) {
		if (!note.data.tags?.length) {
			coll('untagged', note)
			continue
		}

		for (const tag of note.data.tags) {
			coll(typeof tag === 'string' ? tag : tag.id, note)
		}
	}

	return tagMap
}

export async function getSortedNotes() {
	const notes = await getCollection('notes')
	return notes.sort((a, b) => {
		return (
			(b.data.updated?.valueOf() || b.data.created?.valueOf() || 0) -
			(a.data.updated?.valueOf() || a.data.created?.valueOf() || 0)
		)
	})
}
