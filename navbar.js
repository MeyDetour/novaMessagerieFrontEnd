let icones = document.querySelectorAll('.iconeNAvbar')

icones.forEach((icone)=> {
    icone.addEventListener('mouseover', () => {
       icone.classList.toggle('fond')


    })
    icone.addEventListener('mouseout', () => {
        icone.classList.toggle('fond')


    })

})