// ===== MENU LATERAL =====
const btnMenu  = document.querySelector('.btn-menu');
const btnClose = document.querySelector('.btn-close');
const menu     = document.getElementById('nav-links');
const overlay  = document.querySelector('.overlay');

function openMenu() {
    menu.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menu.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

btnMenu.addEventListener('click', openMenu);
btnClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// ===== BOTTOM NAV – ACTIVE STATE =====
const bottomItems = document.querySelectorAll('.bottom-item');
bottomItems.forEach(item => {
    item.addEventListener('click', () => {
        bottomItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});
