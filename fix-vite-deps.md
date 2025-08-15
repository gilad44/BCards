# Fix Vite Dependency Optimization Issues

## Quick Fixes (try in this order):

### 1. Clear Vite Cache and Reinstall

```bash
# Delete node_modules and lock file
rm -rf node_modules package-lock.json
# OR on Windows:
rmdir /s node_modules
del package-lock.json

# Clean npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

### 2. Force Vite to Re-optimize Dependencies

```bash
# Start dev server with force flag
npm run dev -- --force
```

### 3. Configure Vite to Handle React Three Dependencies

Add this to your `vite.config.ts`:

```typescript
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "./",
  optimizeDeps: {
    include: ["@react-three/drei", "@react-three/fiber", "three"],
    force: true,
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
```

### 4. Alternative Vite Config (if above doesn't work)

```typescript
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "./",
  optimizeDeps: {
    exclude: ["@react-three/drei"],
  },
});
```

## Why This Happens:

- Vite pre-optimizes dependencies for faster loading
- When moving between computers, cached optimized deps can become stale
- React Three ecosystem has complex ESM dependencies that sometimes need special handling

## Prevention:

- Add `node_modules/` and `.vite/` to your `.gitignore`
- Use `npm ci` instead of `npm install` in production
- Consider using `npm run dev -- --force` when switching between environments
