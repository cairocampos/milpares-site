<template>
  <section class="product-card-div-section">
    <h1>Você também pode gostar</h1>
    <div
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
            :alt="produto.nome"
          />
        </div>
        <div>
          <h3>{{ produto.nome }}</h3>
          <span>Por Apenas:</span>
          <span>R$ {{ toBRL(produto.preco) }}</span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import useCurrency from '@/composables/useCurrency';
import { IProdutoCatalogo } from '@/interfaces/IProduto';
import { http } from '@/service'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: Number,
      required:true
    }
  },
  setup(props) {
    const { toBRL } = useCurrency();
    const produtos = ref<IProdutoCatalogo[]>([]);
    const fetchProdutosRelacionados = async () => {
      const {data} = await http.get('/produtos/catalogo/relacionados', {
        params: {
          produto_id: props.id
        }
      })

      produtos.value = data;
    }

    onMounted(() => fetchProdutosRelacionados())


    return {
      produtos,
      toBRL
    }
  },
})
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
  object-fit: fill;
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
  background-color: #5e984c;
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
</style>