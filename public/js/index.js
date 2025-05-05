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