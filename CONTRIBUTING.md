# Contributing to Trigger Engage

Thanks for helping make open-source lifecycle messaging better. This guide covers the dev
setup, the test suite, and the conventions we follow. Issues and pull requests are welcome.

## Repository layout

| Path | What it is |
|---|---|
| [`server/`](server) | The platform — Laravel 13, ingestion API, automation engine, React/Inertia dashboard |
| [`laravel-sdk/`](laravel-sdk) | The `trigger-engage/laravel` client SDK |

The server bundles the SDK through a local Composer path repository, so you can develop both
together without publishing.

## Prerequisites

- PHP 8.2+ (CI and local dev run on 8.4)
- Composer
- Node 20+ and npm (for the dashboard build)
- SQLite is fine for local dev and tests; Postgres/MySQL for production-like runs

## Set up the server

```bash
cd server
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed --seeder=DemoSeeder   # prints demo SDK credentials
npm install
npm run build
```

Run everything for local development (serve + queue + logs + Vite) in one command:

```bash
composer dev
```

The dashboard is at `http://localhost:8000/app`. Log in with the workspace id and API key
(HTTP Basic) that `DemoSeeder` printed. The scheduler (`php artisan schedule:work`) drives
durable delays, event-wait timeouts, retries, and rule-segment recompute — run it if you're
testing time-based behaviour.

## Run the tests

The full suite must stay green. It runs on SQLite in-memory and needs no services.

```bash
# Server
cd server && composer test        # or: vendor/bin/phpunit

# SDK
cd laravel-sdk && composer test
```

Add tests with any change to behaviour. Feature tests live in `server/tests/Feature` and use
the `BuildsWorkspaces` helper trait; follow the existing patterns (see
`AutomationEngineTest`, `RuleSegmentsTest`, `AbTestEngineTest`, `AnonymousIdentityTest`).

## Coding conventions

- **PHP style: Laravel Pint.** Format before committing:

  ```bash
  cd server && vendor/bin/pint        # add --dirty to only touch changed files
  ```

- **Match the surrounding code.** The engine favours small, single-purpose services with clear
  invariants; read the neighbours before adding a pattern. Comment the *why*, not the *what*.
- **Frontend** is React + Inertia + Tailwind, built with Vite. Keep pages self-contained under
  `server/resources/js/Pages` and reuse the shared components in `server/resources/js/components`.
- **Migrations** for the platform live under `server/database/migrations/trigger-engage/` and are
  namespaced so they can run inside a host application.
- **Currency and money** anywhere in the wider Mytherapist.ng monorepo are in kobo; Trigger
  Engage itself is money-agnostic.

## Engine invariants to preserve

The engine makes hard guarantees ([details](server/README.md#engine-guarantees)). If you touch
the run engine, ingestion, or the scheduler tick, preserve them and add tests that prove it:

- No double-sends — a unique per-(run, node) reservation is taken before provider dispatch.
- Durable delays and race-safe event waits — `wake_at` plus the `engage:tick` sweep.
- Idempotent ingestion — a repeated `idempotency_key` is recorded and processed once.
- Versioned automations — in-flight runs finish on the version they started on.

## Pull requests

1. Branch off the default branch.
2. Keep the change focused; note any migration or SDK-contract change in the description.
3. Run `composer test` (server and SDK) and `vendor/bin/pint` before pushing.
4. Update the docs under [`server/docs/`](server/docs) and [`CHANGELOG.md`](CHANGELOG.md) when
   behaviour changes.
5. When a change spans the server and SDK, land the server first — clients depend on the API.

## Reporting issues

Include the version/commit, whether you're running embedded or self-hosted, reproduction steps,
and relevant logs (`storage/logs/laravel.log`, `php artisan queue:failed`, `horizon:status`).
Please don't include real API keys or personal data.
