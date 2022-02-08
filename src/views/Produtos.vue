<template>
  <section>
    <main class="main-content">
      <div class="side-categories">
        <hr />
        <h3>Categorias</h3>
        <hr />
        <ul class="categorias">
          <li
            v-for="categoria in categorias"
            :key="categoria.nome"
            @click="categoriaSelected = categoria.nome"
            :class="{active: categoriaSelected == route.query?.categoria}"
            >
            {{categoria.nome}}
          </li>
        </ul>
      </div>

      <div class="catalogo-div">
        <i class="icofont-filter filter-icon" onclick="openFilterMenu()">
          <span>Filtros</span>
        </i>
        <div class="product-card-div">
          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="see-more-button-div">
      <button>Ver mais produtos</button>
    </div>
  </section>
</template>

<script lang="ts">
import { ICategoria } from '@/interfaces/ICategoria';
import { IProduto } from '@/interfaces/IProduto';
import { http } from '@/service';
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const categoriaSelected = ref('');
    const categorias = ref<ICategoria[]>([]);
    const produtos = ref<IProduto[]>([]);
    const route = useRoute();
    const router = useRouter();

    const fetchCategorias = async () => {
      const { data } = await http.get<ICategoria[]>('/categorias-produtos');
      categorias.value = data;
    };

    const fetchProdutos = async () => {
      const { data } = await http.get<{data: IProduto[]}>('/produtos/catalogo', {
        params: {
          categoria: categoriaSelected.value,
        },
      });
      produtos.value = data.data;
    };

    watch(categoriaSelected, (val) => {
      const { query } = route;
      router.push({ query: { ...query, categoria: val } });
      fetchProdutos();
    });

    onMounted(() => {
      const categoriaQuery = route.query?.categoria;
      categoriaSelected.value = String(categoriaQuery ?? '');
      fetchCategorias();
      fetchProdutos();
    });

    return {
      categoriaSelected,
      categorias,
      route,
    };
  },
});
</script>

<style scoped>
.header {
  border-bottom: 10px solid #e61655;
}

.main-content {
  display: flex;
  padding: 3rem;
}

.side-categories {
  padding: 0 1rem;
}

.side-categories hr {
  background-color: #f02866;
  border: 0;
  width: 180px;
  height: 1px;
}

.side-categories h3 {
  padding: 0.8rem 0;
  padding-left: 0.7rem;
  font-weight: 900;
  color: #f02866;
  font-family: Gotham-Light-Italic;
}

.side-categories ul {
  font-family: Gotham-Book;
  padding: 1rem;
}

.side-categories ul li {
  transition: 0.3s;
  margin-bottom: 15px;
  font-weight: 900;
}

.categorias li.active {
  text-decoration: underline 2px;
  color: #ef2765;
}

.side-categories ul li:hover {
  text-decoration: underline 2px;
  color: #ef2765;
  cursor: pointer;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px 0px 3px #333;
  overflow-x: hidden;
  transition: 0.3s;
}

.flter {
  right: 0;
  left: auto;
}

.flter h2 {
  text-align: start;
  padding: 0 2rem;
}

.sidenav ul {
  padding: 3rem;
}

.sidenav ul li {
  margin-bottom: 1rem;
  font-family: Gotham-Light;
  font-weight: 900;
}

.sidenav ul li:hover {
  color: #e61655;
  text-decoration: underline 3px solid #e61655;
}

.closebtn {
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  position: absolute;
  top: 0;
  right: 10px;
}

.side-nav-bg {
  background-color: #333;
  top: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.5;
  position: fixed;
  display: none;
}

.pink-side-nav-banner {
  background-color: #e61655;
  color: #fff;
  font-family: Gotham-Light-Italic;
  text-align: center;
  padding: 1rem 0;
  position: relative;
}

.pink-side-nav-banner span {
  cursor: pointer;
  font-size: 2.3rem;
  position: absolute;
  top: 6px;
  right: 20px;
}

.openNav-div {
  display: none;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
}

.openNav-div button {
  border: none;
  letter-spacing: 2px;
  border-top: 1px solid #e61655;
  border-bottom: 1px solid #e61655;
  padding: 0.5rem 1.4rem;
  font-size: 1.4rem;
  color: #e61655;
  background-color: #fff;
  font-family: Gotham-Medium-Italic;
}

.openNav-div button i {
  font-weight: 900;
  color: rgb(0, 0, 0);
  font-size: 2rem;
  float: right;
  position: relative;
  left: 35px;
}

/* ============ Side-Menu Start ============ */
.side-nav-div {
  font-family: Gotham-Bold;
}

.side-nav-div h3 {
  font-family: Gotham-Book-Italic;
  color: #e61655;
  padding: 1rem 4rem 1rem 1rem;
}

.side-nav-div hr {
  border: 1px solid #e61655;
}

.side-nav-div li {
  margin: 1.5rem 2rem;
  color: #202020;
}

.side-nav-div li:hover,
.fixed-side-nav ul li:hover {
  text-decoration: underline 2px #e61655;
  color: #e61655;
  cursor: pointer;
}
/* ============ Side-Menu End ============ */

/* ============ Catalogo Start ============ */
.catalogo-div {
  font-family: Gotham-Book;
  position: relative;
}

.filter-icon {
  cursor: pointer;
  color: #666;
  position: absolute;
  right: 74px;
  top: -25px;
  font-size: 1.2rem;
  font-family: Gotham-Book;
}

.filter-icon span {
  color: #111;
  font-size: 1rem;
  font-family: Gotham-Book;
  font-weight: 900;
}

.product-card-div {
  gap: 7rem 5vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.chinelo-div {
  border-top: 15px solid #f02866;
  border-bottom: 15px solid #f02866;
  transition: 0.3s all;
  border-radius: 1px;
}

.chinelo-div img {
  width: 100%;
}

.chinelo-div:hover {
  box-shadow: 0px 0px 10px #666;
}

.card {
  flex-grow: 1;
  max-width: 280px;
}

.card h3 {
  padding: 1rem 0rem;
  color: #202020;
}

.card div span:nth-of-type(1) {
  padding: 1rem 0rem;
  font-family: Gotham-Bold;
  color: #a5a5a5;
}

.card div span:nth-of-type(2) {
  padding: 1rem 0rem;
  font-family: Gotham-Bold;
  color: #ef2765;
  font-size: 1.5rem;
}

.circle-div {
  padding-top: 1.5rem;
  display: flex;
  gap: 1rem;
  cursor: pointer;
}

.circle-div div {
  border-radius: 50px;
  min-width: 25px;
  min-height: 25px;
  border: 0.1px solid #d3d3d3;
}

.circle-div div:nth-of-type(1) {
  background-color: #211c20;
}

.circle-div div:nth-of-type(2) {
  background-color: #edece8;
}
/* ============ Catalogo End ============ */

.see-more-button-div {
  display: flex;
  justify-content: center;
}

.see-more-button-div button {
  margin-top: 3rem;
  margin-bottom: 10rem;
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

.see-more-button-div button:hover {
  cursor: pointer;
  background-color: #8a062d;
  color: #f0dfe4;
  box-shadow: 0px 0px 10px #000;
}

@media screen and (max-width: 1134px) {
  .side-categories {
    display: none;
  }

  .side-nav-div {
    display: none;
  }

  .product-card-div {
    gap: 5rem 2rem;
  }

  .chinelo-div {
    border-top: 10px solid #f02866;
    border-bottom: 10px solid #f02866;
  }

  .card {
    max-width: 220px;
  }

  .card h3 {
    padding: 0.5rem 0rem;
    font-size: 1rem;
  }

  .card div span:nth-of-type(1) {
    padding: 0.5rem 0rem;
    font-size: 0.8rem;
  }

  .card div span:nth-of-type(2) {
    padding: 0.5rem 0rem;
    font-size: 1rem;
  }

  .circle-div {
    padding-top: 1rem;
    gap: 0.5rem;
  }

  .circle-div div {
    min-width: 18px;
    min-height: 18px;
  }

  .see-more-button-div button {
    margin-top: 0rem;
    margin-bottom: 3rem;
    letter-spacing: 1px;
    padding: 0.7rem 0.6rem;
    font-size: 1rem;
  }

  .openNav-div {
    display: flex;
    padding-top: 1rem;
  }

  .filter-icon {
    font-size: 1rem;
    right: 0;
  }

  .filter-icon span {
    font-size: 0.8rem;
  }
}
</style>
