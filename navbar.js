let icones = document.querySelectorAll('.navbar__item')
let carre = document.querySelector('.carre-navbar')

icones.forEach((icone)=> {
    icone.addEventListener('mouseover', () => {
        let pos = icone.getBoundingClientRect()
        carre.style.display = 'block'
        console.log(pos,pos.top)
        carre.style.top = `${pos.top}px`;



    })

})