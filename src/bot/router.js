import { handleStart } from "../handlers/start.js";

export async function routeUpdate(update, env) {
  const message = update.message;
  const text = message?.text?.trim();
  if (!message?.chat?.id || !text) return;

  const command = text.split(/\s+/, 1)[0].split("@")[0].toLowerCase();
  if (command === "/start") {
    await handleStart(message, env);
  }
}
