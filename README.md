# Chat App Backend

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express v5
- **Database:** MongoDB with Prisma ORM
- **Linter/Formatter:** Biome
- **Package Manager:** pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Generate Prisma Client
pnpm db:generate

# Push schema to database
pnpm db:push

# Start the development server
pnpm start
```

## Available Scripts

### Development

| Script | Command | Description |
|--------|---------|-------------|
| `pnpm start` | `nodemon src/index.ts` | Starts the dev server with auto-restart on file changes using nodemon |
| `pnpm build` | `tsc` | Compiles TypeScript to JavaScript for production deployment |

### Linting & Formatting

| Script | Command | Description |
|--------|---------|-------------|
| `pnpm lint` | `biome check .` | Checks all files for lint errors and formatting issues without modifying them |
| `pnpm lint:fix` | `biome check --write .` | Auto-fixes all fixable lint and formatting issues |
| `pnpm format` | `biome format --write .` | Formats all files using Biome's formatter |

### Database (Prisma)

| Script | Command | Description |
|--------|---------|-------------|
| `pnpm db:generate` | `prisma generate` | Generates the Prisma Client from your schema so you can use it in your code. Run this after every schema change |
| `pnpm db:push` | `prisma db push` | Syncs your `schema.prisma` to the database without creating migration files. Best for rapid prototyping |
| `pnpm db:pull` | `prisma db pull` | Introspects the existing database and updates your `schema.prisma` to match its current state |
| `pnpm db:migrate` | `prisma migrate dev` | Creates a new migration file from schema changes and applies it. Tracks schema history — use this for production-ready workflows |
| `pnpm db:migrate:prod` | `prisma migrate deploy` | Applies all pending migrations in production/CI environments. Does not generate new migrations |
| `pnpm db:reset` | `prisma migrate reset` | Drops the database, recreates it, re-applies all migrations, and runs the seed script. Gives you a clean slate |
| `pnpm db:studio` | `prisma studio` | Opens Prisma Studio, a web-based GUI to browse and edit your database data |
| `pnpm db:seed` | `prisma db seed` | Runs your seed script to populate the database with initial/test data |
| `pnpm db:validate` | `prisma validate` | Validates your `schema.prisma` file for syntax and logic errors without touching the database |

### When to use `db:push` vs `db:migrate`

- **`db:push`** — Great for prototyping and early development. It syncs your schema directly to the database but doesn't create migration files, so there's no history of changes.
- **`db:migrate`** — Use this when you're ready for production. It creates migration files that track every schema change over time, making deployments predictable and reversible.
