# Ali Telegram Bot

A clean, modular Telegram bot starter built for Cloudflare Workers. It contains only the foundation; add your own commands and features in the handler modules.

## Project structure

- `src/index.js` - Cloudflare Worker entry point and webhook endpoint
- `src/bot/router.js` - update and command routing
- `src/handlers/start.js` - example `/start` command
- `src/services/telegram.js` - small Telegram Bot API client
- `wrangler.toml` - Cloudflare Worker configuration

## Requirements

- Node.js 20 or newer
- A Telegram bot token from BotFather
- A Cloudflare account

## Configure and run

1. Install dependencies: `npm install`
2. Add your token as a Worker secret: `npx wrangler secret put TELEGRAM_BOT_TOKEN`
3. Add a long random webhook secret: `npx wrangler secret put TELEGRAM_WEBHOOK_SECRET`
4. Start locally: `npm run dev`
5. Deploy: `npm run deploy`

The webhook endpoint is `/webhook`. After deployment, register `https://YOUR_WORKER_URL/webhook` with the Telegram setWebhook API and provide the same value configured as `TELEGRAM_WEBHOOK_SECRET` using the Telegram `secret_token` option. Do not commit tokens or local `.dev.vars` files.

## Extend

Add command handlers under `src/handlers/` and connect them in `src/bot/router.js`. Put Telegram API calls and other external integrations in `src/services/`.

## License

MIT
