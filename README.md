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
3. Run `npm install`, then `npm run dev`. Wrangler loads `.dev.vars` for local development. `src/config.js` exposes the values to your modules through `getConfig(env)`.

### Settings in `.dev.vars.example`

| Variable | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Telegram Bot API token used to send messages. |
| `TELEGRAM_WEBHOOK_SECRET` | Random value used to verify incoming Telegram webhook requests. |
| `OPENAI_API_KEY` | OpenAI API access, for example chat or other OpenAI features. |
| `ANTHROPIC_API_KEY` | Anthropic API access, for example Claude features. |
| `GEMINI_API_KEY` | Google Gemini API access. |
| `GROQ_API_KEY` | Groq API access for supported models. |
| `REPLICATE_API_TOKEN` | Replicate API access for hosted models. |
| `HUGGINGFACE_API_TOKEN` | Hugging Face Hub or Inference API access. |
| `ELEVENLABS_API_KEY` | ElevenLabs speech and audio services. |
| `STABILITY_API_KEY` | Stability AI image-generation services. |
| `DATABASE_URL` | Connection string for a database integration, if used. |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint. |
| `UPSTASH_REDIS_REST_TOKEN` | Credential for the Upstash Redis REST endpoint. |
| `CUSTOM_SERVICE_API_KEY` | Example slot for another service; rename it if needed and map it in `src/config.js`. |

These settings only provide credentials. Add the relevant API integration code under `src/services/` before using a provider. The values are available as `getConfig(env).telegram`, `getConfig(env).ai`, and `getConfig(env).integrations`.

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

Add handlers under `src/handlers/` and connect them in `src/bot/router.js`. Put external API calls in `src/services/`, and read their credentials from `getConfig(env)` rather than hardcoding them. When adding another integration, add its variable to `.dev.vars.example` and add its mapping to `src/config.js`.

## License

MIT
