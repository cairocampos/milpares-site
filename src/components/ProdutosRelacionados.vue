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
          <span>R$ {{ toBRL(produto.preco_promocional > '0' ? produto.preco_promocional : produto.preco_loja) }}</span>
        </div>
        <div class="circle-div">
          <div
            v-for="cor in produto.cores"
            :key="cor.id"
            :style="`background-color:${cor.hexadecimal}`"
          ></div>
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
  gap: 5rem 9rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.chinelo-div {
  border-top: 15px solid #f02866;
  border-bottom: 15px solid #f02866;
  transition: 0.3s all;
  border-radius: 1px;
  height: 350px;
  width: 350px;
}

.chinelo-div img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card {
  flex-grow: 1;
  max-width: 350px;
  font-family: Gotham-Bold;
}

.card h3 {
  padding: 1rem 0rem;
  color: #202020;
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

@media only screen and (max-width: 1120px) {
  .product-card-div-section {
    padding: 0 1rem;
    padding-bottom: 5rem;
  }

  .product-card-div-section h1 {
    font-size: 1.2rem;
  }

  .product-card-div {
    gap: 4rem 1.5rem;
  }
}

@media only screen and (max-width: 480px) {
  .product-card-div-section {
    padding: 0 0.5rem;
    padding-bottom: 3rem;
  }

  .product-card-div-section h1 {
    font-size: 1.2rem;
  }

  .product-card-div {
    gap: 4rem 1.5rem;
  }
  .card {
    max-width: 220px;
  }
}

.circle-div {
  display: flex;
  padding-top: 1rem;
  gap: 1rem;
}

.circle-div div {
  min-width: 30px;
  min-height: 30px;
  border-radius: 5em;
  outline: 1px solid #c4c4c4;
}

.circle-div div:nth-of-type(1) {
  background-color: #221c1d;
}

.circle-div div:nth-of-type(2) {
  background-color: #efeeea;
}

</style>