export function getConfig(env) {
  return {
    telegram: {
      botToken: env.TELEGRAM_BOT_TOKEN,
      webhookSecret: env.TELEGRAM_WEBHOOK_SECRET,
    },
    ai: {
      openaiApiKey: env.OPENAI_API_KEY,
      anthropicApiKey: env.ANTHROPIC_API_KEY,
      geminiApiKey: env.GEMINI_API_KEY,
      groqApiKey: env.GROQ_API_KEY,
      replicateApiToken: env.REPLICATE_API_TOKEN,
      huggingfaceApiToken: env.HUGGINGFACE_API_TOKEN,
    },
    integrations: {
      elevenlabsApiKey: env.ELEVENLABS_API_KEY,
      stabilityApiKey: env.STABILITY_API_KEY,
      databaseUrl: env.DATABASE_URL,
      upstashRedisRestUrl: env.UPSTASH_REDIS_REST_URL,
      upstashRedisRestToken: env.UPSTASH_REDIS_REST_TOKEN,
      customServiceApiKey: env.CUSTOM_SERVICE_API_KEY,
    },
  };
}
