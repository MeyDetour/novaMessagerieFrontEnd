const root = document.documentElement;

function addStyleRule(selector, rule) {
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    styleElement.sheet.insertRule(`${selector} { ${rule} }`);

}

addStyleRule('.centered', `display :flex ; justify-content : center ; align-items : center`);


//=======================================================================
let ancien_token = null
let freshener = ""
let token = ancien_token
let imgpdp = null
let nav = ""
let error2 = ""
let error = ""
//checker les cookies du navigateur et le rempalcer
//formulaire acceptation coockie
let content = document.querySelector('.containerFond')
const baseUrl = "https://b1messenger.imatrythis.com/"
let nomUser = ""
let homemresponsive = null
let listemessage = ""
let nomsignup = ""
let mdpsignup = ""
let croix = null
let menuBurger = null

console.log(document.cookie)
setTimeout(() => {
    renderCoockie()
    document.querySelector('#consentcoockie').addEventListener('click', () => {
        run()
    })
    document.querySelector('#noconsentcookie').addEventListener('click', () => {
        renderVide()
    })
}, 2200)


function run() {
    console.log('run')

    if (!token) {
        renderForm()
    } else {
        getMessages().then(response => {
            listemessage = response
            renderMessage(response)
            renderInterface()
            addActionEvent()
            scrollY()
        })
    }

}

function scrollY() {
    const filD = document.querySelector('.messages')
    filD.scrollTo(0, filD.scrollHeight);
}

function render(contenu) {
    content.innerHTML = ""
    content.innerHTML = contenu

}

function isNotEmpty(message) {
// trim() enleve les espaacesinutile de la chaine de caractere donc si le message est rempli d'espace la fonction les enleve
    // return true si elle n'est pas vide

    return message.trim() !== ''
}

function isNull(variable) {
    return variable === null
}

changeProfilImage()

function isEmptyList(liste) {
    return liste.length === 0
}


// -----------------------------------------Formulaire


function renderForm() {
    let form = `
    <div class="loginform">
        <p class="heading">Login</p>
        <div class="inputContainer">
            <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e"
                 viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input type="text" class="inputField" id="username" placeholder="Username">
        </div>
        <div class="inputContainer">
            <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e"
                 viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input type="password" class="inputField" id="password" placeholder="Password">
        </div>
        <button id="buttonLogin">Submit</button>
        <span class="error"></span>
        <a class="loginpage" id="signup" href="#">Signup</a>
        <a class="forgotLink" id="forgotmdp" href="#">Forgot your password?</a>
    </div>
    `
    render(form)

    error = document.querySelector('.error')
    const buttonLogin = document.querySelector('#buttonLogin')
    const signup = document.querySelector('#signup')
    let nom = document.querySelector('#username')
    let mdp = document.querySelector('#password')
    nom.focus()
    nom.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            mdp.focus()
        }

    })

    mdp.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getToken(nom, mdp).then(response => {
                buttonLogin.classList.toggle('d-none')
            })

        }

    })

    signup.addEventListener('click', () => {
        renderSignup()
    })

    buttonLogin.addEventListener('click', () => {
        getToken(nom, mdp)

    })

}

// -----------------------------------------Register

function renderSignup() {
    let form = `
 <div class="card" id="signupForm">
        <h4 class="title">Sign up!</h4>

        <div class="field">
            <svg class="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path>
            </svg>
            <input autocomplete="off" id="usernamesignup" placeholder="Username" class="input-field" name="logemail"
                   type="email">
        </div>
        <div class="field">
            <svg class="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path>
            </svg>
            <input autocomplete="off" id="mdpsignup" placeholder="Password" class="input-field" name="logpass"
                   type="password">
        </div>
                  <span class="error2"></span>
        <button class="btn submitsignup" type="submit">Sign up</button>

      <a  id="loginfromsignup" href="#">Login</a>
    </div>
`
    render(form)
    error2 = document.querySelector('.error2')
    let submitsignup = document.querySelector('.submitsignup')
    let btnlogin = document.querySelector('#loginfromsignup')
    nomsignup = document.querySelector('#usernamesignup')
    mdpsignup = document.querySelector('#mdpsignup')

    submitsignup.addEventListener('click', () => {
        register(nomsignup, mdpsignup)
    })

    btnlogin.addEventListener('click', () => {
        renderForm()
    })


}

async function register(name, mdpasse) {
    fetch(`${baseUrl}register`, profilParametreFetch(name, mdpasse))
        .then(response => response.json())
        .then(data => {


            console.log(data)
            if (data === "username already taken" || data === "try with 6+ chars for password") {
                if (data === "try with 6+ chars for password") {
                    error2.textContent = 'Il vous faaut un mot de passe de +6 caractere ! :)'
                    setTimeout(() => {
                        error2.textContent = ""
                    }, 2000)
                }
                if (data === "username already taken") {
                    error2.textContent = 'Pseudo deja prit ! :)'
                    setTimeout(() => {
                        error2.textContent = ""
                    }, 2000)
                }
                name.value = ""
                mdpasse.value = ""
            } else {
                document.querySelector('#signupForm').style.filter = ' drop-shadow(2px 4px 12px green)'
                setTimeout(()=> {
                    nomUser = name.value

                    renderForm()
                }, 1000)


            }


        })
}


// -----------------------------------------Obtenir Token

function profilParametreFetch(name, mdpasse) {
    const utilisateur = {
        username: name.value,
        password: mdpasse.value,
    }
    const messengerLogin =
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(utilisateur)
        }
    return messengerLogin
}

async function getToken(name, mdpasse) {

    //login
    return await fetch(`${baseUrl}login`, profilParametreFetch(name, mdpasse))
        .then(response => response.json())
        .then(data => {
            //data = token
            //mauvais pseudo&mdp

            if (data.message === "Invalid credentials.") {

                error.textContent = 'Erreur ! Veuillez réessayer merci :)'
                setTimeout(() => {
                    error.textContent = ""
                }, 2000)
                nom.value = ""
                mdp.value = ""
                nom.focus()
            } else {
                console.log(data)
                console.log('token : ', data.token)
                token = data.token
                nomUser = name.value

                setCookie("token", token, 30);
                freshener = data.freshener

                run()
                //stocker dans les cookies
            }
        })
}

// -----------------------------------------Affichage  INTERFACE
function renderVide() {
    content.classList.toggle('containerFond')
    content.classList.toggle('videIntersideral')
    let temp =
        `<h1 class="text-white">Tu viens de tomber dans le vide intersideral...</h1>`
    render(temp)
}

function renderInterface() {
    let navbar = document.querySelector('.navbarInterface')
    if (navbar.classList.contains('d-none')) {
        navbar.classList.remove('d-none')
    }

    navbar.innerHTML =
        `
<div class="d-flex flex-row  justify-content-between">
  <a href="#" class="btn-opt-navbar joyeux burgernavbar "><i class=" bi bi-list"></i></a>
  <a href="#" class="btn-opt-navbar white "><i class="d-none fermermenunavbar bi bi-x-lg"></i></a>
 <img src="image/logo.png" alt="logoNova" class="  imagelogomenuNavbar"></div>
   </div>
    <div class="navbar__item   ">
    <img src="image/logo.png" alt="logoNova" class="imagelogoNavbar"></div>
    <div class=" convPrivéListe">
        <a href="#" class="btn-opt-navbar"></a>
    </div>
  
    <div class="navbar__item">
            <div class="imagepdpContainer image" ><div class="popoverOptProfil d-none  centered">
                <span class="popoverOption ">Statut</span>   
                  <span class="popoverOption" onclick="renderEditProfil()">Edit Profil</span> 
                    <span class="  ">Deconnexion</span> 
                
                    </div></div> 
        <a href="#" class="btn-opt-navbar"><i class="iconeNAvbar bi bi-gear"></i></a>

</div>`

}

function renderResponsiveMenu() {
    let cont = `
<div class="menunavbar">
<div class="asidemenu centered"> 
    <div class="navbar__item-menu   ">
    
        <a href="#" class="btn-opt-navbar"><i class="iconeNAvbar bi bi-house-door"></i></a>
  
        <a href="#" class="btn-opt-navbar"><i class="iconeNAvbar bi bi-chat-left"></i></a>
    </div>
        <div class="navbar__item-menu">
            <a href="#" class="btn-opt-navbar"><i class="iconeNAvbar bi bi-gear"></i></a>
             <div class="imagepdpContainer2 image"></div>  
            </div>  
     </div>
       <div class=" convPrivéListe2">
        <a href="#" class="btn-opt-navbar"></a>
    </div>
</div>
`
    render(cont)
}

function renderCoockie() {
    let cookie =
        ` <div class="cookie-consent-banner">
        <div class="cookie-consent-banner__inner">
            <div class="cookie-consent-banner__copy">
                <div class="cookie-consent-banner__header">Les fameux cookies ! </div>
              
                <div class="cookie-consent-banner__description">C'est juste pour te prévenir que ce site utilise des coockies, si tu n'es pas d'accord.. Pars. 
            </div>  </div>

            <div class="cookie-consent-banner__actions">
                <a href="#" id="consentcoockie" class="cookie-consent-banner__cta">
                    OK
                </a>

                <a href="#" id="noconsentcookie" class="cookie-consent-banner__cta cookie-consent-banner__cta--secondary">
                    Partir
                </a>
            </div>
        </div></div>
    `
    render(cookie)


}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let tokenstring = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == '') {
            c = c.substring(1);
        }
        if (c.indexOf(tokenstring) == 0) {
            return c.substring(tokenstring.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let dataToken = getCookie("token");
    if (dataToken != "") {
        token = dataToken
    } else {
        if (dataToken != "" && dataToken != null) {
            run()

        }
    }
}

// -----------------------------------------Affichage messaage

function renderMessage(listeMessage) {
    let fil = `
      <div class="filDiscussion">
        <div class="messages">

        </div>
        <div class="postMessage">
          <textarea title="Write Message" tabindex="1" placeholder="Message.." class="msgInput"></textarea>
        

            <i class="bi bi-send sendBtn"></i>
            <i class="bi bi-arrow-clockwise refreshBtn"></i>
        </div>
    </div>
    `
    render(fil)

    //point B


//point c
    listeMessage.forEach((message) => {
        addMessage(message)
        addActions(message)
    })


}

async function getMessages() {
    //get message
    const messengerMessage =
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    return await fetch(`${baseUrl}api/messages`, messengerMessage)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Invalid credentials.") {
                renderForm()
            }
            if (data.message === 'Expired JWT Token') {
                refreshToken()
            } else {
                return data
            }


        })
}

function haveDisplayname(a){

    if(isNull(a.displayName)){
        return a.username
    }
    else {
        return a.displayName
    }

}

function identifier(mess) {
    let auteur = mess.author

    if (nomUser === auteur.username) {
        return ` Vous : ${haveDisplayname(auteur)}`
    }
    return haveDisplayname(auteur)
}

function addMessage(message) {
    const zoneMessage = document.querySelector('.messages')

    let id = message.id
    zoneMessage.innerHTML += `        
        <div class="containerMessage containerMessage${id}">          
                              <div class="task ">
                                <div class="tags">
                                  <button class="tag tag${id}">${identifier(message)}</button>
                                  <button class="options option${id} d-flex flex-row">
                                 
                                    </button>
                                </div>
                                <div >
                               <textarea readonly class='textareaMessage messageContenu${id}'>${message.content}</textarea>

                                </div>
                              
                                <div class="stats">
                                  <div class="donneeSUp">
                                  
                                    <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linecap="round" stroke-width="2" d="M12 8V12L15 15"></path> <circle stroke-width="2" r="9" cy="12" cx="12"></circle> </g></svg>${message['createdAt'].slice(0, 10)}</div>
                                      <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z"></path> </g></svg>${message.responses.length}</div>
                                      <div><svg fill="#000000" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-2.5 0 32 32"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path fill="#000000" d="M0 10.284l0.505 0.36c0.089 0.064 0.92 0.621 2.604 0.621 0.27 0 0.55-0.015 0.836-0.044 3.752 4.346 6.411 7.472 7.060 8.299-1.227 2.735-1.42 5.808-0.537 8.686l0.256 0.834 7.63-7.631 8.309 8.309 0.742-0.742-8.309-8.309 7.631-7.631-0.834-0.255c-2.829-0.868-5.986-0.672-8.686 0.537-0.825-0.648-3.942-3.3-8.28-7.044 0.11-0.669 0.23-2.183-0.575-3.441l-0.352-0.549-8.001 8.001zM1.729 10.039l6.032-6.033c0.385 1.122 0.090 2.319 0.086 2.334l-0.080 0.314 0.245 0.214c7.409 6.398 8.631 7.39 8.992 7.546l-0.002 0.006 0.195 0.058 0.185-0.087c2.257-1.079 4.903-1.378 7.343-0.836l-13.482 13.481c-0.55-2.47-0.262-5.045 0.837-7.342l0.104-0.218-0.098-0.221-0.031 0.013c-0.322-0.632-1.831-2.38-7.498-8.944l-0.185-0.215-0.282 0.038c-0.338 0.045-0.668 0.069-0.981 0.069-0.595 0-1.053-0.083-1.38-0.176z"> </path> </g></svg>${message.reactions.length}</div>
                                  
                                     <span class="">id : ${id}</span>  </div>
                                  </div></div>  
                    `


}

function getRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

// -----------------------------------------Envoyer


async function postMessage(message) {
    const messengerMessage =
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'content': `${message}`
            })
        }

    await fetch(`${baseUrl}api/messages/new`, messengerMessage)
        .then(response => response.json())
        .then(data => {
            //"ok"



        })
}

// -----------------------------------------Modifier Message par  raccourci et event

function modifierInnerMessage(e, textarea, methode, id) {

    if (e.key === 'Enter' || e === 'null') {
        if (e.key === 'Enter') {
            e.preventDefault()

        }

        if (e.shiftKey) {

            textarea.value += '\n'
        } else {

            if (methode === 'a') {
                if (isNotEmpty(textarea.value)) {

                    postMessage(textarea.value).then(response => {
                        textarea.value = ''; // Clear the input after sending

                        run()
                    });

                }
            } else if (methode === 'b') {

                textarea.classList.toggle('textareamodify')
                fetchModifier(textarea.value, id)
            } else {

                return textarea.value
            }


        }
    }
}

function addActions(message) {
    let id = message.id
    //   console.log(message.reactions,message.responses)
    //  console.log(message.reactions.length,message.responses.length)
    let containermessage = document.querySelector(`.containerMessage${id}`)

    if (message.author.username === nomUser) {
        containermessage.classList.add('rightMessage')
        document.querySelector(`.option${id}`).innerHTML += `
               <div class="poubelle" id=${id}> <i class="bi bi-trash"></i></div>
                <div class="crayon" id=${id}> <i class="bi bi-pencil"></i></div>
            
              `
    } else {
        containermessage.classList.add('leftMessage')
        document.querySelector(`.option${id}`).innerHTML += `
               <div class="reaction" id=${id}><i class="bi bi-chat-square-heart"></i></div>
               <div class="repondre" id=${id}>    <i class="bi bi-chat"></i></div>`

    }

}

function addActionEvent() {
 croix = document.querySelector('.fermermenunavbar')
    homemresponsive = document.querySelector('.imagelogomenuNavbar')
    let home = document.querySelector('.imagelogoNavbar')

    menuBurger = document.querySelector('.burgernavbar')
    const bouttons = document.querySelectorAll('.sendBtn, .refreshBtn');
    const messageAEnvoyer = document.querySelector('.msgInput')
    let poubelles = document.querySelectorAll('.poubelle');
    let crayons = document.querySelectorAll('.crayon');
    let reactions = document.querySelectorAll('.reaction');
    let repondres = document.querySelectorAll('.repondre');
    let optProfil = document.querySelector('.imagepdpContainer')

    optProfil.addEventListener('click',()=>{

        let popoverOptProfil = document.querySelector('.popoverOptProfil')
        popoverOptProfil.classList.toggle('d-none')

    })
    homemresponsive.addEventListener('click',()=>{
    run()
})
    home.addEventListener('click',()=>{
        run()
    })
    if(window.innerWidth >1048 ){
        messageAEnvoyer.focus()
    }

    window.addEventListener('resize',()=>{

        run()
    })
    croix.addEventListener('click', () => {
        fermermenu()
    })
    menuBurger.addEventListener('click', () => {

        ouvrirmenu()
    })
//let tagsName = document.querySelectorAll('.tag')
    poubelles.forEach((poubelle) => {

        poubelle.addEventListener('click', () => {
            supprimerMessage(poubelle.id)
        });
    });

    crayons.forEach((crayon) => {
        crayon.addEventListener('click', () => {

            modifierMessage(crayon.id);
        });
    });

    reactions.forEach((reaction) => {
        reaction.addEventListener('click', () => {
            reactionMessage(reaction.id)
        });
    });

    repondres.forEach((repondre) => {
        repondre.addEventListener('click', () => {
            repondreMessaage(repondre.id)
        });
    });

    messageAEnvoyer.addEventListener('keydown', (e) => {
        modifierInnerMessage(e, messageAEnvoyer, 'a', null); //envoie le message
    });
    bouttons.forEach((boutton) => {

        boutton.addEventListener('click', function () {

            if (this.classList.contains('sendBtn') && isNotEmpty(messageAEnvoyer.value)) {
                modifierInnerMessage('null', messageAEnvoyer, 'a', null); // envoie le message
            } else if (this.classList.contains('refreshBtn')) {
                run();
            }
        });
    });
    document.querySelectorAll(".textareaMessage").forEach((textarea) => {
        textarea.style.height = "1px";
        textarea.style.height = (1 + textarea.scrollHeight) + "px";

    })

}

// -----------------------------------------options


function supprimerMessage(id) {

    const supprimerParam =
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        }
    fetch(`${baseUrl}api/messages/delete/${id}`, supprimerParam).then(response => response.json()).then(data => {
        run()
    })
}

function modifierMessage(id) {
    let message = document.querySelector(`.messageContenu${id}`);
    message.readOnly = false;
    message.classList.toggle('textareamodify')
    message.addEventListener('keydown', (e) => {

        modifierInnerMessage(e, message, 'b', id)


    })
}

async function fetchModifier(nvCOntenu, id) {
    const param = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            'content': `${nvCOntenu}  (Modified)`
        })
    };

    await fetch(`${baseUrl}api/messages/${id}/edit`, param)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            run();
        });
}

async function reactionMessage(id) {
    console.log(id)
    const messengerReact =
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    await fetch(`${baseUrl}api/reaction/message/${id}/lol`, messengerReact)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            run()
        })
}

async function repondreMessaage(id) {
    console.log(id)
    const messengerReact =
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'content': 'coucou'
            })
        }
    await fetch(`${baseUrl}api/responses/${id}/new`, messengerReact)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            run()
        })
}

// -----------------------------------------Modifier Message

async function refreshToken() {
    console.log(freshener)
    const freshParam =
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "freshener": freshener
            })
        }
    fetch(`https://b1messenger.imatrythis.com/refreshthistoken`, freshParam)
        .then(response => response.json())
        .then(data => {
            token = data.token
            freshener = data.freshener
            console.log(data)

            run()
        })

}

async function logout() {

}

// -----------------------------------------MENU NQVBQR
function fermermenu(){
    console.log("fermer")
    nav = document.querySelector('.navbarInterface2')
    switchNavbarInterface()
    menuBurger.style.display = 'block'
    homemresponsive.style.display = 'block'

    run()
}
function ouvrirmenu(){
    nav = document.querySelector('.navbarInterface')
    renderResponsiveMenu()
    switchNavbarInterface()
    menuBurger.style.display = 'none'
    homemresponsive.style.display = 'none'
}
function switchNavbarInterface(){
    nav.classList.toggle('navbarInterface')
    nav.classList.toggle('navbarInterface2')
    croix.classList.toggle('d-none')
}
// -----------------------------------------Edit profil
function renderEditProfil(){
    let fil =`
 <div class="paramContainer  centered">
        <div class="paramcontenuEditProfil">
        <div class="optEditProfilImagePdp image"></div>
            <div class="editProfil">
                <label for="paramDisplayName">Nom d'affichage : </label>
                <input type="text" name="displayname" id="paramDisplayName" readonly value="">
                <label for="paramUsername">Nom d'utilisateur : </label>
                <input type="text" name="username" id="paramUsername" readonly value="">

            </div>

        </div>
        <label for="paramProfilBio">Bio : </label>
        <textarea type="text" name="bio" id="paramProfilBio" readonly value=""></textarea>
  </div>
    </div>
    `
    render(fil)
}

function changeProfilImage() {
    if (isNull(imgpdp)) {
        imgpdp = 'image/defaultimg.png'
    }

    document.querySelector('.imagepdpContainer').style.backgroundImage = `url("${imgpdp}");`
    console.log(document.querySelector('.imagepdpContainer'))
}

function updateImage(){

}

function setProfilImage() {
    const param =
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "displayName": 'MeïMeï'
            })

        }
    fetch(`${baseUrl}api/profilepicture`, param).then(response => response.json())
        .then(data => {
            console.log(data)
        })

}

async function editDisplayName() {
    const param =
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "displayName": 'MeïMeï'
            })

        }
    fetch(`${baseUrl}api/profile/edit`, param).then(response => response.json())
        .then(data => {
            console.log(data)
        })

}

//https://twitter.com/One_div

