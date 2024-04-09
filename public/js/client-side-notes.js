const sourceTextarea = document.getElementById("source"); // Access element after it's loaded
const notesTextarea = document.getElementById("notes");
const sendButton = document.getElementById("sendButton");

const sendMessage = async () => {
  try {
    const responseText = await fetch("/notes", {
      method: "POST", // Ensure POST method for data submission
      body: JSON.stringify({ source: sourceTextarea.value }),
    });
    const responseData = await responseText.json();
    notesTextarea.value = responseData.response;
  } catch (error) {
    console.error("Error fetching response:", error);
    // Handle errors appropriately, e.g., display an error message to the user
  }
};

// Add event listener to trigger sendMessage when the button is clicked
sendButton.addEventListener("click", sendMessage);
