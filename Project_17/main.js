const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAi = new GoogleGenerativeAI(process.env.API_KEY);
const fs = require("fs");

async function respoense (promt = ""){
  const model = genAi.getGenerativeModel({ model: "gemini-pro"}); 
  const result = await model.generateContent(promt);
  const response = await result.response;
  const replyText = await response.text();
  console.log(replyText);
}

// respoense("What tempreture in Kolkata, India today?");


function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}


async function getResponseFromImage (prompt = ""){
  const model = genAi.getGenerativeModel({ model: "gemini-pro-vision"}); 
  const imagesParts = [
    fileToGenerativePart("cat-image.jpg", "image/jpeg"),
    fileToGenerativePart("ai-image.jpg", "image/jpeg")
  ];
  const result = await model.generateContent([prompt, ...imagesParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

// getResponseFromImage("What is difference between these images?");


let history = [
  {
    role: "user",
    parts: [{ text: "Hello, I have 2 dogs in my house." }],
  },
  {
    role: "model",
    parts: [{ text: "Great to meet you. What would you like to know?" }],
  },
];

async function multiLineChat  (msg){
  const model = genAi.getGenerativeModel({model: "gemini-pro"});
  const chat = model.startChat({
    history : history,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
  const message = await chat.sendMessage(msg);
  const respoense = await message.response;
  const messageTxt = respoense.text();
  console.log(messageTxt);
}

// multiLineChat("How many dogs do I have?");



async function run (txt = ""){
  const model = genAi.getGenerativeModel({model: "embedding-001"});
  const respoense = await model.embedContent(txt);
  console.log(respoense.embedding.values);
}

// run("I love sprite");