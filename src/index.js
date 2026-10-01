import { routeUpdate } from "./bot/router.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return new Response("ok");
    }

    if (request.method !== "POST" || url.pathname !== "/webhook") {
      return new Response("Not found", { status: 404 });
    }

    const webhookSecret = env.TELEGRAM_WEBHOOK_SECRET;
    if (!webhookSecret || request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== webhookSecret) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const update = await request.json();
      await routeUpdate(update, env);
      return new Response("ok");
    } catch {
      return new Response("Bad request", { status: 400 });
    }
  },
};
