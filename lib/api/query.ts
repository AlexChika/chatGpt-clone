import openai from "./chatGPT";

async function query(prompt: string, chatId: string, model: string) {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => {
      `ChatGpt is having trouble finding your answers Error: ${err.message}`;
    });

  return res;
}

export default query;
