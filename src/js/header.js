const headerBurgerBtn = document.querySelector('.burger-icon-btn');
const headerModalWindow = document.querySelector('.header-modal');
const headerCloseBtn = document.querySelector('.header-modal-close-btn');
const headerModalMenu = document.querySelector('.header-modal-menu');
const headerModalOrderBtn = document.querySelector('.header-modal-order-btn');
const headerNavMenu = document.querySelector('.header-nav-menu');
const headerMenuList = document.querySelector('.header-menu-list');
const headerOrderBtn = document.querySelector('.header-order-btn');

const toggleHeaderNavMenu = function () {
  try {
    if (!headerMenuList) {
      throw new Error('the menu has not been found');
    }
    headerMenuList.classList.toggle('visually-hidden');
  } catch (error) {
    console.log(error.message);
  }
};
const showHeaderModalWindow = function () {
  try {
    if (!headerModalWindow)
      throw new Error('the menu modal window has not been found');
    headerModalWindow.classList.remove('visually-hidden');
    setTimeout(
      () => {
        headerModalWindow.classList.add('header-modal-active');
        document.body.classList.add('no-scroll'); // Додаємо клас для блокування прокручування
      },
      10
    );
  } catch (error) {
    console.log(error.message);
  }
};

const closeHeaderModalWindow = function () {
  try {
    if (!headerModalWindow)
      throw new Error('the menu modal window has not been found');
    headerModalWindow.classList.remove('header-modal-active');
    setTimeout(() => {
      headerModalWindow.classList.add('visually-hidden');
      document.body.classList.remove('no-scroll'); // Видаляємо клас для відновлення прокручування
    }, 10);
  } catch (error) {
    console.log(error.message);
  }
};
const moveToAnchor = function (event, isModal = true) {
  try {
    event.preventDefault();
    const targetAnchor = event.target.getAttribute('href');
    if (!targetAnchor || targetAnchor === '#') {
      return;
    }
    document.querySelector(targetAnchor).scrollIntoView({ behavior: 'smooth' });
    if (isModal) {
      closeHeaderModalWindow();
    }
  } catch (error) {
    console.log(error.message);
  }
};

headerBurgerBtn.addEventListener('click', showHeaderModalWindow);

headerCloseBtn.addEventListener('click', closeHeaderModalWindow);

headerModalMenu.addEventListener('click', moveToAnchor);

headerModalOrderBtn.addEventListener('click', moveToAnchor);

headerNavMenu.addEventListener('click', toggleHeaderNavMenu);

headerMenuList.addEventListener('click', event => {
  moveToAnchor(event, false);
  toggleHeaderNavMenu();
});

headerOrderBtn.addEventListener('click', event => {
  moveToAnchor(event, false);
});
