import { getConfig } from "../config.js";

export async function sendMessage(env, chatId, text) {
  const { botToken } = getConfig(env).telegram;
  if (!botToken) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!response.ok) {
    throw new Error(`Telegram API request failed with status ${response.status}`);
  }
}
