let icones = document.querySelectorAll('.bi')

icones.forEach((icone)=> {
    icone.addEventListener('mouseover', () => {
       icone.classList.toggle('fond')


    })
    icone.addEventListener('mouseout', () => {
        icone.classList.toggle('fond')


    })

})