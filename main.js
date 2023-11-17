const root = document.documentElement;

function addStyleRule(selector, rule) {
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    styleElement.sheet.insertRule(`${selector} { ${rule} }`);

}

addStyleRule('.centered', `display :flex ; justify-content : center ; align-items : center`);


//=======================================================================
let token = null
let error2 = ""
//checker les cookies du navigateur et le rempalcer
//formulaire acceptation coockie
let content = document.querySelector('.containerFond')
const baseUrl = "https://b1messenger.imatrythis.tk/"
let nom = " "
let mdp = " "

nomsignup = ""
mdpsignup = ""
run()

function run() {
    console.log('run')
    if (!token) {
        renderForm()
    } else {
        getMessages().then(response => {
            renderMessage(response)
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
function isEmptyList(liste){
    return liste.length === 0
}

// -----------------------------------------
// Formulaire
// -----------------------------------------

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
    const forgotmdp = document.querySelector('.forgotmdp')
    nom = document.querySelector('#username')
    mdp = document.querySelector('#password')

    mdp.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getToken(nom.value, mdp.value)
            buttonLogin.classList.toggle('d-none')
        }

    })

    signup.addEventListener('click', () => {
        renderSignup()
    })

    buttonLogin.addEventListener('click', () => {

        getToken(nom.value, mdp.value)

    })

}

// -----------------------------------------
// -------------Register
// -----------------------------------------
function renderSignup() {
    let form = `
 <div class="card">
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
        register(nomsignup.value, mdpsignup.value)
    })

    btnlogin.addEventListener('click', () => {
        renderForm()
    })


}

async function register(name, mdpasse) {
    fetch(`${baseUrl}register`, profilParametreFetch(name, mdpasse))
        .then(response => response.json())
        .then(data => {
            console.log(name, mdpasse)
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
                nomsignup.value = ""
                mdpsignup.value = ""
            } else {
                getToken(name, mdpasse)

            }


        })
}


// -----------------------------------------
// -------------Obtenir Token
// -----------------------------------------
function profilParametreFetch(name, mdpasse) {
    const utilisateur = {
        username: name,
        password: mdpasse,
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
            } else {
                console.log(token)
                token = data.token
                run()
                //stocker dans les cookies
            }
        })
}

// -----------------------------------------
// -------------Affichage messaage
// -----------------------------------------
function renderMessage(listeMessage) {
    let fil = `
      <div class="filDiscussion">
        <div class="messages">

        </div>
        <div class="postMessage">
            <input title="Write Message" tabindex="i" pattern="\\d+" placeholder="Message.." class="msgInput"
                   type="text">
            <i class="bi bi-send"></i>
            <i class="bi bi-arrow-clockwise refreshBtn"></i>
        </div>
    </div>
    `
    render(fil)
    let bouttonSend = document.querySelector('.bi-send')
    let boutonRefresh = document.querySelector('.refreshBtn')
    const messageAEnvoyer = document.querySelector('.msgInput')
    messageAEnvoyer.focus()
    console.log(isNotEmpty(messageAEnvoyer.value))

    messageAEnvoyer.addEventListener('keypress', (e) => {
        if (e.key === "Enter" && e.shiftKey){
            console.log('maj')
            messageAEnvoyer.value += '\'
        }
            console.log(e)
        if (e.key === 'Enter') {
            if (isNotEmpty(messageAEnvoyer.value)) {
                sendMessage(messageAEnvoyer)
            }
            run()
        }

    })

    bouttonSend.addEventListener('click', () => {
        if (isNotEmpty(messageAEnvoyer.value)) {
            sendMessage(messageAEnvoyer)
        }
        run()

    })


    boutonRefresh.addEventListener('click', () => {
        run()
    })


    listeMessage.forEach((message) => {
        addMessage(message)
        let id = message.id


        if (message.author.username === nom.value) {
            document.querySelector(`.option${id}`).innerHTML += `
               <div class="poubelle" id=${id}> <i class="bi bi-trash"></i></div>
                <div class="crayon" id=${id}> <i class="bi bi-pencil"></i></div>
             
              `

        }
        else{
            document.querySelector(`.option${id}`).innerHTML += `
   <div class="reaction" id=${id}><i class="bi bi-chat-square-heart"></i></div>
            <div class="repondre" id=${id}>    <i class="bi bi-chat"></i></div>`

            if (!isEmptyList(message.responses)){
                let reponse = document.querySelector(`.reponses${id}}`)

                reponse.innerHTML = `${message.responses.lenght} Réponses...`
                reponse.addEventListener('click',()=>{
                    console.log('click reponse')
                })
        }


    }})
    let poubelles = document.querySelectorAll('.poubelle');
    let crayons = document.querySelectorAll('.crayon');
    let reactions = document.querySelectorAll('.reaction');
    let repondres = document.querySelectorAll('.repondre');

    poubelles.forEach((poubelle) => {
        poubelle.addEventListener('click', () => {
            supprimerMessage(poubelle.id)
        });
    });

    crayons.forEach((crayon) => {
        crayon.addEventListener('click', () => {
            console.log(crayon.id)
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
            console.log(repondre)
            repondreMessaage(repondre.id)
        });
    });

}

async function getMessages() {
    //get message
    const messengerMessage =
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    return await fetch(`${baseUrl}api/messages`, messengerMessage)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Invalid credentials.") {
                renderForm()
            } else {
                return data
            }


        })
}

function identifier(usernom) {
    if (nom.value === usernom) {
        return "Vous"
    }
    return usernom
}

function addMessage(message) {
    const zoneMessage = document.querySelector('.messages')
    let id = message.id
    zoneMessage.innerHTML += `                    
                              <div class="task ">
                                <div class="tags">
                                  <span class="tag">${identifier(message['author']['username'])}</span>
                                  <button class="options option${id} d-flex flex-row">
                                 
                                    </button>
                                </div>
                                <div >
                                <p class='messaageContenu${id}'> ${message.content}</p>
                                </div>
                              
                                <div class="stats">
                                  <div class="donneeSUp">
                                  
                                    <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linecap="round" stroke-width="2" d="M12 8V12L15 15"></path> <circle stroke-width="2" r="9" cy="12" cx="12"></circle> </g></svg>${message['createdAt'].slice(0, 10)}</div>
                                      <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z"></path> </g></svg>18</div>
                                      <div><svg fill="#000000" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-2.5 0 32 32"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path fill="#000000" d="M0 10.284l0.505 0.36c0.089 0.064 0.92 0.621 2.604 0.621 0.27 0 0.55-0.015 0.836-0.044 3.752 4.346 6.411 7.472 7.060 8.299-1.227 2.735-1.42 5.808-0.537 8.686l0.256 0.834 7.63-7.631 8.309 8.309 0.742-0.742-8.309-8.309 7.631-7.631-0.834-0.255c-2.829-0.868-5.986-0.672-8.686 0.537-0.825-0.648-3.942-3.3-8.28-7.044 0.11-0.669 0.23-2.183-0.575-3.441l-0.352-0.549-8.001 8.001zM1.729 10.039l6.032-6.033c0.385 1.122 0.090 2.319 0.086 2.334l-0.080 0.314 0.245 0.214c7.409 6.398 8.631 7.39 8.992 7.546l-0.002 0.006 0.195 0.058 0.185-0.087c2.257-1.079 4.903-1.378 7.343-0.836l-13.482 13.481c-0.55-2.47-0.262-5.045 0.837-7.342l0.104-0.218-0.098-0.221-0.031 0.013c-0.322-0.632-1.831-2.38-7.498-8.944l-0.185-0.215-0.282 0.038c-0.338 0.045-0.668 0.069-0.981 0.069-0.595 0-1.053-0.083-1.38-0.176z"> </path> </g></svg>7</div>
                                    </div>
                                    <div class="reponses${id}"></div>
                                  <div class="reaction${id}"></div>
                                  </div>
                    `


}
function getRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
 return `rgb(${red}, ${green}, ${blue})`;
}

// -----------------------------------------
// -------------Envoyer
// -----------------------------------------

function postMessage(message) {
    console.log(token, message)
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

    fetch('https://b1messenger.imatrythis.tk/api/messages/new', messengerMessage)
        .then(response => response.json())
        .then(data => {
            //"ok"

            run()


        })
}

function sendMessage(messageAEnvoyer) {
    postMessage(messageAEnvoyer.value)
    messageAEnvoyer.value = ""
}

// -----------------------------------------
// -------------Modifier Message
// -----------------------------------------
function supprimerMessage(id) {

    const supprimerParam =
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        }
    fetch(`${baseUrl}api/messages/delete/${id}`,supprimerParam).then(response=>response.json()).then(data=>{
        run()
    })
}

function modifierMessage(id) {
    let message = document.querySelector(`.messaageContenu${id}`)
    let messageInput = document.createElement('input')
    messageInput.value = message.innerHTML
    messageInput.type = 'text'
    message.replaceWith(messageInput)

    messageInput.addEventListener('keypress',(e)=>{
        if(e.key === 'Enter'){
            console.log('entrer')
            const param =
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        'content': `${messageInput.value}  (Modified)`
                    })
                }
            console.log(id)
            fetch(`${baseUrl}api/messages/${id}/edit`, param)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                     message = document.createElement('p')
                    message.innerHTML = messageInput.value
                    message.classList.add(`messaageContenu${id}`)
                    messageInput.replaceWith(message)
                    run()

                })


        }
    })



}

function reactionMessage(id) {
let reaction = document.querySelector(`.reaction${id}}`)

}

function repondreMessaage(id) {

}