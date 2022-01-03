function showLogin(){
  let section = document.getElementById("main");
  let form = `
    <h2>Identificarse:</h2>
    <label for="user">Usuario:</label>
    <input type="text" id="user"><br><br>
    <label for="password">Contraseña:</label>
    <input type="password" id="password"><br><br>
    <button onclick="doLogin()">Ingresar</button>
    <button onclick="showMenuUserLogged()">Vista previa de logeado</button>
  `;
  section.innerHTML = form;
}

function doLogin(){
  let user = document.getElementById('user').value;
  let password = document.getElementById('password').value;

  let loginPerl = './cgi-bin/login.pl?id='+user+'&password='+password;
  let promise = fetch(loginPerl);
  promise.then(response=>response.text())
  .then(data =>{
    let xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    console.log(xml);
    loginResponse(xml);
  }).catch (error => {
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

function showCreateAccount(){
  console.log("Estamos en showCreateAccount");
  let section = document.getElementById("main");
  let form = `
    <h2>Registrarse:</h2>
    <label for="user">Usuario:</label>
    <input type="text" id="user"><br><br>
    <label for="password">Contraseña:</label>
    <input type="password" id="password"><br><br>
    <label for="name">Nombre:</label>
    <input type="text" id="name"><br><br>
    <label for="lastName">Apellido:</label>
    <input type="text" id="lastName"><br><br>
    <button onclick="doCreateAccount()">Registrar</button>
  `;
  section.innerHTML = form;
}

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
