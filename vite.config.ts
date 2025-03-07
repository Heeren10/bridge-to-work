
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize build output
  build: {
    // Improve chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split code by module for better caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
          chart: ['recharts']
        }
      }
    },
    // Enable minification and tree-shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true
      }
    },
    // Generate sourcemaps for debugging
    sourcemap: mode === 'development'
  },
  // Optimize dev server
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'recharts', '@tanstack/react-query'],
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: true,
  },
}));
