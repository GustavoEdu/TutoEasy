var userFullName = 'Anonimo';
var userKey = '';

function showWelcome(){
  let section = document.getElementById("main");
  let html = `
  <h1>¡Bienvenido a TuToEasy!</h1>
  <code>Esta página fue creada por Gustavo y César</code><br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  `;
  section.innerHTML = html;
}

function showMenuUserLogged(){
  // AQUI SE TRABAJA LA SECCION DE ARTÍCULOS Y USUARIOS
  let headerSection = document.getElementById("menu");
  let mainSection = document.getElementById("main");
  let header = `
    <div>
      <p id="rightElement" onclick='viewProfile()' class='rightAlign'>`+userFullName+`</p>
      <img id='logo' src='img/T.png'>
      <p id="leftElement">TuToEasy</p>
    <div>
   `;
  

  let main = `
    <div id="mainInterface">
      <nav>
        <table>       
          <tr><td><a href="#">Gustavo Ordoño</a></td></tr>
          <tr><td><a href="#">César Alejandro</a></td></tr>
          <tr><td><a href="#">Ronald Rodriguez</a></td></tr>
        </table>
      </nav>
      <article>
        <h1>Gustavo Ordoño</h1>
        <p>El día de ayer le di de comer a mi mascota, le dí un poco de zanahorias, y al parecer no le gustaron. xd</p>
        <p>De hecho el día siguiente le daré un par de beterragas, mi mascota no es vegana</p>
      </article>
    <div>
   `;
  headerSection.innerHTML = header;
  mainSection.innerHTML = main;

}