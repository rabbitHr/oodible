# Environment Variables in Vite

## Important Differences from Create React App

In Vite, environment variables work differently from Create React App:

### Key Rules
- Prefix public environment variables with `VITE_`
- Access variables using `import.meta.env.VITE_VARIABLE_NAME`
- Do NOT use `process.env`

### Example Setup

1. In `.env` file:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

2. In your TypeScript file:
```typescript
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
```

### Security
- Variables prefixed with `VITE_` are exposed to your Vite-processed code
- Do NOT store sensitive secrets in client-side code
- Use backend services for sensitive operations

### Troubleshooting
- Restart dev server after changing .env
- Verify variable is correctly prefixed
- Check Vite configuration if issues persist

### Type Declaration (Optional)

Create `env.d.ts` in your `src` directory:
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```
