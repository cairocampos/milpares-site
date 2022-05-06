<template>
  <section>
    <Loading v-if="loading" />
    <main v-else-if="produto && Object.values(produto).length">
      <div class="top-nav-info">
        <Breadcrumbs :product="produto.nome" />
      </div>
      <section class="products-display-section">
        <div
          v-if="produto?.imagens?.length > 1"
          class="scroll"
        >
          <span
            id="upArrow"
            :style="arrowsStyle.up"
            class="arrow up"
            @click="scrollPics(-100)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#F02867"
              style="width:32px;"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </span>

          <div
            ref="scrollAble"
            class="pictures-options"
            @scroll="checkScroll($event)"
          >
            <img
              v-for="imagem in produto.imagens"
              :key="imagem.path"
              :src="imagem.path"
              @click="imagemPrincipal = imagem.path"
            />
          </div>

          <span
            id="downArrow"

            :style="arrowsStyle.down"
            class="arrow down"
            @click="scrollPics(100)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#F02867"
              style="width:32px;"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>

        <div class="products-image-div">
          <img :src="imagemPrincipal" />
        </div>

        <div class="slideshow-container">
          <Carousel
            :items-to-show="1.5"
            :autoplay="2000"
          >
            <Slide
              v-for="slide in produto.imagens"
              :key="slide"
            >
              <!-- <div> -->
              <img
                :key="slide.id"
                :src="slide.path"
              />
              <!-- </div> -->
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>

        <br />

        <div class="price-details">
          <div class="product-name-div">
            <h2>{{ produto.nome }}</h2>
            <h6>Código: {{ produto.codigo }}</h6>
          </div>

          <div class="price-info">
            <h6>Por Apenas:</h6>
            <h1>
              <span>R$</span>
              <span>{{ toBRL(hasAuthorized ? produto.preco_clube_desconto : produto.preco) }}</span>
            </h1>
          </div>

          <div class="colors-info">
            <h6>Cores</h6>
            <div class="circle-div colors">
              <form action="#">
                <label
                  v-for="cor in cores"
                  :key="cor.id"
                >
                  <input
                    v-model="form.cor_id"
                    :style="`background-color:${cor.hexadecimal}`"
                    type="radio"
                    :name="cor.nome"
                    :value="cor.id"
                  />
                </label>
              </form>
            </div>
          </div>

          <Loading v-if="loadingEstoque" />
          <div
            v-else-if="estoque && estoque.length"
            class="sizes-div"
          >
            <h6>Tamanhos</h6>
            <div
              class="sizes"
            >
              <label
                v-for="grade in estoque"
                :key="grade.tamanho"
              >
                <input
                  v-model="form.tamanho"
                  type="radio"
                  name="tamanho"
                  :value="grade.tamanho"
                />
                <span>{{ grade.tamanho }}</span>
              </label>
            </div>
          </div>

          <div class="add-to-cart">
            <button @click="addCart">
              Adicionar no carrinho
            </button>
          </div>
        </div>
      </section>

      <section class="description-section">
        <h3>Descrição</h3>
        <p>{{ produto.descricao }}</p>
        <hr />
      </section>
      <ProdutosRelacionados
        :id="45"
      />
    </main>
    <div
      v-else
      class="wrapper__not-found"
    >
      <ProdutoNaoEncontrado />
      <p>O Produto que procura foi removido ou está indisponível.</p>
      <router-link to="/produtos">
        Voltar
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import useAlert from '@/composables/useAlert';
import useCurrency from '@/composables/useCurrency';
import { IProdutoClubeDesconto } from '@/interfaces/IProduto';
import { http } from '@/service';
import store from '@/store';
import {
  computed, defineComponent, onMounted, ref, watch,
} from 'vue';
import { useRouter } from 'vue-router';

import Breadcrumbs from '@/components/Breadcrumbs.vue';

// carousel
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import ProdutosRelacionados from '../components/ProdutosRelacionados.vue';
import {ICor} from "@/interfaces/ICor"
import {IGrade} from "@/interfaces/IGrade"
import ProdutoNaoEncontrado from '@/components/ProdutoNaoEncontrado.vue';

export default defineComponent({
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Breadcrumbs,
    ProdutosRelacionados,
    ProdutoNaoEncontrado
},
  props: {
    id: Number,
  },
  setup(props) {
    const router = useRouter();
    const { alerts } = useAlert();
    const loading = ref(false);
    const form = ref({
      cor_id: 0,
      tamanho: 0,
    });

    const produto = ref<IProdutoClubeDesconto>();
    const cores = ref<ICor[]>([])
    const estoque = ref<IGrade[]>([])
    const imagemPrincipal = ref('')

    const tamanhos = computed(() => {
      let tamanhoItens: string[] = [];
      if (produto.value && Object.keys(produto.value).length) {
        tamanhoItens = produto.value?.grades?.map((item) => item.tamanho) ?? [];
      }

      return new Set([...tamanhoItens].sort());
    });

    const { toBRL } = useCurrency();

    const fetchProduto = async () => {
      try {
        loading.value = true;
        const { data } = await http.get(`/produtos/${props.id}`);
        produto.value = data;
        imagemPrincipal.value = produto.value?.imagem_principal?.path ?? '/assets/images/default.png'
      } finally {
        loading.value = false;
      }
    };

    const fetchCores = async () => {
      try {
        loading.value = true;
        const { data } = await http.get<ICor[]>(`/produtos/${props.id}/cores`);
        cores.value = data
      } finally {
        loading.value = false;
      }
    };

    const loadingEstoque = ref(false)
    const fetchEstoqueDisponivel = async () => {
      try {
        loadingEstoque.value = true;
        const { data } = await http.get<IGrade[]>(`/produtos/${props.id}/estoque`, {
          params: {
            cor_id: form.value.cor_id
          }
        });
        estoque.value = data
      } finally {
        loadingEstoque.value = false;
      }
    };

    watch(() => form.value.cor_id, () => {
      form.value.tamanho = 0;
      fetchEstoqueDisponivel();
    })

    const validate = () => {
      if (form.value.cor_id === 0) {
        alerts.info('você precisa selecionar uma cor!');
        return false;
      }

      if (form.value.tamanho === 0) {
        alerts.info('você precisa selecionar um tamanho!');
        return false;
      }

      return true;
    };

    const addCart = async () => {
      if (validate()) {
        store.commit('UPDATE_CARRINHO', {
          id: produto.value?.id,
          cor_id: form.value.cor_id,
          tamanho: form.value.tamanho,
          quantidade: 1
        });

        router.push('/carrinho');
      }
    };

    const scrollAble = ref<HTMLElement>();
    const scrollPics = (x:number) => {
      scrollAble.value?.scrollBy({
        top: x,
        left: 0,
        behavior: "smooth",
      });
    }

    const arrowsStyle = ref({
      up: {opacity: '1'},
      down: {opacity: '1'}
    })
    const checkScroll = (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.scrollTop === 0) {
        arrowsStyle.value.up = {opacity: "0.4"};
      } else {
        arrowsStyle.value.up = {opacity: "1"};
      }

      if (
        target.scrollHeight - target.scrollTop ===
        target.clientHeight
      ) {
        arrowsStyle.value.down = {opacity: "0.4"};
      } else {
        arrowsStyle.value.down = {opacity: "1"};
      }
    }

    const hasAuthorized = ref(false);
    const checkAuthorization = () => {
      const auth = localStorage.getItem('milpares_authorization')
      hasAuthorized.value = auth ? true : false;
    }

    onMounted(() => {
      fetchProduto();
      fetchCores();
      checkAuthorization()
    });
    

    return {
      hasAuthorized,
      arrowsStyle,
      checkScroll,
      scrollAble,
      scrollPics,
      form,
      produto,
      toBRL,
      tamanhos,
      loading,
      addCart,
      imagemPrincipal,
      cores,
      estoque,
      loadingEstoque
    };
  },
});
</script>

<style scoped>
.header {
  border-bottom: 10px solid #e61655;
}

/* ============ Top-Nav-Menu Start ============ */
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
  border: none;
  width: 3px;
  background-color: #ababab;
  font-weight: 900;
  color: #ababab;
  margin-top: 0.2rem;
  height: 15px;
}
/* ============ Top-Nav-Menu End ============ */

/* ============ Product Display End ============ */
.products-display-section {
  display: flex;
  gap: 2.5rem;
  font-family: Gotham-Light;
  padding: 3rem 3.5rem;
}

.pictures-options {
  display: -ms-inline-grid;
  max-width: 100px;
  max-height: 480px;
  overflow-y: scroll;
  position: relative;
}

.pictures-options img {
  width: 100%;
  height: 100px;
  min-width: 58px;
  object-fit: cover;
}

.scroll .arrow i {
  font-size: 2rem;
  cursor: pointer;
  color: #868686;
}

.scroll .arrow {
  width: 200px;
  position: relative;
}

.scroll .arrow i {
  font-size: 2rem;
  cursor: pointer;
  color: #868686;
}

.scroll {
  text-align: center;
  max-width: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.pictures-options::-webkit-scrollbar {
  width: 0px;
}

.products-image-div {
  flex-grow: 1;
  width: 100%;
  min-width: 450px;
  max-width: 500px;
  max-height: 550px;
}

.products-image-div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.price-details {
  color: #868686;
  flex-grow: 1;
  display: grid;
  grid-gap: 1rem;
  max-width: 700px;
}

.product-name-div h2 {
  font-size: 2rem;
  font-family: Gotham-Bold;
  letter-spacing: 3px;
}

.sizes-div h6 {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.product-name-div h6 {
  margin-top: 0.5rem;
  font-size: 1rem;
  font-family: Gotham-Book;
  letter-spacing: 1px;
}

.price-info h6 {
  font-size: 1rem;
  margin-bottom: 0.7rem;
}

.price-info h1 {
  font-family: Gotham-Bold;
  font-size: 3rem;
  margin-bottom: 0.7rem;
}

.price-info h1 span:nth-of-type(2) {
  font-size: 3.5rem;
  color: #f02867;
}

.colors-info h6 {
  font-size: 1rem;
  margin-bottom: 0.7rem;
}

.sizes {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  gap: 5px;
}

.sizes label {
  position: relative;
}

label span {
  position: absolute;
  font-weight: 900;
  /* z-index: 999; */
  top: 6px;
  left: 8px;
  font-size: 14px;
}

input[type="radio"] {
  width: 33px;
  height: 33px;
  border-radius: 10px;
  border: 1px solid #a1a1a1;
  background-color: white;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
}

input[type="radio"]:focus {
  outline: none;
}

input[type="radio"]:checked {
  background-color: #a1a1a1;
}

input[type="radio"]:checked ~ span:first-of-type {
  color: white;
}

.colors .color-01, .colors input {
  background-color: #201a1e;
  border-radius: 10em;
  margin-right: 5px;
  border: none;
}

.colors .color-02 {
  background-color: #f0efeb;
  border-radius: 10em;
}

.colors input:checked {
  outline: 3px groove #ef2765;
  background-color: #201a1e;
}

.colors .color-02:checked {
  outline: 3px groove #ef2765;
  background-color: #f0efeb;
}

.add-to-cart {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: end;
}

.add-to-cart button {
  border: none;
  background-color: #f02866;
  color: #fffeff;
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
  letter-spacing: 3px;
  border-radius: 5px;
  transition: 0.3s all;
  white-space: nowrap;
  height: 70px;
}

.add-to-cart button:hover {
  cursor: pointer;
  background-color: #558d44;
  -webkit-box-shadow: 0px 0px 10px #333;
  box-shadow: 0px 0px 10px #333;
  color: #fffeff;
}
/* ============ Product Display End ============ */

/* ============ Description Start ============ */
.description-section {
  padding: 1rem 3.5rem;
  font-family: Gotham-Book;
}

.description-section h3 {
  color: #676767;
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
}

.description-section hr {
  margin-top: 1rem;
  background-color: #646464;
  height: 4px;
}
/* ============ Description End ============ */

/* ============ Products Card Start ============ */
.product-card-div-section {
  padding: 3.5rem;
  padding-bottom: 5rem;
}

.product-card-div-section h1 {
  font-family: Gotham-Bold;
  color: #f02866;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}

.product-card-div {
  gap: 8rem 11vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

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
}

.card h3 {
  padding: 1rem 0rem;
  color: #202020;
  font-family: Gotham-Book;
}

.card div span:nth-of-type(1) {
  padding: 10rem 0rem;
  font-family: Gotham-Bold;
  color: #a5a5a5;
}

.card div span:nth-of-type(2) {
  padding: 1rem 0rem;
  font-family: Gotham-Bold;
  color: #ef2765;
  font-size: 1.5rem;
}

.slideshow-container,
.dots {
  display: none;
}

/* ============ Products Card End ============ */

@media only screen and (max-width: 1100px) {
  .top-nav-info {
    padding: 1rem 0.3rem;
    white-space: normal;
    display: flex;
    flex-wrap: wrap;
  }

  .top-nav-info hr {
    margin-top: 0.2rem;
    height: 13px;
  }
  .price-details {
    min-width: 100%;
  }
  .products-display-section {
    display: grid;
    gap: 1rem;
    padding: 0rem 1rem;
  }
  .products-image-div,
  .scroll {
    display: none;
  }
  .slideshow-container,
  .dots {
    display: block;
  }
  .description-section {
    padding: 1rem 1rem;
  }
  .product-card-div-section {
    padding: 1rem;
    padding-bottom: 5rem;
  }

  .product-card-div-section h1 {
    font-size: 1.4rem;
  }
}

@media only screen and (max-width: 1200px) {
  .products-display-section {
    gap: 1.2rem;
  }
  .price-details {
    grid-gap: 1rem;
  }

  .product-name-div h2 {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }

  .colors-info h6 {
    font-size: 1rem;
    margin-bottom: 0.7rem;
  }

  .price-info h1 {
    font-family: Gotham-Bold;
    font-size: 2rem;
    margin-bottom: 0.7rem;
  }

  .price-info h1 span:nth-of-type(2) {
    font-size: 2.4rem;
    color: #f02867;
  }
}

@media only screen and (max-width: 700px) {
  .top-nav-info {
    padding: .5rem .9rem;
  }

  .top-nav-info span {
    font-size: 900;
    padding: 0 0.1rem;
    font-size: 0.5rem;
  }

  .top-nav-info hr {
    width: 1px;
    margin-top: 0rem;
    height: 9px;
  }

  .product-name-div h2 {
    font-size: 1rem;
    letter-spacing: 0px;
  }

  .colors-info h6 {
    font-size: 0.7rem;
    margin-bottom: 0.2rem;
  }

  .price-details h6,
  .price-info h6 {
    font-size: 0.7rem;
    margin-bottom: 0.7rem;
  }

  .price-info h1 {
    font-family: Gotham-Bold;
    font-size: 1.2rem;
    margin-bottom: 0.7rem;
  }

  .price-info h1 span:nth-of-type(2) {
    font-size: 1.2rem;
    color: #f02867;
  }

  .circle-div input[type="radio"] {
    width: 20px;
    height: 20px;
  }

  .colors .color-02:checked {
    outline: 2px groove #ef2765;
  }

  input[type="radio"] {
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }

  label span {
    font-weight: 100;
    top: 5px;
    left: 4px;
    font-size: 10px;
  }

  .add-to-cart button {
    width: 100%;
    font-size: 1rem;
    letter-spacing: 0px;
    height: 30px;
  }
  .description-section h3 {
    font-size: 1rem;
  }

  .description-section p {
    font-size: .7rem;
    margin-bottom: 1.5rem;
  }
}

.wrapper__not-found {
  font-family: Arial, Helvetica, sans-serif;
  margin: 64px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  flex-direction: column;
}

.wrapper__not-found > * {
  margin-bottom: 16px;
}
</style>
