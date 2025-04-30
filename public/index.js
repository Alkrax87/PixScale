const input = document.getElementById("input-file");
const counter = document.getElementById("counter");

input.addEventListener("change", uploadImages);

function uploadImages() {
  if (input.files.length > 0) {
    if (input.files.length > 1) {
      counter.innerHTML = `<b>${input.files.length}</b> files selected`;
    } else {
      counter.innerHTML = `<b>${input.files.length}</b> file selected`;
    }
  }
}

const buttons = document.querySelectorAll(".toggle-button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
