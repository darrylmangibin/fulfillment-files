# AGENTS.md

## Cursor Cloud specific instructions

### Overview

**Fulfillment Docs** is a single Next.js 16 application (not a monorepo) for managing APK files for two mobile products: **Fusion** and **True Trace**. It uses PostgreSQL via Prisma ORM, AWS S3 for file storage, and Expo EAS for build metrics.

### Key commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (port 3030) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Prisma generate | `npm run prisma:generate` |
| Prisma migrate (dev) | `npm run prisma:migrate` |
| Prisma migrate (deploy) | `npx prisma migrate deploy --schema=./prisma` |
| Prisma Studio | `npm run prisma:studio` |

### Database setup

The app requires PostgreSQL 17. In the cloud VM, Docker is used to run Postgres:

```sh
sudo dockerd &>/tmp/dockerd.log &
sleep 3
sudo docker start postgres 2>/dev/null || sudo docker run -d --name postgres \
  -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=fulfillment_docs -p 54322:5432 postgres:17
```

After starting Postgres, run migrations: `npx prisma migrate deploy --schema=./prisma`

### Environment variables

A `.env` file is required at the project root. The `DATABASE_URL` must point to the local Postgres instance:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/fulfillment_docs?schema=public"
```

Other env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `AWS_*`, `EXPO_TOKEN`) can use placeholder values for local development unless you need S3 upload or Expo metrics features.

### Gotchas

- The original `package.json` had a broken dependency `"client-s3": "github:aws-sdk/client-s3"` (non-existent repo). This was fixed to `"@aws-sdk/client-s3": "^3.958.0"`. The code imports from `@aws-sdk/client-s3`.
- Prisma uses multi-file schema (files in `prisma/` directory). The `--schema=./prisma` flag is required for all Prisma commands.
- The `postinstall` script in `package.json` runs `prisma generate` automatically after `npm install`.
- The dev server uses Turbopack and listens on port 3030.
- Docker in the cloud VM requires `fuse-overlayfs` storage driver and `iptables-legacy`. These are set up during initial environment provisioning.
- The S3 storage service (`s3StorageService`) is instantiated at module load and throws if AWS env vars are missing. API routes that use S3 will fail without real AWS credentials, but the rest of the app works fine.
