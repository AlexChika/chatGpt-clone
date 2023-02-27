import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.CHAT_GPT_API_KEY,
});

const openai = new OpenAIApi(config);

export default openai;
