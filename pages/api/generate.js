import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  
  const prompt= generatePrompt(req.body.TableDef1,req.body.TableDef2,req.body.TableDef3,req.body.Query);
  console.log(prompt);
  const completion = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: prompt,
    temperature: 0,
    max_tokens: 150,
    top_p :1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["#", ";"]
  });
  console.log(completion.data.choices[0].text);
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(tableDef1,tableDef2,tableDef3,query) {
  const capitalizedTableDefinition1 = tableDef1[0].toUpperCase() + tableDef1.slice(1).toLowerCase();
  const capitalizedTableDefinition2 = tableDef2[0].toUpperCase() + tableDef2.slice(1).toLowerCase();
  const capitalizedTableDefinition3 = tableDef3[0].toUpperCase() + tableDef3.slice(1).toLowerCase();
  return `### Postgres SQL tables, with their properties:
#
# ${capitalizedTableDefinition1}
# ${capitalizedTableDefinition2}
# ${capitalizedTableDefinition3}
#
### A query to list ${query}
SELECT`;
}
