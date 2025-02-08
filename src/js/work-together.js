import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.work-together-form-for-users');
const modalEl = document.querySelector('.success-modal');
const closeModalBtn = document.querySelector('.footer-modal-close-btn');

const closeModal = e => {
  if (closeModalBtn.contains(e.target) || !modalEl.contains(e.target)) {
    modalEl.classList.add('visually-hidden');
    window.removeEventListener('click', closeModal);
  }
};
const closeModalByEsc = e => {
  if (e.code === 'Escape') {
    modalEl.classList.add('visually-hidden');
    window.removeEventListener('keydown', closeModalByEsc);
  }
};

formEl.addEventListener('submit', async event => {
  event.preventDefault();

  const emailInput = document.querySelector('.work-together-email-input');
  const commentInput = document.querySelector('.work-together-comment');

  const emailValue = emailInput.value.trim();
  const commentValue = commentInput.value.trim();

  if (emailValue === '' || commentValue === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please fill in all fields before submitting.',
      position: 'topRight',
    });
    return;
  }

  const formData = {
    email: emailValue,
    comment: commentValue,
  };

  console.log('Sending request:', formData);

  try {
    const response = await fetch(
      'https://portfolio-js.b.goit.study/api/requests',
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response from server:', data);

    modalEl.classList.remove('visually-hidden');

    window.addEventListener('click', closeModal);
    window.addEventListener('keydown', closeModalByEsc);

    formEl.reset();
  } catch (error) {
    console.error('Request failed:', error);

    iziToast.error({
      title: 'Error',
      message:
        'Failed to send the request. Please check your data and try again.',
      position: 'topRight',
    });

    emailInput.style.border = '2px solid red';
    commentInput.style.border = '2px solid red';

    emailInput.addEventListener('input', () => {
      emailInput.style.border = '1px solid #ccc';
    });

    commentInput.addEventListener('input', () => {
      commentInput.style.border = '1px solid #ccc';
    });
  }
});
