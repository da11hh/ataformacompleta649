// vite.config.ts
import { defineConfig } from "file:///home/runner/workspace/node_modules/vite/dist/node/index.js";
import react from "file:///home/runner/workspace/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///home/runner/workspace/node_modules/lovable-tagger/dist/index.js";
import tsconfigPaths from "file:///home/runner/workspace/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_dirname = "/home/runner/workspace";
var vite_config_default = defineConfig(({ mode }) => ({
  root: ".",
  publicDir: "public",
  define: {
    // ===== SUPABASE CONFIGURATION (RUNTIME, NÃO BUILD-TIME) =====
    // 
    // IMPORTANTE: Estas variáveis PODEM estar vazias propositalmente!
    // 
    // O frontend agora busca credenciais Supabase via API em RUNTIME:
    // - GET /api/config/supabase (não-autenticado, rate-limited)
    // - Credenciais armazenadas em PostgreSQL (tabela app_settings)
    // - Elimina dependência de Secrets durante build
    // 
    // Prioridades (ver src/lib/supabase.ts):
    // 1. API backend (runtime) - PostgreSQL app_settings
    // 2. Variáveis de ambiente (fallback durante migração)
    // 3. localStorage (fallback legado)
    // 
    // É SEGURO deixar vazio - aplicação funciona com graceful degradation
    "import.meta.env.REACT_APP_SUPABASE_URL": JSON.stringify(
      process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || ""
    ),
    "import.meta.env.REACT_APP_SUPABASE_ANON_KEY": JSON.stringify(
      process.env.SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || ""
    )
  },
  optimizeDeps: {
    exclude: ["whatsapp"]
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "5000", 10),
    strictPort: false,
    allowedHosts: ["all"],
    hmr: process.env.REPLIT_DEV_DOMAIN ? {
      protocol: "wss",
      host: process.env.REPLIT_DEV_DOMAIN,
      clientPort: 443
    } : true
  },
  build: {
    // Otimizações de build para performance
    target: "esnext",
    minify: "esbuild",
    sourcemap: mode === "development",
    rollupOptions: {
      input: {
        main: path.resolve(__vite_injected_original_dirname, "index.html")
      },
      output: {
        // Code splitting para melhor cache
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-select"]
          // Removido platform chunks - React.lazy() já faz o code splitting automaticamente
        }
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1e3
  },
  plugins: [tsconfigPaths(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./attached_assets")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9ydW5uZXIvd29ya3NwYWNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3J1bm5lci93b3Jrc3BhY2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgcm9vdDogJy4nLFxuICBwdWJsaWNEaXI6ICdwdWJsaWMnLFxuICBkZWZpbmU6IHtcbiAgICAvLyA9PT09PSBTVVBBQkFTRSBDT05GSUdVUkFUSU9OIChSVU5USU1FLCBOXHUwMEMzTyBCVUlMRC1USU1FKSA9PT09PVxuICAgIC8vIFxuICAgIC8vIElNUE9SVEFOVEU6IEVzdGFzIHZhcmlcdTAwRTF2ZWlzIFBPREVNIGVzdGFyIHZhemlhcyBwcm9wb3NpdGFsbWVudGUhXG4gICAgLy8gXG4gICAgLy8gTyBmcm9udGVuZCBhZ29yYSBidXNjYSBjcmVkZW5jaWFpcyBTdXBhYmFzZSB2aWEgQVBJIGVtIFJVTlRJTUU6XG4gICAgLy8gLSBHRVQgL2FwaS9jb25maWcvc3VwYWJhc2UgKG5cdTAwRTNvLWF1dGVudGljYWRvLCByYXRlLWxpbWl0ZWQpXG4gICAgLy8gLSBDcmVkZW5jaWFpcyBhcm1hemVuYWRhcyBlbSBQb3N0Z3JlU1FMICh0YWJlbGEgYXBwX3NldHRpbmdzKVxuICAgIC8vIC0gRWxpbWluYSBkZXBlbmRcdTAwRUFuY2lhIGRlIFNlY3JldHMgZHVyYW50ZSBidWlsZFxuICAgIC8vIFxuICAgIC8vIFByaW9yaWRhZGVzICh2ZXIgc3JjL2xpYi9zdXBhYmFzZS50cyk6XG4gICAgLy8gMS4gQVBJIGJhY2tlbmQgKHJ1bnRpbWUpIC0gUG9zdGdyZVNRTCBhcHBfc2V0dGluZ3NcbiAgICAvLyAyLiBWYXJpXHUwMEUxdmVpcyBkZSBhbWJpZW50ZSAoZmFsbGJhY2sgZHVyYW50ZSBtaWdyYVx1MDBFN1x1MDBFM28pXG4gICAgLy8gMy4gbG9jYWxTdG9yYWdlIChmYWxsYmFjayBsZWdhZG8pXG4gICAgLy8gXG4gICAgLy8gXHUwMEM5IFNFR1VSTyBkZWl4YXIgdmF6aW8gLSBhcGxpY2FcdTAwRTdcdTAwRTNvIGZ1bmNpb25hIGNvbSBncmFjZWZ1bCBkZWdyYWRhdGlvblxuICAgICdpbXBvcnQubWV0YS5lbnYuUkVBQ1RfQVBQX1NVUEFCQVNFX1VSTCc6IEpTT04uc3RyaW5naWZ5KFxuICAgICAgcHJvY2Vzcy5lbnYuU1VQQUJBU0VfVVJMIHx8IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9TVVBBQkFTRV9VUkwgfHwgJydcbiAgICApLFxuICAgICdpbXBvcnQubWV0YS5lbnYuUkVBQ1RfQVBQX1NVUEFCQVNFX0FOT05fS0VZJzogSlNPTi5zdHJpbmdpZnkoXG4gICAgICBwcm9jZXNzLmVudi5TVVBBQkFTRV9BTk9OX0tFWSB8fCBwcm9jZXNzLmVudi5SRUFDVF9BUFBfU1VQQUJBU0VfQU5PTl9LRVkgfHwgJydcbiAgICApLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ3doYXRzYXBwJ10sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LlBPUlQgfHwgJzUwMDAnLCAxMCksXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsXG4gICAgYWxsb3dlZEhvc3RzOiBbJ2FsbCddLFxuICAgIGhtcjogcHJvY2Vzcy5lbnYuUkVQTElUX0RFVl9ET01BSU4gPyB7XG4gICAgICBwcm90b2NvbDogJ3dzcycsXG4gICAgICBob3N0OiBwcm9jZXNzLmVudi5SRVBMSVRfREVWX0RPTUFJTixcbiAgICAgIGNsaWVudFBvcnQ6IDQ0MyxcbiAgICB9IDogdHJ1ZSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBPdGltaXphXHUwMEU3XHUwMEY1ZXMgZGUgYnVpbGQgcGFyYSBwZXJmb3JtYW5jZVxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgc291cmNlbWFwOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIENvZGUgc3BsaXR0aW5nIHBhcmEgbWVsaG9yIGNhY2hlXG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICdyZWFjdC12ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgJ3VpLXZlbmRvcic6IFsnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsICdAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudScsICdAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0J10sXG4gICAgICAgICAgLy8gUmVtb3ZpZG8gcGxhdGZvcm0gY2h1bmtzIC0gUmVhY3QubGF6eSgpIGpcdTAwRTEgZmF6IG8gY29kZSBzcGxpdHRpbmcgYXV0b21hdGljYW1lbnRlXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gQ2h1bmsgc2l6ZSB3YXJuaW5nc1xuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgfSxcbiAgcGx1Z2luczogW3RzY29uZmlnUGF0aHMoKSwgcmVhY3QoKSwgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICBcIkBhc3NldHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL2F0dGFjaGVkX2Fzc2V0c1wiKSxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUCxTQUFTLG9CQUFvQjtBQUNqUixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBQ2hDLE9BQU8sbUJBQW1CO0FBSjFCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBZ0JOLDBDQUEwQyxLQUFLO0FBQUEsTUFDN0MsUUFBUSxJQUFJLGdCQUFnQixRQUFRLElBQUksMEJBQTBCO0FBQUEsSUFDcEU7QUFBQSxJQUNBLCtDQUErQyxLQUFLO0FBQUEsTUFDbEQsUUFBUSxJQUFJLHFCQUFxQixRQUFRLElBQUksK0JBQStCO0FBQUEsSUFDOUU7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsVUFBVTtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNLFNBQVMsUUFBUSxJQUFJLFFBQVEsUUFBUSxFQUFFO0FBQUEsSUFDN0MsWUFBWTtBQUFBLElBQ1osY0FBYyxDQUFDLEtBQUs7QUFBQSxJQUNwQixLQUFLLFFBQVEsSUFBSSxvQkFBb0I7QUFBQSxNQUNuQyxVQUFVO0FBQUEsTUFDVixNQUFNLFFBQVEsSUFBSTtBQUFBLE1BQ2xCLFlBQVk7QUFBQSxJQUNkLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQSxJQUVMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVcsU0FBUztBQUFBLElBQ3BCLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE1BQU0sS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUM1QztBQUFBLE1BQ0EsUUFBUTtBQUFBO0FBQUEsUUFFTixjQUFjO0FBQUEsVUFDWixnQkFBZ0IsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsVUFDekQsYUFBYSxDQUFDLDBCQUEwQixpQ0FBaUMsd0JBQXdCO0FBQUE7QUFBQSxRQUVuRztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxTQUFTLENBQUMsY0FBYyxHQUFHLE1BQU0sR0FBRyxTQUFTLGlCQUFpQixnQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQy9GLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxtQkFBbUI7QUFBQSxJQUN4RDtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
