document.addEventListener('DOMContentLoaded', (event) => {
  const header = document.getElementById('header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
      // Scroll Down
      header.classList.add('nav-up');
    } else {
      // Scroll Up
      header.classList.remove('nav-up');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }, false);

  // Toggle menu in mobile view
  const navIcon = document.getElementById('nav-icon');
  navIcon.addEventListener('click', () => {
    const navList = header.querySelector('nav > ul');
    const isDisplayed = window.getComputedStyle(navList).display !== 'none';
    navList.style.display = isDisplayed ? 'none' : 'block';
  });
});
