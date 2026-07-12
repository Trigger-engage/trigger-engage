# Changelog

All notable changes to Trigger Engage are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project aims to follow
semantic versioning once it reaches 1.0. Dates are ISO-8601.

## [0.5.0] — Customer.io parity — 2026-07-11

Four capabilities closing the biggest gaps against hosted lifecycle-messaging platforms.

### Added

- **Rule-based (behavioural) segments.** A new segment type with a boolean rule over
  attributes and event behaviour (e.g. *booked but not attended in 30 days*, *inactive
  14 days*, *premium plan*) that recomputes itself — incrementally per person on events and
  profile edits, and on a periodic scheduler sweep for time-based drift. A rule builder on
  the Segments page, editable after creation. See [Segments](https://github.com/Trigger-engage/server/blob/main/docs/guides/segments.md).
- **A/B testing.** A `split` journey node that routes each person to one of 2–4 weighted
  message variants (deterministic per person, so retries never reshuffle), converging back to
  the journey. Live per-variant entered / converted / rate results on the automation editor.
  See [A/B testing](https://github.com/Trigger-engage/server/blob/main/docs/guides/ab-testing.md).
- **Anonymous → identified merge.** Track events and profiles against a device/session
  `anonymous_id` before signup; on identify, the anonymous history (events, messages, runs,
  suppressions, segment memberships, attributes) is folded into the known person. The SDK
  `identify()` and `event()` gained an optional `anonymousId` argument (backward compatible).
  See [Anonymous → identified](https://github.com/Trigger-engage/server/blob/main/docs/guides/anonymous-identity.md).
- **Analytics dashboard.** A time-series Analytics page: message volume (sent vs delivered),
  delivery funnel, runs/day, events/day, per-channel breakdown, and period-over-period deltas
  over a 7/14/30/90-day window. See [Analytics](https://github.com/Trigger-engage/server/blob/main/docs/guides/analytics.md).
- Documentation set: monorepo README, docs index, concepts, HTTP API reference, and per-feature
  guides.

### Notes

- Migrations add `people.anonymous_id` (and make `external_id` nullable),
  `event_occurrences.anonymous_id`, and `segments.rules` / `segments.recomputed_at`. Deploy the
  server before the clients that use the new SDK arguments.

## [0.4.0] — Dogfood — planned

Point the Mytherapist.ng backend at Trigger Engage behind `CustomerIoService`, run in shadow
mode alongside Customer.io, compare, and cut over. See [PRODUCTION.md](https://github.com/Trigger-engage/server/blob/main/PRODUCTION.md).

## [0.38.0] — Dual-mode distribution

- The same server code runs standalone **or** as the `trigger-engage/server` Composer package,
  with isolated migrations, configurable routes and prefixes, host authorization gate, published
  UI assets, and direct in-process SDK dispatch.

## [0.37.0] — Customer profiles

- Searchable People UI, typed property editor, API/SDK property mutation, profile activity and
  segment context, and legacy `attributes` compatibility.

## [0.36.0] — Content authoring

- Visual email composer with a lossless HTML/Liquid escape hatch, reusable formatting controls,
  one-click variable insertion, and exact server-rendered preview.

## [0.35.0] — Audiences

- Manual and event-driven segments, SDK membership operations, snapshot-based segment
  broadcasts, queued per-recipient delivery, and campaign reporting.

## [0.3.0] — Production hardening

- Suppressions and signed unsubscribe links, customizable branded template editor with exact
  preview, responsive management shell, batch/backfill API, inbound delivery webhooks, channel
  connection testing, and a metrics dashboard.

## [0.2.0] — The canvas

- React Flow journey builder, branch nodes, versioned publishing, SMS (Termii) and push
  (OneSignal) channels, and per-run timeline views.

## [0.1.0] — Engine core — 2026-07-10

- Founding milestone: schema, ingestion API, Laravel SDK with a test fake, email channel
  (SMTP + ZeptoMail), the durable automation engine (trigger → delay → email) with idempotent
  ingestion and no-double-send guarantees, workspaces, and API keys.

[0.5.0]: https://github.com/Trigger-engage/server/blob/main/PROGRESS.md
[0.1.0]: https://github.com/Trigger-engage/server/blob/main/PROGRESS.md
