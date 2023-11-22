let triangle_top = document.querySelector('#triangle-code-top');
let triangle_left = document.querySelector('#triangle-code-left');
let triangle_right = document.querySelector('#triangle-code-right');
let triangle_bottom = document.querySelector('#triangle-code-bottom');

function sizeTriangles() {
    // Triangle Top
    triangle_top.style.borderRight = `${window.innerWidth / 2}px solid transparent`;
    triangle_top.style.borderLeft = `${window.innerWidth / 2}px solid transparent`;
    triangle_top.style.borderTop = `${window.innerHeight / 3}px solid red`;
    triangle_top.style.position = 'absolute';
    triangle_top.style.left = '0';
    triangle_top.style.top = '0';

    // Triangle Left
    triangle_left.style.borderTop = `${window.innerHeight / 3}px solid transparent`;
    triangle_left.style.borderBottom = `${(window.innerHeight / 3) * 2}px solid transparent`;
    triangle_left.style.borderLeft = `${window.innerWidth / 2}px solid blue`;
    triangle_left.style.position = 'absolute';
    triangle_left.style.left = '0';
    triangle_left.style.top = '0';

    // Triangle Right
    triangle_right.style.borderTop = `${window.innerHeight / 3}px solid transparent`;
    triangle_right.style.borderBottom = `${(window.innerHeight / 3) * 2}px solid transparent`;
    triangle_right.style.borderRight = `${window.innerWidth / 2}px solid green`;
    triangle_right.style.position = 'absolute';
    triangle_right.style.right = '0';
    triangle_right.style.top = '0';

    // Triangle Bottom
    triangle_bottom.style.borderRight = `${window.innerWidth / 2}px solid transparent`;
    triangle_bottom.style.borderLeft = `${window.innerWidth / 2}px solid transparent`;
    triangle_bottom.style.borderBottom = `${(window.innerHeight / 3) * 2}px solid yellow`;
    triangle_bottom.style.position = 'absolute';
    triangle_bottom.style.left = '0';
    triangle_bottom.style.bottom = '0';
}

// Appeler la fonction au chargement initial de la page et lorsqu'elle est redimensionnée
window.addEventListener('resize', sizeTriangles);
sizeTriangles();
