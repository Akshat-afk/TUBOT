const sourceTextarea = document.getElementById("source");
const notesTextarea = document.getElementById("notes");
const sendButton = document.getElementById("sendButton");

const sendMessage = async () => {
  try {
    const responseText = await fetch("/notes", {
      method: "POST",
      body: JSON.stringify({ source: sourceTextarea.value }),
    });
    const responseData = await responseText.json();
    notesTextarea.value = responseData.response;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};
sendButton.addEventListener("click", sendMessage);
