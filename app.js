const express = require("express");
const app = express();
const path = require("path");

const port = 3000;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAlWi2dnBTprQP39_pqCiROeXj9ntMpFug"); //TODO: hide the key pls
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let chat;

app.use(express.urlencoded({ extended: true })); // Parse form data

app.get("/", async (req, res) => {
  res.render("homepage");
});

app.get("/studyplanner", async (req, res) => {
  let userMessage = req.body.source + req.body.dates; // Get user message from query string
  let response = "";

  if (userMessage) {
    // Check if chat object exists from previous request (for ongoing chat)
    if (!chat) {
      chat = await initializeChat_planner(); // Initialize chat if not already done
    }
    const result = await chat.sendMessage(userMessage);

    const responseText = await result.response.text();
    response = responseText;
  } else {
    // Initialize chat for the first user message
    chat = await initializeChat_planner();
  }

  // Render the EJS template with message and response
  res.render("studyplanner", { message: userMessage, response, chat: chat });
});
app.post("/studyplanner", async (req, res) => {
  let userMessage = req.body.source + req.body.dates; // Get user message from query string
  let response = "";

  if (userMessage) {
    // Check if chat object exists from previous request (for ongoing chat)
    if (!chat) {
      chat = await initializeChat_planner(); // Initialize chat if not already done
    }
    const result = await chat.sendMessage(userMessage);

    const responseText = await result.response.text();
    response = responseText;
  } else {
    // Initialize chat for the first user message
    chat = await initializeChat_planner();
  }

  // Render the EJS template with message and response
  res.render("studyplanner", { message: userMessage, response, chat: chat });
});

app.get("/notes", async (req, res) => {
  let userMessage = req.body.source; // Get user message from query string
  let response = "";

  if (userMessage) {
    // Check if chat object exists from previous request (for ongoing chat)
    if (!chat) {
      chat = await initializeChat(); // Initialize chat if not already done
    }
    const result = await chat.sendMessage(userMessage);

    const responseText = await result.response.text();
    response = responseText;
  } else {
    // Initialize chat for the first user message
    chat = await initializeChat();
  }

  // Render the EJS template with message and response
  res.render("notespage", { message: userMessage, response, chat: chat });
});
app.post("/notes", async (req, res) => {
  let userMessage = req.body.source; // Get user message from query string
  let response = "";

  if (userMessage) {
    // Check if chat object exists from previous request (for ongoing chat)
    if (!chat) {
      chat = await initializeChat(); // Initialize chat if not already done
    }
    const result = await chat.sendMessage(userMessage);

    const responseText = await result.response.text();
    response = responseText;
  } else {
    // Initialize chat for the first user message
    chat = await initializeChat();
  }

  // Render the EJS template with message and response
  res.render("notespage", { message: userMessage, response, chat: chat });
});

app.get("/flashcardgen", async (req, res) => {
  let userMessage = req.body.source; // Get user message from query string
  let response = "";

  if (userMessage) {
    // Check if chat object exists from previous request (for ongoing chat)
    if (!chat) {
      chat = await initializeChat_flashcard(); // Initialize chat if not already done
    }
    const result = await chat.sendMessage(userMessage);

    const responseText = await result.response.text();
    response = JSON.parse(responseText);
  } else {
    // Initialize chat for the first user message
    chat = await initializeChat_flashcard();
  }
  
  // Render the EJS template with message and response
  res.render("flashcardpage", { message: userMessage, response, chat: chat });
});
app.post("/flashcardgen", async (req, res) => {
  let userMessage = req.body.source; // Get user message from query string
  let response = "";

  if (userMessage) {
    // Check if chat object exists from previous request (for ongoing chat)
    if (!chat) {
      chat = await initializeChat_flashcard(); // Initialize chat if not already done
    }
    const result = await chat.sendMessage(userMessage);

    const responseText = await result.response.text();
    response = JSON.parse(responseText);
  } else {
    // Initialize chat for the first user message
    chat = await initializeChat_flashcard();
  }
  // Render the EJS template with message and response
  res.render("flashcardpage", {
    message: userMessage,
    response,
    chat: chat,
  });
});

async function initializeChat() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  return model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "This will be your persona\nyou are a AI TUTOR named TUBOT and you will help the user to solve their doubts",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: " **Name:** TUBOT\n\n**Role:** AI Tutor\n\n**Purpose:** To assist users with their doubts and provide guidance on various topics.\n\n**Capabilities:**\n\n* **Comprehensive Knowledge Base:** I have access to a vast repository of information and can provide accurate and up-to-date answers to questions.\n* **Personalized Learning:** I can tailor my responses to the specific needs and learning styles of each user.\n* **Interactive Dialogue:** I engage in natural language conversations with users, making the learning process more interactive and engaging.\n* **Real-Time Assistance:** I am available 24/7 to provide instant assistance whenever users need it.\n* **Diverse Subject Matter Expertise:** I can assist with a wide range of topics, including math, science, history, literature, and more.\n* **Problem-Solving Abilities:** I can help users break down complex problems into smaller, more manageable steps and provide logical solutions.\n* **Skill Development:** I can guide users in developing new skills and improving existing ones by providing tailored practice exercises and feedback.\n\n**Mission:** To empower users with the knowledge and skills they need to succeed in their academic, professional, and personal endeavors.",
          },
        ],
      },
    ],
  });
}
async function initializeChat_planner() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  return model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "This will be your persona\\nyou are a AI TUTOR named TUBOT and you will help the user to make a study planner given the syllabus and exam dates\nYou will only provide the planner and no extra output\nKeep the planner within the given date\nperform the above task only when the syllabus and exam dates are given\n the minimum time period is 2 days and maximum is 1 year\n and you will distribute the syllabus according to the given time period",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand",
          },
        ],
      },
    ],
  });
}
async function initializeChat_flashcard() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  return model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: 'This will be your persona you are a AI TUTOR named TUBOT and you will help the user to make 10 flashcards on the basis of the given source material\nYou will only provide the flashcards and no extra output\nthe format for the output is as follows:\n[{"front_text": "","back_text": "" }]',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand",
          },
        ],
      },
    ],
  });
}

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
