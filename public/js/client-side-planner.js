const sourceTextarea = document.getElementById("source"); // Access element after it's loaded
const datesTextarea = document.getElementById("dates");
const plannerTextarea = document.getElementById("planner");
const sendButton = document.getElementById("sendButton");

const sendMessage = async () => {
  try {
    const responseText = await fetch("/studyplanner", {
      method: "POST", // Ensure POST method for data submission
      body: JSON.stringify({ source: sourceTextarea.value }+{dates: datesTextarea.value}),
    });
    const responseData = await responseText.json();
    plannerTextarea.value = responseData.response;
  } catch (error) {
    console.error("Error fetching response:", error);
    // TODO:Handle errors appropriately, e.g., display an error message to the user
  }
};

// Add event listener to trigger sendMessage when the button is clicked
sendButton.addEventListener("click", sendMessage);
