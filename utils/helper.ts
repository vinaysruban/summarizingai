import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function getCompletion(prompt: string, age: number) {
  if (prompt.length < 1) {
    return `Oops! Something went wrong! 😱 You have to make your prompt longer!`;
  } else if (age < 0 || age > 122) {
    return `Oops! Something went wrong! 😱 You have to enter a valid age between 0 and 122!`;
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Summarize this for a ${age} year-old student:${prompt}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response);
  return response.data.choices[0].text;
}
