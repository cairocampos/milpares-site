<template>
  <main class="main-content">
    <section class="revendedores-container">
      <h3>Cadastre-se e seja uma</h3>
      <h1>Revendedora MIL PARES</h1>
      <div>
        <div class="vantagens-revendedora">
          <div class="vantagens-div">
            <div class="icon-div">
              <img
                src="/assets/images/reven-icon1.png"
                alt="Icone de Vantagens"
              />
              <span>É grátis! Não precisa comprar nenhum kit</span>
            </div>
            <div class="icon-div">
              <img
                src="/assets/images/reven-icon2.png"
                alt="Icone de Vantagens"
              />
              <span>Mais de 1.000 produtos para lucrar!</span>
            </div>
            <div class="icon-div">
              <img
                src="/assets/images/reven-icon3.png"
                alt="Icone de Vantagens"
              />
              <span>Trabalhe sem chefe, faça seus horários</span>
            </div>
            <div class="icon-div">
              <img
                src="/assets/images/reven-icon4.png"
                alt="Icone de Vantagens"
              />
              <span>Painel Administrativo para você solicitar os seus
                pedidos</span>
            </div>

            <div class="free-fast-easy-div">
              <div>
                <img
                  src="/assets/images/menina-pink.png"
                  alt="menina-pink"
                >
              </div>

              <div>
                <p>Cadastre-se Agora</p>
                <p>É GRÁTIS, RÁPIDO E FÁCIL</p>
              </div>
            </div>
          </div>

          <div class="form-div">
            <form action="/">
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  name="nome"
                  placeholder="Nome completo*"
                >
              </div>

              <div class="form-group">
                <label for="Sexo">Sexo</label>
                <input
                  class="form-control"
                  type="radio"
                  name="gender"
                >
                <span>Masculino</span>
                <input
                  class="form-control"
                  type="radio"
                  name="gender"
                >
                <span>Feminino</span>
              </div>

              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  name="cpf"
                  placeholder="CPF"
                >
              </div>

              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  name="cep"
                  placeholder="CEP*"
                >
              </div>

              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  name="endereco"
                  placeholder="Endereço"
                >
              </div>

              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  name="number"
                  placeholder="Número"
                >
                <input
                  class="form-control"
                  type="text"
                  name="complemento"
                  placeholder="Complemento"
                >
              </div>

              <div class="form-group">
                <select
                  id="unidade"
                  name="unidade"
                >
                  <option value="Estado">
                    Unidade mais próxima*
                  </option>
                  <option value="Unidade A">
                    Unidade A
                  </option>
                  <option value="Unidade B">
                    Unidade B
                  </option>
                  <option value="Unidade C">
                    Unidade C
                  </option>
                </select>
              </div>

              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  name="estado"
                  placeholder="Estado"
                >
              </div>

              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                >
              </div>

              <div class="form-group">
                <input
                  class="form-control"
                  type="number"
                  name="celular"
                  placeholder="Celular*"
                >
              </div>

              <div class="form-group">
                <input
                  class="form-control"
                  type="email"
                  name="email"
                  placeholder="E-mail*"
                >
              </div>

              <div class="button-group">
                <button
                  class="button-control"
                  type="submit"
                >
                  CADASTRAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    //
  },
})
</script>

<style scoped>
.header {
  border-bottom: 10px solid #e61655;
}

.top-nav-info {
  padding: 1.5rem 3rem;
  font-family: Gotham-Book;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  white-space: nowrap;
}

.top-nav-info span {
  font-weight: 900;
  padding: 0 0.8rem;
  color: #ababab;
}

.top-nav-info hr {
  font-weight: 900;
  color: #ababab;
  margin-top: 0.2rem;
  height: 15px;
}

.revendedores-container {
  padding: 3.5rem;
}

.revendedores-container h3 {
  color: #504f43;
  font-family: Gotham-Light;
  font-size: 2rem;
  letter-spacing: 3px;
}

.revendedores-container h1 {
  color: #ef2866;
  font-family: Gotham-Light;
  font-size: 3rem;
  padding: 0 0.3rem;
  letter-spacing: 4px;
}

.vantagens-revendedora {
  display: flex;
  gap: 2rem;
  padding: 5rem 0.8rem;
}

.vantagens-revendedora .vantagens-div {
  flex-grow: 1;
}

.vantagens-revendedora .vantagens-div .icon-div {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: #504f43;
  margin-bottom: 1rem;
}

.vantagens-revendedora .vantagens-div div span {
  font-family: Gotham-Bold;
  font-size: 1.3rem;
}

.free-fast-easy-div {
  gap: 0.5rem;
  display: flex;
  align-items: center;
  padding-top: 2rem;
}

.free-fast-easy-div p:nth-of-type(1) {
  color: #504f43;
  font-family: Gotham-Bold;
  font-size: 1.2rem;
  letter-spacing: 3px;
}

.free-fast-easy-div p:nth-of-type(2) {
  color: #ef2866;
  font-family: Gotham-Bold;
  font-size: 2.2rem;
  padding: 0 0.3rem;
  letter-spacing: 5px;
  margin-top: 0.8rem;
}

.form-div {
  color: #504f43;
  font-family: Gotham-Book;
  min-width: none;
}

.form-div {
  flex-grow: 1;
}

.form-div form {
  flex-grow: 1;
}

.form-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.form-group span {
  position: relative;
  right: 0.5rem;
}

.form-group:nth-of-type(1) {
  margin-bottom: 0.8rem;
}

.form-group:nth-of-type(2) {
  margin-bottom: 0.8rem;
  padding: 0 1rem;
}

.form-group:nth-of-type(2) label {
  margin-right: 1.5rem;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="email"],
.form-group select {
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #999;
  font-size: 1.1rem;
  flex-grow: 1;
}

.form-group select {
  color: #555;
}

.form-group input[type="text"]:focus,
.form-group input[type="number"]:focus,
.form-group input[type="email"]:focus,
.form-group select:focus {
  outline: 2px solid #222;
}

.form-group:nth-of-type(6) input:nth-of-type(1) {
  max-width: 30%;
}

.button-group .button-control {
  color: #fff;
  background-color: #ef2866;
  font-family: Gotham-Bold;
  letter-spacing: 0.5vw;
  border: 1px solid;
  height: 60px;
  width: 100%;
  border-radius: 10em;
  font-size: 1.5rem;
  transition: 0.3s;
}

.button-group .button-control:hover {
  background-color: #ee346f;
  cursor: pointer;
}

@media only screen and (max-width: 1237px) {
  .form-group:nth-of-type(6) input:nth-of-type(1) {
    max-width: 800px;
  }
}

@media only screen and (max-width: 1200px) {
  .top-nav-info {
    padding: 1rem;
  }
  .revendedores-container {
    padding: 1rem;
  }
}

@media only screen and (max-width: 1013px) {
  .vantagens-revendedora {
    flex-wrap: wrap;
  }
}

@media only screen and (max-width: 575px) {
  .revendedores-container h3 {
    font-size: 1rem;
    letter-spacing: 1px;
  }
  
  .revendedores-container h1 {
    font-size: 1.4rem;
    padding: 0;
    letter-spacing: 1px;
  }
  
  .vantagens-revendedora {
    padding: 1.5rem 0rem;
  }
  
  .vantagens-revendedora .vantagens-div .icon-div {
    gap: .6rem;
  }

  .vantagens-revendedora .vantagens-div .icon-div img {
    max-width: 40px;
  }
  
  .vantagens-revendedora .vantagens-div div span {
    font-size: .8rem;
  }
  
  .free-fast-easy-div {
    padding-top: 1rem;
  }

  .free-fast-easy-div img {
    padding-top: 5rem;
    max-width: 100px;
  }
  
  .free-fast-easy-div p:nth-of-type(1) {
    font-size: 1rem;
    letter-spacing: 1px;
  }
  
  .free-fast-easy-div p:nth-of-type(2) {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group span {
    position: relative;
    right: 0.8rem;
  }
  
  .form-group:nth-of-type(1) {
    margin-bottom: 0.8rem;
  }
  
  .form-group:nth-of-type(2) {
    margin-bottom: 0.8rem;
    padding: 0rem;
  }
  
  .form-group:nth-of-type(2) label {
    margin-right: 0rem;
  }
  
  .form-group input[type="text"],
  .form-group input[type="number"],
  .form-group input[type="email"],
  .form-group select {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
  
  .button-group .button-control {
    height: 40px;
    width: 100%;
    font-size: 1rem;
  }
}


@media only screen and (max-width: 480px) {
  .top-nav-info {
    padding: 0.5rem 0rem;
    font-size: 0.6rem;
  }

  .top-nav-info span {
    padding: 0 0.5rem;
  }

  .top-nav-info hr {
    margin-top: 0.2rem;
    height: 10px;
  }

  .revendedores-container {
    padding: 0.5rem 0.5rem;
  }
}
</style>
