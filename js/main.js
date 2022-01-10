var userFullName = 'Gustavo Ordoño';
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
  let articles = "";
  let header = `
    <div>
      <div id="name"><p id="rightElement" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" onclick="displayProfile()" class="rightAlign btn">`+userFullName+`</p></div>
      <p id="rightElement" class="btn">
        Inbox
        <span class="mt-4 position-absolute translate-middle badge rounded-pill bg-danger">
        99+
        <span class="visually-hidden">unread messages</span>
        </span>
      </p>
      <div>
      <img id='logo' src='img/T.png'>
      <p id="leftElement">TuToEasy</p>
    <div>
   `;
  for(var i=0;i<50;i++){
    articles +=
    `
    <div class="card ml-4 h-100 w-100 p-4 mb-5">
      <div class="card-body">
        <div>

        <a class="card-title h5 text-decoration-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" onclick="displayProfile()">Gustavo Ordoño</a>

        </div>
        <p class="card-text">Hoy me siento muy extraño, jaja literalmente llevo 5 días seguidos comiendo tamales,
        nose, no estoy en contra de los tamales, pero me siento un poco aburrido, me gustaría un poco de cereal.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
      <img id="articleImages" src="https://i.imgflip.com/5rle5q.jpg" class="card-img-bottom mx-auto shadow">
    </div>   
    `;
  }
  let main = `
  <div class="container mw-100 p-0">
    <div class="d-flex h-100">
      <div class="h-100" id="leftNavigationItems" style="width: 50px">

        <div class="d-flex w-100 h-100 flex-wrap">

          <div class="border w-100"><button class="btn w-100 h-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" onclick="displayProfile()">
          <i class="bi bi-person-circle"></i></button></div>
          <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Tu perfil</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body w-100 mw-100 h-100 mh-100" id="profile">
            </div>
          </div>

          <div class="border w-100"><button class="btn w-100 h-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" onclick="displayFriends()">
          <i class="bi bi-people-fill"></i></button></div>
          <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Amigos</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
          </div>
          
          <div class="border w-100"><button class="btn w-100 h-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" onclick="displayProgress()">
          <i class="bi bi-trophy-fill"></i></button></div>
        </div>

      </div>
      <div class="overflow-auto p-5 w-100" style="height: auto;">
        <div id="articles">
  `
  +articles+
  `
      </div>
    </div>
  </div>
   `;
  headerSection.innerHTML = header;
  mainSection.innerHTML = main;
}

function displayProfile(){
  let section = document.getElementById("profile");
  section.innerHTML = "";
  let html = `
<section class="w-100 mw-100 h-100 mh-100" style="background-color: #eee;border-radius: 15px;">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-12 col-xl-4 w-100">
        <div class="card mw-100 p-2" style="border-radius: 15px;">
          <div class="card-body text-center w-100">
            <div class="mt-3 mb-4">
              <img
                src="https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59a697445bafe8f6f6b3d6dc/hamster-sirio_0.jpg"
                class="rounded-circle img-fluid" style="width: 100px;height: 100px;"/>
            </div>
            <h4 class="mb-2">Gustavo Ordoño Poma</h4>
            <p class="text-muted mb-4">@Programmer</p>
            <div class="mb-4 pb-2">
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="bi bi-facebook"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="bi bi-youtube"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="bi bi-google"></i>
              </button>
            </div>
            <button type="button" class="btn btn-primary btn-rounded btn-lg mb-2">
              Progress
            </button>
            <div class="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <p class="mb-2 h5">51</p>
                <p class="text-muted mb-0">Projects</p>
              </div>
              <div class="px-3">
                <p class="mb-2 h5">45</p>
                <p class="text-muted mb-0">Friends</p>
              </div>
              <div>
                <p class="mb-2 h5">1</p>
                <p class="text-muted mb-0">Rank</p>
              </div>
            </div>
            <div>
              <p class="mt-3">
              Hello my dear friends, I'm Gustavo! I would like to make lots of friends. Like u!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
</section>
  `;
  section.innerHTML = html;

  let name = document.getElementById("name");
  name.innerHTML = `<p id="rightElement" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" class="rightAlign btn">`+userFullName+`</p>`;
}

function displayFriends(){
  let section = document.getElementById("profile");
  section.innerHTML = "";

  let friendList = "";
  for(var i=0;i<15;i++){
    friendList += `<li class="list-group-item d-flex align-items-center"><img src="https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59a697445bafe8f6f6b3d6dc/hamster-sirio_0.jpg" class="rounded-circle img-fluid" style="width: 50px;height: 50px;"/><a href="#" class="list-group-item list-group-item-action ms-3">Gustavo Ordoño</a>
    </li>`;
  }

  let html = `
<ul class="list-group">
`+friendList+`
</ul>
  `;
  section.innerHTML = html;
}

function displayProgress(){
  let section = document.getElementById("articles");
  section.innerHTML = "";
  let html = `
<div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
</div>
<button onclick="showMenuUserLogged()">Return</button>

  `;
  section.innerHTML = html;
}