const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-toggle');
//const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

//document.querySelectorAll('.nav-links a').forEach(link => {
//  link.addEventListener('click', () => {
//    navLinks.classList.remove('open');
//    menuButton.setAttribute('aria-expanded', 'false');
//  });
//});

//const observer = new IntersectionObserver(entries => {
//  entries.forEach(entry => {
//    if (entry.isIntersecting) {
//      entry.target.classList.add('visible');
//      observer.unobserve(entry.target);
//    }
//  });
//}, { threshold: 0.12 });

//document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

////document.querySelectorAll('[data-dialog]').forEach(button => {
////  button.addEventListener('click', () => {
////    const dialog = document.getElementById(button.dataset.dialog);
////    dialog.showModal();
////    document.body.classList.add('dialog-open');
////  });
////});

////document.querySelectorAll('.project-dialog').forEach(dialog => {
////  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
////  dialog.addEventListener('click', event => {
////    const rect = dialog.getBoundingClientRect();
////    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
////    if (outside) dialog.close();
////  });
////  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
////});

//document.getElementById('year').textContent = new Date().getFullYear();
