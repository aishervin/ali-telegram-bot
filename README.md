# Ali Telegram Bot

A clean, modular Telegram bot starter for Cloudflare Workers. It includes a safe local settings workflow and a central config module. Add only the commands and integrations your bot needs.

## Project structure

- `src/index.js` - Worker entry point and Telegram webhook
- `src/config.js` - central map of supported environment settings
- `src/bot/router.js` - update and command routing
- `src/handlers/start.js` - example `/start` command
- `src/services/telegram.js` - Telegram Bot API client
- `.dev.vars.example` - blank local settings template; contains no credentials
- `wrangler.toml` - Cloudflare Worker configuration

## Add your API keys locally

1. Copy `.dev.vars.example` to `.dev.vars`.
2. Put each real key after its matching `=` in `.dev.vars`. Leave unused entries blank.
3. Run `npm install`, then `npm run dev`. Wrangler loads `.dev.vars` for local development, and `src/config.js` makes the values available as `getConfig(env).telegram`, `getConfig(env).ai`, and `getConfig(env).integrations`.

The example includes settings for Telegram, OpenAI, Anthropic, Gemini, Groq, Replicate, Hugging Face, ElevenLabs, Stability AI, database and Upstash Redis, plus a custom service key. Add new names to both `.dev.vars.example` and `src/config.js` when you add another integration.

## Keep credentials safe

`.dev.vars` is ignored by Git and must stay on your computer. Never add real keys to GitHub, source files, `wrangler.toml`, screenshots, or chat messages. The repository is public, so do not commit a filled-in settings file. Making a repository private later does not undo a credential exposure.

For deployment, add each value as a Cloudflare Worker secret instead of uploading `.dev.vars`. For example, run `npx wrangler secret put TELEGRAM_BOT_TOKEN` and paste the value when prompted. Repeat for each key the deployed bot uses. Worker code reads these secrets through the same `env` object and `src/config.js`.

## Telegram setup

1. Install dependencies: `npm install`.
2. For local development, fill in `TELEGRAM_BOT_TOKEN` and `TELEGRAM_WEBHOOK_SECRET` in `.dev.vars`.
3. Start locally: `npm run dev`.
4. For deployment, add those two values using `npx wrangler secret put`.
5. Deploy with `npm run deploy`.
6. Register `https://YOUR_WORKER_URL/webhook` with Telegram `setWebhook`, using the same webhook secret as its `secret_token` value.

The Worker accepts webhook requests at `/webhook` and checks the Telegram secret header. `/health` is a simple health check.

## Extend

Add handlers under `src/handlers/` and connect them in `src/bot/router.js`. Put external API calls in `src/services/`, and read their credentials from `getConfig(env)` rather than hardcoding them.

## License

MIT
