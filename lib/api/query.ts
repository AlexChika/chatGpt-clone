import openai from "./chatGPT";

async function query(prompt: string, model: string) {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 2048,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => {
      console.log(err.message, "at query");
      return `Oooops!!! Error 429. Billing usage exceeded.
      We are very sorry! Our Open ai subscription plan expired. Since this is a demo app... We can't really pay for this services.
      However, we can integrate OpenAi's Chat models into your business and ideas. Contact us @ https://alex.devarise.tech`;
    });

  return res;
}

export default query;
