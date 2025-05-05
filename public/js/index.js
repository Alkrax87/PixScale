/* Tab section functionality */
const toogleTabButtons = document.querySelectorAll('.toggle-tab');

toogleTabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    toogleTabButtons.forEach((button) => {
      button.classList.remove('active');
    });
    btn.classList.add('active');

    document.querySelectorAll('.tab').forEach((tab) => {
      if (!tab.classList.contains('hidden')) {
        tab.classList.add('hidden');
      }
    });

    document.getElementById(btn.value).classList.remove('hidden');
  });
});

/* Output format buttons functionality */
const toggleFormatButtons = document.querySelectorAll('.toggle-format');

toggleFormatButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    toggleFormatButtons.forEach((button) => {
      button.classList.remove('active');
    });
    btn.classList.add('active');
  });
});

/* Size Options */
const customSizeSection = document.getElementById('custom-size-section');
const customSizeRadio = document.getElementById('custom-size');
const keepOriginalSizeRadio = document.getElementById('keep-original');
let sizeStatus = false;

customSizeRadio.addEventListener('change', () => {
  if (customSizeRadio.checked) {
    sizeStatus = true;
    customSizeSection.classList.remove('hidden');
  }
});
keepOriginalSizeRadio.addEventListener('change', () => {
  if (keepOriginalSizeRadio.checked) {
    sizeStatus = false;
    customSizeSection.classList.add('hidden');
  }
});