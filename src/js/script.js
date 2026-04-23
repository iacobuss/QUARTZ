const btnMenu = document.querySelector('.btn-menu');
const btnClose = document.querySelector('.btn-close');
const menu = document.getElementById('nav-links');
const overlay = document.querySelector('.overlay');

function openMenu() {
    menu.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeMenu() {
    menu.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

btnMenu.addEventListener('click', openMenu);
btnClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu); 

$(document).ready(function() {
    $('.carrossel-home').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    // ← adiciona isso
    $('.sobre-slider').slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 400,
    });
});