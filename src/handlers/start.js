import { sendMessage } from "../services/telegram.js";

export async function handleStart(message, env) {
  await sendMessage(env, message.chat.id, "Hello! Your bot is online. Add your own features to get started.");
}
