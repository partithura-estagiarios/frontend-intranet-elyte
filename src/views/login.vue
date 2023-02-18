<template>
  <div class="main-login bg">
      <div class="left-login">
        <!-- <h1>Bem-vindos a<br>Intranet Elyte</h1> -->
        <!-- <div class=""><a href="https://storyset.com/people">People illustrations by Storyset</a></div> -->
        <!-- <img src="astronaut-animate.svg" class="left-login-image" alt="Astronauta Animação"> -->
        <img src="/images/login/animacao.svg" class="left-login-image" alt="Astronauta Animação">
        <!-- <div class="image-ilustra">by Storyset image</div> -->
       
      </div> 
      <div class="right-login">
        <div class="card-login">
          <img src="/images/login/icon.png" class="left-login-icon" alt="Icon Elyte">
          <h2>Intranet Elyte</h2><br><br><br>
          <h1>Faça seu login!</h1>
          <div class="textfield">
            <label for="usuario"></label>
            <input type="text" name="usuario" placeholder="Informe seu e-mail">
          </div>
          <div class="textfield">
            <label for="senha"></label>
            <input type="password" name="senha" placeholder="Informe sua senha">
            <div class="forgot">
              <a href="" class="forgot-color">Esqueci a senha</a></div>
          </div>
          <button class="btn-login">Entrar</button>
          
        </div>
      </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family= Noto +Sans & display=swap');
@import url('https://fonts.googleapis.com/css2?family= família= Noto+Sans:wght@400;600;800 & display=swap');

body {
  margin: 0;
  font-family: 'Noto Sans', sans-serif;
}

body * {
  box-sizing: border-box;
  
}

.bg {
  background-image: url('/images/login/bg.png');
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
}

.image-ilustra {
  color: #3f3f3f;
}

.main-login {
  width: 100vw;
  height: 100vh;
  /* background: #202028;  */
  /* background-image: linear-gradient(to right, #18181a, #292936); */
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-login {
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Título da página*/
/* .left-login > h1 {
  font-size: 3vw;
  color: #ffffff; 
} */

.left-login-image {
  width: 35vw;
}

/* Tamanho do icon */
.left-login-icon {
  width: 3vw;
  padding-bottom: 10px;
}

.right-login {
  width: 50vw;
  width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-login {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 80px; /* comprimento dos input */
  /* background: #e5132b; */
  /* border-radius: 20px; */
  /* box-shadow: 0px 10px 40px #00000056; */
}

/* Título acima do card */
.card-login > h2 {
  color: #ffffff;
  font-weight: 800;
  margin: 0;
}

/* Título do card */
.card-login > h1 {
  color: #ffffff;
  font-weight: 800;
  margin: 0;
  padding-bottom: 10px;
}

.textfield {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0px;
  
}

.textfield > input {
  width: 100%;
  border: none;
  border-radius: 100px;
  padding: 15px;
  background: #e5132b;
  color: #ffffffde;
  font-size: 12pt;
  box-shadow: 0px 10px 40px #00000056;
  outline: none;
  box-sizing: border-box;
}

.textfield > label {
  color: #ffff;
  margin-bottom: 10px;
}

/* Cor texto inputs */
.textfield > input::placeholder {
  color: #ffffffde;
}

/* Tamanho texto esqueci senha */
.forgot {
  margin-top: 1rem; 
}


/* Cor texto esqueci senha */
.forgot > a {
  color: #868686;
  text-decoration: none;
}

/* Cor texto esqueci senha passar mouse */
.forgot > a:hover {
  color: #ffffff;
  text-decoration: none;
}

/* Styles do btn entrar */
.btn-login {
  width: 100%;
  padding: 16px 0px;
  margin: 25px;
  border: none;
  border-radius: 100px;
  outline: none;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 3px;
  color: #2b134b;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0px 10px 40px -12px #ffffff;
}

.btn-login:hover {
  color: #e5132b;
  background: #ffffff;
  box-shadow: 0px 10px 40px -12px #ff0000;
}

@media only screen and (max-width: 950px) {
  .car-login {
    width: 100%;
  }
}

@media only screen and (max-width: 600px) {
  .main-login {
    flex-direction: column;
  }
    .left-login > h1 {
      display: none;
    }

    .left-login {
      width: 100%;
      height: auto;
    }

    .right-login {
      width: 100%;
      height: auto;
    }

    .left-login-image {
      width: 60vw;
    }
    
    .card-login {
      width: 90%;
    }
    
}

</style>