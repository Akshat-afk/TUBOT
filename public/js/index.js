function copy() {
  let textarea = document.getElementById("notes");
  textarea.select();
  document.execCommand("copy");
}
