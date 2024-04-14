function notes_copy() {
  let textarea = document.getElementById("notes");
  textarea.select();
  document.execCommand("copy");
}

function planner_copy() {
  let textarea = document.getElementById("planner");
  textarea.select();
  document.execCommand("copy");
}

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (scrollY > 20) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  } else {
    navbar.style.backgroundColor = "#e4e4de";
  }
});
