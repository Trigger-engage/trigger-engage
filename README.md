# TriggerEngage

**Open-source, self-hostable event-based email, SMS & push automation for Laravel** — a
cost-free alternative to hosted lifecycle-messaging platforms like Customer.io.

🌐 **Website: [triggerengage.com](https://triggerengage.com)** · [Blog & guides](https://triggerengage.com/blog/) · [Docs](https://github.com/Trigger-engage/server/tree/main/docs)

This is the project hub. The code lives in two repositories, and this repo hosts the
marketing site — published at **[triggerengage.com](https://triggerengage.com)**.

| Repository | What it is |
|---|---|
| **[Trigger-engage/server](https://github.com/Trigger-engage/server)** | The platform — ingestion API, automation engine, and React/Inertia dashboard (Laravel 13). Composer package: `trigger-engage/server`. |
| **[Trigger-engage/laravel-sdk](https://github.com/Trigger-engage/laravel-sdk)** | The client SDK — `identify()` / `track()`, fail-open, with a test fake. Composer package: `trigger-engage/laravel`. |
| **[website/](website/)** (this repo) | The landing page — live at **[triggerengage.com](https://triggerengage.com)**. |

## What it does

Fire an event from your app, build the journey visually, and let the engine deliver email,
SMS, and push — with behavioural segments, A/B testing, anonymous → identified merge, and a
time-series analytics dashboard. Run it standalone, or install the whole thing inside your
existing Laravel app with one Composer command.

```php
use TriggerEngage\Laravel\Facades\TriggerEngage;

TriggerEngage::identify('user-42', ['email' => $user->email, 'first_name' => 'Ada']);
TriggerEngage::event('customer_sign_up', ['plan' => 'free'], person: 'user-42');
// …a published journey does the rest: wait, branch, A/B test, and send.
```

## Quickstart

Embed the dashboard and engine in an existing Laravel app:

```bash
composer require trigger-engage/server
php artisan engage:install --name="My Product" --timezone=Africa/Lagos
```

Or run it standalone — see the [installation guide](https://github.com/Trigger-engage/server/blob/main/docs/INSTALLATION.md).

## Documentation

Full documentation lives in the server repository:

- [Documentation index](https://github.com/Trigger-engage/server/tree/main/docs) — concepts, guides, reference
- [Installation](https://github.com/Trigger-engage/server/blob/main/docs/INSTALLATION.md) · [HTTP API reference](https://github.com/Trigger-engage/server/blob/main/docs/API.md)
- Guides: [journeys](https://github.com/Trigger-engage/server/blob/main/docs/guides/automations.md) · [segments](https://github.com/Trigger-engage/server/blob/main/docs/guides/segments.md) · [A/B testing](https://github.com/Trigger-engage/server/blob/main/docs/guides/ab-testing.md) · [anonymous → identified](https://github.com/Trigger-engage/server/blob/main/docs/guides/anonymous-identity.md) · [analytics](https://github.com/Trigger-engage/server/blob/main/docs/guides/analytics.md)
- [Laravel SDK](https://github.com/Trigger-engage/laravel-sdk)

## Repositories at a glance

- **Platform:** https://github.com/Trigger-engage/server
- **Laravel SDK:** https://github.com/Trigger-engage/laravel-sdk
- **This site & hub:** https://github.com/Trigger-engage/trigger-engage
- **Website:** https://triggerengage.com

## From the blog

Practical guides and deep-dives on [triggerengage.com/blog](https://triggerengage.com/blog/):

- [How to send event-based emails in Laravel](https://triggerengage.com/blog/event-based-emails-laravel.html)
- [Customer.io alternatives for lifecycle messaging](https://triggerengage.com/blog/customer-io-alternatives.html)
- [How to migrate from Customer.io](https://triggerengage.com/blog/migrate-from-customer-io.html)
- [Marketing automation, explained](https://triggerengage.com/blog/marketing-automation-explained.html)
- [Behavioral segmentation that updates itself](https://triggerengage.com/blog/behavioral-segmentation.html)

## License

MIT — see [LICENSE](LICENSE). Use it, host it, fork it.
