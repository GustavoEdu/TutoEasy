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
        <button type="submit" class="btn btn-warning" onclick="doLogin()">Vamos!</button>
        <button type="" class="btn btn-danger" onclick="showMenuUserLogged()">Ver como registrado</button>
      </div>
    </div>
  `;
  section.innerHTML = form;
});

function doLogin() {
  let user = document.getElementById('user').value;
  let password = document.getElementById('password').value;

  let loginPerl = `./cgi-bin/login.pl?id=${user}&password=${password}`;
  fetch(loginPerl)
  .then(response => response.text())
  .then(data => {
    let xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    console.log(xml);
    loginResponse(xml);
  }).catch(error => {
    showLogin();
  });
}

function loginResponse(xml){
  let user = (xml.getElementsByTagName('owner'))[0].childNodes[0].nodeValue;
  let firstName = (xml.getElementsByTagName('firstName'))[0].childNodes[0].nodeValue;
  let lastName = (xml.getElementsByTagName('lastName'))[0].childNodes[0].nodeValue;

  let fullName = firstName+" "+lastName;
  let element = document.getElementById("main");
    
  if (user == undefined || user == ''){
    console.log("Entrada no válida");
    showLogin();
  } else {
    console.log("Logeado o Registrado Correctamente");
    userFullName = fullName;
    userKey = user;
    showLoggedIn();
  }
}

function showLoggedIn(){
  showMenuUserLogged();
}

const btnRegister = document.getElementById("btnRegister");
btnRegister.addEventListener("click", () => {
  console.log("Estamos en showCreateAccount");
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
      <input type="password" class="form-control" id="userName">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Apellido</label>
      <input type="password" class="form-control" id="lastName">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Recordar usuario</label>
    </div>
    <button type="submit" class="btn btn-warning" onclick="doLogin()">Vamos!</button>
    <button type="" class="btn btn-danger" onclick="showMenuUserLogged()">Ver como registrado</button>
  </div>
</div>
  `;
  section.innerHTML = form;
});

function doCreateAccount(){
  let user = document.getElementById("user").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let lastName = document.getElementById("lastName").value;
    
  if (user == '' || password == '' || name == '' || lastName == ''){
    showCreateAccount();
  } else {
    let registerPerl = "cgi-bin/register.pl?id="+user+"&password="+password+"&firstName="+name+"&lastName="+lastName;
    let promise = fetch(registerPerl);
    promise.then(response => response.text())
      .then (data => {
        let xml = (new window.DOMParser()).parseFromString(data,"text/xml");
        console.log("El objeto XML ha sido creado");
        loginResponse(xml);
      }).catch(error => {
        showCreateAccount(); 
      });
  }
}
