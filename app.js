const express = require("express");
const app = express();
const fs = require("fs");

const port = 3000;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

app.use(express.static('public'))
app.use('/css', express.static(__dirname+"public/css"))
app.use("/js", express.static(__dirname + "public/js"))
app.use("/images", express.static(__dirname + "public/images"))

app.set('views', './views')
app.set("view engine", "ejs");


app.get('', (req,res) => {
    res.render('index')
    // run();
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});




