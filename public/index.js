const input = document.getElementById('input-file');
const counter = document.getElementById('counter');

input.addEventListener('change', uploadImages);

function uploadImages(){
  if (input.files.length > 0) {
    counter.innerHTML = `Images uploaded: ${input.files.length}`;
  }
}