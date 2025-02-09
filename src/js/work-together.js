import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const formEl = document.querySelector('.work-together-form-for-users');
const modalEl = document.querySelector('.success-modal');
const backdropEl = document.querySelector('.modal-work-together');
const closeModalBtn = document.querySelector('.footer-modal-close-btn');

const closeModal = e => {
  if (closeModalBtn.contains(e.target) || backdropEl.contains(e.target)) {
    modalEl.classList.remove('is-open');
    backdropEl.classList.remove('is-open');
    window.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModalByEsc);
  }
};

const closeModalByEsc = e => {
  if (e.code === 'Escape') {
    modalEl.classList.remove('is-open');
    backdropEl.classList.remove('is-open');
    window.removeEventListener('keydown', closeModalByEsc);
  }
};

formEl.addEventListener('submit', async event => {
  event.preventDefault();
  const emailInput = document.querySelector('.email-input');
  const commentInput = document.querySelector('.comment-input');
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

    modalEl.classList.add('is-open');
    backdropEl.classList.add('is-open');

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
  }
});
