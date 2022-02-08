<template>
  <main class="main-content">
    <section class="banner">
      <div class="banner-shoe-image-div">
        <img src="@/assets/images/banner-shoe.png" alt="Banner shoes" />
      </div>
      <div class="banner-text-div">
        <h1>MIL PARES</h1>
        <h2>
          É uma marca de calçados com alto padrão de qualidade e preço
          acessível
        </h2>
        <router-link to="/produtos">Veja o nosso catálogo</router-link>
      </div>
    </section>

    <section class="exclusive-products-container">
      <h1>Conheça nossa linha de produtos exclusivos</h1>
      <div class="exclusives-products-div">
        <div v-for="categoria in categorias" :key="categoria.categoria" class="products">
          <div>
            <img :src="categoria.imagem" :alt="categoria.nome" />
          </div>
          <div>
            <router-link
              class="button"
              :to="{path: '/produtos', query: {categoria: categoria.categoria}}">
              {{categoria.nome}}
            </router-link>
          </div>
          <div>
            <h2>Veja Agora</h2>
          </div>
        </div>
      </div>
    </section>

    <section class="revendedores-container">
      <h3>Vantagens de ser uma</h3>
      <h1>Revendedora MIL PARES</h1>
      <div>
        <div class="vantagens-revendedora">
          <div class="vantagens-div">
            <div>
              <img
                src="@/assets/images/reven-icon1.png"
                alt="Icone de Vantagens"
              />
              <span>É grátis! Não precisa comprar nenhum kit</span>
            </div>
            <div>
              <img
                src="@/assets/images/reven-icon2.png"
                alt="Icone de Vantagens"
              />
              <span>Mais de 1.000 produtos para lucrar!</span>
            </div>
            <div>
              <img
                src="@/assets/images/reven-icon3.png"
                alt="Icone de Vantagens"
              />
              <span>Trabalhe sem chefe, faça seus horários</span>
            </div>
            <div>
              <img
                src="@/assets/images/reven-icon4.png"
                alt="Icone de Vantagens"
              />
              <span
                >Painel Administrativo para você solicitar os seus
                pedidos</span
              >
            </div>
          </div>
          <div class="revendedora-div">
            <img src="@/assets/images/revendedora.png" alt="Foto revendedora" />
          </div>
        </div>
        <div class="revendedora-button-div">
          <a :href="PAINEL_MILPARES" target="_blank">QUERO SER REVENDEDORA</a>
        </div>
      </div>
    </section>

    <section class="franqueado-container">
      <div class="franqueado-banner">
        <img
          src="@/assets/images/franqueado-banner.png"
          alt="banner seja franquedo"
        />
      </div>
      <div class="franqueado-text">
        <h2>
          Somos uma rede de franquias de calçados feminino, e 100%
          brasiileira! Estamos no mercado de calçados há mais de 20 anos
          fornecendo conforto e qualidade para os nosso clientes.
        </h2>
      </div>

      <div class="franqueado-text">
        <h2>
          Tem interesse em ser franqueado Mil Pares?
          <a :href="PAINEL_MILPARES" target="_blank">Clique aqui</a>
        </h2>
      </div>

      <div class="franqueado-text vantagens-text">
        <h2>Quais as vantagens de ser um franqueado Mil Pares:</h2>
      </div>

      <div class="vantagens">
        <div class="pink-blob"></div>
        <span
          >A Mil Pares Tem todo conhecimento nas vendas de calçados
          femininos.</span
        >
      </div>
      <div class="vantagens">
        <div class="pink-blob"></div>
        <span
          >Oferece suporte operacional e estrutura de capacitação e
          treinamento para franqueados e força de vendas.</span
        >
      </div>
      <div class="vantagens">
        <div class="pink-blob"></div>
        <span>90% de satisfação pela rede de franqueados.</span>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useConstants from '@/composables/useConstants';

export default defineComponent({
  setup() {
    const { PAINEL_MILPARES } = useConstants();
    const categorias = [
      {
        nome: 'Sapatilhas',
        categoria: 'sapatilhas',
        imagem: '/assets/images/shoe1.png',
      },
      {
        nome: 'Mules',
        categoria: 'mules',
        imagem: '/assets/images/shoe2.png',
      },
      {
        nome: 'Sandálias',
        categoria: 'sandalias',
        imagem: '/assets/images/shoe3.png',
      },
    ];

    return {
      categorias,
      PAINEL_MILPARES,
    };
  },
});
</script>

<style scoped>
/* ============ Banner Start ============ */
.banner {
  background-image: linear-gradient(#e1215d, #eb0357);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 4rem 1rem;
  gap: 3vw;
}

.banner-shoe-image-div img {
  width: 95%;
  max-width: 500px;
}

.banner-text-div {
  max-width: 700px;
  flex-grow: 1;
}

.banner-text-div h1 {
  font-size: 5vmax;
  color: #fff;
  font-family: Gotham-Bold;
  font-weight: 100;
}

@media screen and (max-width: 1250px) {
  .banner-text-div {
    text-align: center;
    max-width: 1200px;
    display: grid;
    place-items: center;
  }
}

.banner-text-div h2 {
  /* font-size: clamp(3rem, 1rem + 1vw, 2rem); */
  font-size: 2.7vmax;
  color: #fff;
  letter-spacing: 5px;
  margin: 2.5rem 0;
  font-family: Gotham-Light;
}

.banner-text-div a {
  margin-top: 3rem;
  background-color: #930631;
  color: #f0dfe4;
  border: none;
  border-radius: 5em;
  letter-spacing: 3px;
  padding: 1rem 1.7rem;
  font-size: 1.4rem;
  transition: 0.3s all;
  font-family: Gotham-Black;
}

.banner-text-div a:hover {
  cursor: pointer;
  background-color: #8a062d;
  color: #f0dfe4;
  box-shadow: 0px 0px 10px #000;
}
/* ============ Banner End ============ */

/* ============ Produtos Exclusivos Start ============ */
.exclusive-products-container {
  padding: 5rem 2rem;
}

.exclusive-products-container h1 {
  padding-bottom: 7rem;
  color: #ef2866;
  text-align: center;
  font-family: Gotham-Bold;
  letter-spacing: 0.4vw;
  font-size: 3vmax;
}

.exclusives-products-div {
  display: flex;
  flex-wrap: wrap;
}

.products {
  display: grid;
  place-items: center;
  padding: 1rem;
  flex-grow: 1;
}

.products img {
  width: 100%;
  max-height: 270px;
  margin-bottom: 64px;
}

.products .button {
  margin-top: 4rem;
  background-color: #ef2866;
  color: #f0dfe4;
  border: none;
  border-radius: 5em;
  letter-spacing: 0.4vw;
  padding: 1rem 5rem;
  font-size: 1.6rem;
  transition: 0.3s all;
  font-family: Gotham-Black;
}

.products .button:hover {
  cursor: pointer;
  background-color: #8a062d;
  color: #f0dfe4;
  box-shadow: 0px 0px 10px #000;
}

.products h2 {
  font-family: Gotham-Bold;
  margin-top: 3rem;
  color: #b0b0b0;
  letter-spacing: 0.2vw;
  font-size: 1.6rem;
}
/* ============ Produtos Exclusivos End ============ */

/* ============ Revendedores Start ============ */
.revendedores-container {
  background-image: url("../assets/images/grey-bg.png");
  padding: 3rem 0rem 0rem 3rem;
}

.vantagens-revendedora {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.revendedores-container h3 {
  font-family: Gotham-Bold;
  color: #595959;
  font-size: 2vmax;
}

.revendedores-container h1 {
  font-family: Gotham-Bold;
  color: #ef2967;
  font-size: 3.8vmax;
  letter-spacing: 0.3vw;
  margin-bottom: 4rem;
}

.vantagens-div {
  flex-grow: 0.4;
}

.vantagens-div div {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1vw;
}

.vantagens-div img {
  width: 5em;
}

.vantagens-div span {
  font-family: Gotham-Bold;
  color: #5a5a5a;
  font-size: 1.3rem;
  letter-spacing: 0.1vw;
}

.revendedora-div {
  flex-grow: 1;
  position: relative;
}

.revendedora-div img {
  position: absolute;
  bottom: 0px;
  right: 0;
  width: 100%;
  max-width: 600px;
}

.revendedora-button-div {
  position: relative;
}

.revendedora-button-div a {
  background-color: #ef2866;
  color: #f0dfe4;
  border: none;
  border-radius: 5em;
  letter-spacing: 0.4vw;
  padding: 1rem 5rem;
  font-size: 1.6rem;
  transition: 0.3s all;
  font-family: Gotham-Bold;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translate(-50%);
}

.revendedora-button-div a:hover {
  cursor: pointer;
  background-color: #8a062d;
  color: #f0dfe4;
  box-shadow: 0px 0px 10px #000;
}

/* ============ Revendedores End ============ */

/* ============ Franqueado Start ============ */

.franqueado-container {
  padding-top: 5rem;
}

.franqueado-banner {
  width: 97%;
  display: flex;
  justify-content: center;
  margin: auto;
}

.franqueado-banner img {
  margin-top: 3rem;
  width: 98%;
  max-height: 570px;
}

.franqueado-banner {
  width: 97%;
  display: flex;
  justify-content: center;
  margin: auto;
}

.franqueado-text {
  font-family: Gotham-Bold;
  font-size: 1rem;
  width: 97%;
  margin: auto;
  padding: 5rem 1rem 4rem 1rem;
  color: #b0b0b0;
}

.franqueado-text a,
.vantagens-text {
  color: #3c3c3c;
}

.vantagens {
  display: inline-flex;
  gap: 0.7rem;
  width: 97%;
  margin: auto;
  margin-bottom: 1.5rem;
  padding: 1rem 3rem;
}

.vantagens span {
  font-family: Gotham-Bold;
  font-size: 1.5rem;
  color: #b0b0b0;
}

.pink-blob {
  border-radius: 50em;
  min-width: 17px;
  height: 17px;
  background-color: #f02867;
}

/* ============ Franqueado End ============ */

@media only screen and (max-width: 700px) {
  .banner-text-div {
    max-width: 700px;
    flex-grow: 1;
  }

  .banner-text-div h1 {
    font-size: 6.7vmax;
  }

  .banner-text-div h2 {
    font-size: 3.3vmax;
    letter-spacing: 2px;
    margin-top: 1rem;
  }

  .banner-text-div a {
    margin-top: 2rem;
    border-radius: 10px;
    letter-spacing: 1px;
    padding: 0.5rem 0.7rem;
    font-size: 0.8rem;
  }

  .exclusive-products-container {
    padding: 3rem 1rem;
  }

  .exclusive-products-container h1 {
    padding-bottom: 3rem;
    font-size: 3.3vmax;
  }

  .products {
    padding: 1rem;
  }

  .products img {
    width: 100%;
  }

  .products .button {
    margin-top: 4rem;
    border-radius: 10px;
    padding: 0.8rem 1.2rem;
    font-size: 0.8rem;
  }

  .products h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }

  .revendedores-container {
    background-image: url("../assets/images/grey-bg.png");
    padding: 2.5rem 0rem 0rem 1rem;
  }

  .revendedores-container h3 {
    font-size: 3.3vmax;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .revendedores-container h1 {
    font-size: 3vmax;
    letter-spacing: 0.1vw;
    margin-bottom: 2.5rem;
    text-align: center;
  }

  .vantagens-div {
    flex-grow: 0.4;
  }

  .vantagens-div div {
    gap: 1.5rem;
    margin-bottom: 1vw;
  }

  .vantagens-div img {
    width: 2em;
  }

  .vantagens-div span {
    font-family: Gotham-Bold;
    color: #5a5a5a;
    font-size: 0.7rem;
    letter-spacing: 0.1vw;
  }

  .revendedora-div img {
    display: none;
  }

  .revendedora-button-div a {
    border-radius: 10px;
    letter-spacing: 0vw;
    padding: 0.5rem 0.7rem;
    font-size: 0.7rem;
    bottom: -20px;
  }

  .franqueado-container {
    padding-top: 2rem;
  }

  .franqueado-banner img {
    margin-top: 2rem;
  }

  .franqueado-text {
    font-size: 0.6rem;
    padding: 0.7rem;
  }

  .vantagens {
    gap: 0.3rem;
    margin-bottom: 0.8rem;
    padding: 1rem 1rem;
  }

  .vantagens span {
    font-size: 0.7rem;
  }

  .pink-blob {
    min-width: 10px;
    height: 10px;
  }
}

@media only screen and (max-width: 1300px) {

  .vantagens-div div {
    gap: 1rem;
    margin-bottom: 1vw;
  }

  .revendedora-div img {
    display: none;
  }
}
</style>
