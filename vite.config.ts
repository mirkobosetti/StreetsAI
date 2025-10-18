import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  plugins: [
    {
      name: 'copy-saves',
      closeBundle() {
        // Create saves directory in dist
        const savesDir = resolve(__dirname, 'dist/saves');
        mkdirSync(savesDir, { recursive: true });

        // Copy sclemo.world file
        const srcFile = resolve(__dirname, 'src/saves/sclemo.world');
        const destFile = resolve(__dirname, 'dist/saves/sclemo.world');
        copyFileSync(srcFile, destFile);

        console.log('✓ Copied saves/sclemo.world to dist');
      }
    }
  ]
});
