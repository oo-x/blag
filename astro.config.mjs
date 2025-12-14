import path from 'node:path'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://oo-x.github.io/blag',
	markdown: {
		shikiConfig: {
			themes: {
				dark: 'solarized-dark',
				light: 'solarized-light',
			},
		},
	},
	vite: {
		plugins: [
			//
			tailwind(),
		],
		resolve: {
			alias: {
				'@': path.resolve(import.meta.dirname, './src'),
			},
		},
	},
})
