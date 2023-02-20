import { Request, Response } from "express";

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const API_KEY = process.env.API_KEY;
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

app.post("/recipes", async (req: Request, res: Response) => {
  console.info("Received parfume request with request body: ", req.body);
  const ingredients: [string] = req.body.ingredients;
  if (!ingredients || ingredients.length < 1) {
    const error = {
      message: "No ingredients provided, aborting OpenAI request",
    };
    console.error(error.message);
    res.status(400).send(error);
    return;
  }
  console.log("New parfume request! Scents: ", ingredients);

  try {
    const response = await openAIRequest(ingredients);

    if (!response) return res.send("No response from OpenAI");
    if (!response.data) return res.send("No data from OpenAI");
    if (response.data.choices.length < 1) return res.send("No recipe found");

    const recipe = response.data.choices[0].text;

    try {
      JSON.parse(recipe);
    } catch (e) {
      res.send("No recipe found");
      return;
    }
    res.send(recipe);
  } catch (error) {
    res.send("OpenAI servers are busy, please try again");
  }
});

const openAIRequest = (ingredients: Array<string>) => {
  const format = `
    {
      "perfumes": []String,
      "disclaimer": String,
    }
  `;

  // Steps: []String ble kommentert ut
  //"title": String,
  //"description" String, Ogsaa kommentert ut.

  return openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Can you list me the names of perfumes that has the following scents: " +
      ingredients +
      ", but only the names, and in the following format: " +
      format,
    temperature: 0.3,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
};
