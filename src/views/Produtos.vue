<template>
  <section>
    <transition
      name="sidebar"
      mode="out-in"
    >
      <AppSidebar
        v-if="showFilters"
        v-model:show="showFilters"
      >
        <div class="side-categories">
          <hr />
          <h3>Subcategorias</h3>
          <hr />
          <ul class="categorias">
            <li @click="subcategoriaSelected = ''">
              Todos
            </li>
            <li
              v-for="subcategoria in subcategorias"
              :key="subcategoria.nome"
              :class="[subcategoria.nome == route.query?.subcategoria ? 'active' : '']"
              @click="subcategoriaSelected = subcategoria.nome; showFilters = false"
            >
              {{ subcategoria.nome }}
            </li>
          </ul>
        </div>
      </AppSidebar>
    </transition>

    <transition
      name="sidebar"
      mode="out-in"
    >
      <AppSidebar
        v-if="openNavCategorias"
        v-model:show="openNavCategorias"
      >
        <div class="side-categories">
          <hr />
          <h3>Categorias</h3>
          <hr />
          <ul class="categorias">
            <li
              v-for="categoria in categorias"
              :key="categoria.nome"
              :class="[categoria.nome === route.query?.categoria ? 'active' : '']"
              @click="categoriaSelected = categoria.nome; showFilters = false"
            >
              {{ categoria.nome }}
            </li>
          </ul>
        </div>
      </AppSidebar>
    </transition>

    <div class="openNav-div">
      <button @click="openNavCategorias = true">
        Categorias
        <i class="icofont-simple-right"></i>
      </button>
    </div>
    <main class="main-content">
      <div class="side-categories">
        <hr />
        <h3>Categorias</h3>
        <hr />
        <ul class="categorias">
          <li @click="categoriaSelected = ''; subcategoriaSelected = ''">
            Todos
          </li>
          <li
            v-for="categoria in categorias"
            :key="categoria.nome"
            :class="[categoria.nome === route.query?.categoria ? 'active' : '']"
            @click="categoriaSelected = categoria.nome"
          >
            {{ categoria.nome }}
          </li>
        </ul>
      </div>


      <div
        class="catalogo-div"
      >
        <i
          class="icofont-filter filter-icon"
          @click="showFilters = true"
        >
          <span>Filtros</span>
        </i>

        <Loading v-if="loading" />

        <div
          v-else-if="produtos && produtos.length"
          class="product-card-div"
        >
          <router-link
            v-for="produto in produtos"
            :key="produto.id"
            class="card"
            :to="{name: 'produto', params: {id: produto.id}}"
          >
            <div class="chinelo-div">
              <img
                :src="produto.imagem_principal?.path ?? '/assets/images/default.png'"
                alt=""
              />
            </div>
            <div>
              <h3>{{ produto.nome }}</h3>
              <span>Por Apenas: </span>
              <span>R$ {{ toBRL(produto.preco) }}</span>
            </div>
          </router-link>
        </div>
        <p
          v-else
          style="margin-top: 32px;"
        >
          Nenhum item encontrado...
        </p>
      </div>
    </main>

    <div
      v-if="podePaginar"
      class="see-more-button-div"
    >
      <Loading v-if="loading" />
      <button
        v-else
        @click="paginate.current_page++"
      >
        Ver mais produtos
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import useCurrency from '@/composables/useCurrency';
import { ICategoria } from '@/interfaces/ICategoria';
import { http } from '@/service';
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IProdutoCatalogo } from '@/interfaces/IProduto';
import useSearchParams from '@/composables/useSearchParams';
import { IPaginate } from '@/interfaces/IPaginate';
import usePaginate from '@/composables/usePaginate';
import AppSidebar from '@/components/AppSidebar.vue';

export default defineComponent({
  components: {
    AppSidebar
  },
  setup() {
    const { paginate, podePaginar } = usePaginate();

    const { toBRL } = useCurrency();
    const categoriaSelected = ref('');
    const subcategoriaSelected = ref('');
    const categorias = ref<ICategoria[]>([]);
    const subcategorias = ref<ICategoria[]>([]);
    const produtos = ref<IProdutoCatalogo[]>([]);
    const route = useRoute();
    const router = useRouter();
    const showFilters = ref(false)

    const fetchCategorias = async () => {
      const { data } = await http.get<ICategoria[]>('/categorias');
      categorias.value = data;
    };

    const fetchSubcategorias = async () => {
      const { data } = await http.get<ICategoria[]>('/subcategorias');
      subcategorias.value = data;
    };

    const loading = ref(false);

    const fetchProdutos = async () => {
      loading.value = true;
      const filtro = useSearchParams({
        filtros: {
          categoria: categoriaSelected.value,
          subcategoria: subcategoriaSelected.value,
        },
        page: paginate.value.current_page,
      });
      const { data } = await http.get<{data: IProdutoCatalogo[], meta: IPaginate}>(`/produtos?${filtro}`);
      produtos.value.push(...data.data);
      paginate.value = data?.meta;
      loading.value = false;
    };

    const resetProdutos = () => {
      produtos.value = [];
      fetchProdutos();
    };

    watch(categoriaSelected, (val) => {
      const { query } = route;
      router.push({ query: { ...query, categoria: val } });
      resetProdutos();
    });

    watch(subcategoriaSelected, (val) => {
      const { query } = route;
      router.push({ query: { ...query, subcategoria: val } });
      resetProdutos();
    });

    watch(() => paginate.value.current_page, () => {
      fetchProdutos();
    });

    const openNavCategorias = ref(false)

    onMounted(() => {
      const categoriaQuery = route.query?.categoria;
      categoriaSelected.value = String(categoriaQuery ?? '');
      fetchCategorias();
      fetchSubcategorias();
      fetchProdutos();
    });

    return {
      openNavCategorias,
      loading,
      categoriaSelected,
      subcategoriaSelected,
      categorias,
      subcategorias,
      route,
      toBRL,
      produtos,
      paginate,
      podePaginar,
      showFilters
    };
  },
});
</script>

<style scoped>
/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v8.3.6,
* Autoprefixer: v10.3.1
* Browsers: last 4 version
*/

.header {
  border-bottom: 10px solid #e61655;
}

.main-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  padding: 3rem;
  gap: 3rem;
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
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  margin-bottom: 15px;
  font-weight: 900;
}

.side-categories ul li:hover,
.side-categories ul li.active {
  -webkit-text-decoration: underline 2px;
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
  -webkit-box-shadow: 0px 0px 3px #333;
  box-shadow: 0px 0px 3px #333;
  overflow-x: hidden;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
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
  -webkit-text-decoration: underline 3px solid #e61655;
  text-decoration: underline 3px solid #e61655;
}

.closebtn {
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 999;
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
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 3rem;
}

.openNav-div button {
  border: none;
  letter-spacing: 2px;
  border-top: 1px solid #e61655;
  border-bottom: 1px solid #e61655;
  padding: 0.5rem 3.2rem;
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
  left: 60px;
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
  -webkit-text-decoration: underline 2px #e61655;
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
  right: 0px;
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
  flex-wrap: wrap;
  justify-content: end;
}

.card {
  flex-grow: 1;
  max-width: 280px;
}

.chinelo-div {
  transition: 0.3s all;
  height: 350px;
}

.chinelo-div img {
  border-top: 15px solid #f02866;
  border-bottom: 15px solid #f02866;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.card .see-button {
  padding-top: 2rem;
  /* max-width: 280px; */
}

.card .see-button button {
  background-color: #000000;
  border: none;
  text-transform: uppercase;
  color: #f0f0f0;
  width: 100%;
  border-radius: 20em;
  padding: 1rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
}

.card .see-button button:hover {
  background-color: #111;
  color: #fff;
}

/* ============ Catalogo End ============ */

.see-more-button-div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
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
  -webkit-transition: 0.3s all;
  -o-transition: 0.3s all;
  transition: 0.3s all;
  font-family: Gotham-Black;
}

.see-more-button-div button:hover {
  cursor: pointer;
  background-color: #8a062d;
  color: #f0dfe4;
  -webkit-box-shadow: 0px 0px 10px #000;
  box-shadow: 0px 0px 10px #000;
}

@media screen and (max-width: 1134px) {
  .main-content {
    padding: 3rem 1rem;
    justify-content: center;
  }

  .side-categories {
    display: none;
  }

  .product-card-div {
    gap: 3rem 2rem;
    justify-content: center;
  }

  .chinelo-div img {
    border-top: 10px solid #f02866;
    border-bottom: 10px solid #f02866;
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

  .see-more-button-div button {
    margin-top: 0rem;
    margin-bottom: 3rem;
    letter-spacing: 1px;
    padding: 0.7rem 0.6rem;
    font-size: 1rem;
  }

  .openNav-div {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 1rem;
  }

  .filter-icon {
    font-size: 1rem;
    right: 10px;
  }

  .filter-icon span {
    font-size: 0.8rem;
  }
}

.sidebar-enter-active {
  transition: all .3s
}

.sidebar-leave-active {
  transition: all .5s
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-from {
  transform: translateX(100px);
}

.sidebar-leave-to {
  width: 0;
}
</style>
