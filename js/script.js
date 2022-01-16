import {
  userFullName,
  userKey,
  perfilImg,
  setUserFullName,
  setUserKey,
  setPerfilImg,
  showMenuUserLogged,
  displayProfile
} from "./main.js";
import {
  saveUser,
  getUsers,
} from "./firebase.js";

const wasFounded = false;
const doLogin = async () => {
  let userQuery = document.getElementById('user').value;
  let passwordQuery = document.getElementById('password').value;

  const invalidBox = document.getElementById("invalidBox");

  if(userQuery && passwordQuery) {
    //Realizamos otra Verificación
    try {
      const users = await getUsers();
      users.forEach(doc => {
        const userAlreadyRegistered = doc.data();
        const email = userAlreadyRegistered.user;
        const password = userAlreadyRegistered.password;
        const firstName = userAlreadyRegistered.firstName;
        const lastName = userAlreadyRegistered.lastName;
        const imgURL = userAlreadyRegistered.avatar;
        if(email == userQuery && password == passwordQuery) {
          let fullName = `${firstName} ${lastName}`;
          setUserFullName(fullName);
          setUserKey(email);
          setPerfilImg(imgURL);
          showMenuUserLogged();
          displayProfile();
          wasFounded = true;
        }
      });
      if(!wasFounded) {
        wasFounded = false;
        throw error;
      }
    } catch(error) {
      invalidBox.textContent = "Usuario o Contraseña Incorrecto(s)";
    }  
  } else {
    invalidBox.textContent = "¡Entrada inválida!";
  }
  console.log(userFullName);
  console.log(userKey);
  console.log(perfilImg);
}

const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", () => {
  let section = document.getElementById("main");
  let form = `
    <div class="d-flex align-items-center justify-content-center w-100 h-100 p-3">
      <div>
        <div class="mb-3 d-flex align-items-center justify-content-evenly">
          <img src="img/T.png" alt="TuToEasyLogo" width="100" height="100" style="z-index:-1">
          <h1>Bienvenido</h1>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Correo electrónico</label>
          <input type="email" class="form-control" id="user" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">Nuestra página web nunca mostrará tus datos, bueno casi nunca.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="password">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Recordar usuario</label>
        </div>
        <button type="submit" class="btn btn-warning" id="btnToLogin">Vamos!</button>
        <button type="button" class="btn btn-danger" onclick="showMenuUserLogged()">Ver como registrado</button>
        <p id="invalidBox"></p>
      </div>
    </div>
  `;
  section.innerHTML = form;
  const btnToLogin = document.getElementById("btnToLogin");
  btnToLogin.addEventListener("click", doLogin);
});

function showLoggedIn(){
  showMenuUserLogged();
}

const doCreateAccount = async () => {
  let user = document.getElementById("user").value;
  let password = document.getElementById("password").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let avatar = document.getElementById("avatar").value;

  const invalidBox = document.getElementById("invalidBox");

  if(user && password && firstName && lastName) {
    //Realizamos otra Verificación
    try {
      let users = await getUsers();
      users.forEach(doc => {
        const email = doc.data().user;
        if(user == email) {
          throw error;
        }
      });
      //Vamos a registrar a dicho usuario
      saveUser(user, password, firstName, lastName, avatar);
      let fullName = `${firstName} ${lastName}`;
      setUserFullName(fullName);
      setUserKey(user);
      setPerfilImg(avatar);
      showMenuUserLogged();
      displayProfile();
    } catch(error) {
      invalidBox.textContent = "¡Ese correo ya ha sido registrado!";
    }
  } else {
    //Intrada inválida
    invalidBox.textContent = "¡Entrada inválida!";
  }

}

const btnRegister = document.getElementById("btnRegister");
btnRegister.addEventListener("click", () => {
  let section = document.getElementById("main");
  let form = `
    <div class="d-flex align-items-center justify-content-evenly w-100 p-3">
      <div>
        <div class="mb-3 d-flex align-items-center justify-content-evenly">
          <img src="img/T.png" alt="TuToEasyLogo" width="100" height="100" style="z-index:-1">
          <h1>Bienvenido usuario</h1>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Correo electrónico</label> 
          <input type="email" class="form-control" id="user" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="password">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Nombre</label>
          <input type="userName" class="form-control" id="firstName">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Apellido</label>
          <input type="lastName" class="form-control" id="lastName">
        </div>
        <div class="mb-3">
          <label for="avatarLink" class="form-label">Imagen</label>          
          <input type="avatar" class="form-control" id="avatar">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Recordar usuario</label>
        </div>
        <div class="mb-3 form-check">
          <p id="invalidBox"></p>
        </div>
        <button type="submit" class="btn btn-warning" id="btnToRegister">Vamos!</button>
        <button type="button" class="btn btn-danger" onclick="showMenuUserLogged()">Ver como registrado</button>
      </div>
    </div>
  `;

  section.innerHTML = form;

  const btnToRegister = document.getElementById("btnToRegister");
  btnToRegister.addEventListener("click", doCreateAccount);
});
