import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 30000, // Image processing can take time
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['scripts/**/*.js'],
      exclude: ['scripts/**/__tests__/**', 'scripts/**/*.test.js'],
    },
  },
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, './scripts'),
    },
  },
})
