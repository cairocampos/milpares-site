<template>
  <section>
    <div class="top-nav-info">
      <Breadcrumbs />
    </div>
    <main>
      <Loading v-if="loading" />
      <section
        v-else-if="carrinho && carrinho.length"
        class="carrinho-details-section"
      >
        <div class="carrinho-container">
          <div
            v-for="(item, index) in carrinho"
            :key="index"
            class="carrinho-details"
          >
            <div class="products-carrinho">
              <div class="image">
                <img
                  :src="getImageProduto(item.id)"
                  alt="Chinelo Exemplo"
                />
              </div>

              <div class="text-carrinho">
                <h1>{{ getProduto(item.id)?.nome }}</h1>
                <p><b>Código:</b> {{ getProduto(item.id)?.codigo }}</p>
                <p><b>Tamanho:</b> {{ item.tamanho }}</p>
                <p><b>Cor:</b> {{ getNomeCor(item.id, item.cor_id) }}</p>
              </div>

              <div class="trash-icon-div">
                <button @click="removeItemCarrinho(item)">
                  <i class="icofont-trash"></i>
                </button>
              </div>
            </div>

            <div class="amount-price-main">
              <div class="amount-div">
                <p>
                  <b>Quantidade:</b>
                </p>
                <div class="container">
                  <input
                    v-if="item.quantidade > 1"
                    type="button"
                    value="-"
                    @click="decrementValue(index)"
                  />
                  <input
                    id="number"
                    v-model="carrinho[index].quantidade"
                    type="text"
                    name="quantity"
                    disa
                  />
                  <input
                    type="button"
                    value="+"
                    @click="incrementValue(index)"
                  />
                </div>
              </div>
              <div class="price-div">
                <span>R$</span>
                <span>{{ getProdutoPreco(item.id, item.quantidade) }}</span>
              </div>
            </div>
            <hr />
          </div>
        </div>

        <div class="form-div">
          <form
            @submit.prevent="checkForm"
          >
            <input
              v-model="form.nome"
              type="text"
              placeholder="Nome *"
            />
            <input
              v-model="form.email"
              name="email"
              type="email"
              placeholder="Email"
            />
            <input
              v-model="form.telefone"
              name="number"
              type="number"
              placeholder="Número do whatsApp"
            />
            <textarea
              v-model="form.extra"
              name="info"
              rows="6"
              placeholder="Informações Adicionais"
            ></textarea>
            <button type="submit">
              Compre via Whatsapp
            </button>
            <button
              type="button"
              style="background-color: red;"
              @click="clear"
            >
              Limpar Carrinho
            </button>
          </form>
        </div>
      </section>
      <CarrinhoVazio v-else />
    </main>
  </section>
</template>

<script lang="ts">
import CarrinhoVazio from '@/components/carrinho/CarrinhoVazio.vue';
import { IProdutoCatalogo } from '@/interfaces/IProduto';
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';
import { useStore } from 'vuex';
import { ICarrinho } from '@/interfaces/ICarrinho';
import { http } from '@/service';
import useCurrency from '@/composables/useCurrency';
import useAlert from '@/composables/useAlert';
import Loading from '../components/global/Loading.vue';
import Breadcrumbs from '../components/Breadcrumbs.vue'
export default defineComponent({
    components: { Loading, CarrinhoVazio, Breadcrumbs },
    setup() {
        const form = ref({
            nome: "",
            email: "",
            telefone: "",
            extra: ""
        });
        const { alerts } = useAlert();
        const loading = ref(false);
        const store = useStore();
        const carrinho = ref<ICarrinho[]>([]);


        const produtos = ref<IProdutoCatalogo[]>();
        const fetchProdutos = async () => {
            try {
                loading.value = true;
                const items = carrinho.value.map((item) => item.id);
                const { data } = await http.get<IProdutoCatalogo[]>("/produtos/catalogo/items", {
                    params: {
                        produto_ids: [...new Set(items)],
                    },
                });
                produtos.value = data;
            }
            catch (error) {
                console.log(error);
            }
            finally {
                loading.value = false;
            }
        };
        watch(carrinho, () => fetchProdutos());
        const getProduto = (produtoId: number) => {
            const produto = produtos.value?.find((item) => item.id === produtoId);
            return produto ?? null;
        };
        const getProdutoPreco = (produtoId: number, quantidade: number) => {
            const { toBRL } = useCurrency();
            const produto = produtos.value?.find((item) => item.id === produtoId);
            if(produto) {
              const total = produto.preco * quantidade;
              return produto ? toBRL(total) : null;
            }

            return 0;
        };
        const getNomeCor = (produtoId: number, corId: number) => {
            const produto = produtos.value?.find((item) => item.id === produtoId);
            if (produto) {
                return produto.cores.find((item) => item.id === corId)?.nome;
            }
            return "";
        };
        const removeItemCarrinho = async (data: ICarrinho) => {
            alerts.confirm("Deseja remover esse item do carrinho?")
                .then((result) => {
                if (result.isConfirmed) {
                    store.dispatch("removeItemCarrinho", data);
                    const findIndex = carrinho.value.findIndex(item => (item.id == data.id && item.tamanho == data.tamanho && item.cor_id == data.cor_id));
                    if (findIndex !== -1) {
                        carrinho.value.splice(findIndex, 1);
                    }
                }
            });
        };
        const getImageProduto = (produtoId: number) => {
            const produto = getProduto(produtoId);
            return produto?.imagem_principal?.path ?? "/assets/images/default.png";
        };
        let interval = setTimeout(() => null, 1000);
        const incrementValue = (index: number) => {
            clearTimeout(interval);
            carrinho.value[index].quantidade += 1;
            interval = setTimeout(() => {
                store.dispatch("updateItemCarrinho", carrinho.value[index]);
            }, 1000);
        };
        const decrementValue = (index: number) => {
            clearTimeout(interval);
            carrinho.value[index].quantidade -= 1;
            interval = setTimeout(() => {
                store.dispatch("updateItemCarrinho", carrinho.value[index]);
            }, 1000);
        };

        const sendForm = async () => {
            try {
                alerts.showLoading('Processando seu pedido...');
                const {data} = await http.post<{link:string}>('/produtos/catalogo/pedido', {
                  ...form.value,
                  items: carrinho.value
                })
                window.open(data.link, '_blank')
            }
            catch (error) {
                alerts.error("Algo inesperado aconteceu");
                console.log(error);
            }
            finally {
              alerts.hideLoading();
            }
        };

        const checkForm = async () => {
          const { nome, email, telefone } = form.value
          if(!nome) return alerts.info('Favor informar um nome.');
          if(!email) return alerts.info('Informe um email.');
          if(!telefone) return alerts.info('Informe um telefone.');

          sendForm();
        }

        const clear = () => {
          store.dispatch('limparCarrinho');
          carrinho.value = [];
          form.value = {
            email: "",
            extra:"",
            nome: "",
            telefone:""
          }
        }

        onMounted(() => {
            store.dispatch('verificarCarrinho')
            carrinho.value = store.getters.getCarrinho
            fetchProdutos();
        });
        return {
            clear,
            loading,
            carrinho,
            getProduto,
            getProdutoPreco,
            getNomeCor,
            removeItemCarrinho,
            getImageProduto,
            incrementValue,
            decrementValue,
            form,
            checkForm
        };
    }
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

/* ============ Top-Nav-Menu End ============ */
.carrinho-details-section {
  padding: 1rem 3.5rem;
  gap: 2rem;
  color: #868686;
  font-family: Gotham-Book;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

@media screen and (min-width: 1600px) {
  .carrinho-details-section {
    gap: 10rem;
  }
}

.carrinho-container {
  display:flex;
  flex-direction: column;
  flex-grow: 1;
}

.carrinho-details {
  flex-grow: 1;
  max-width: 100%;
  flex-grow: 1;
  margin-bottom: 46px;
}

.trash-icon-div {
  display: flex;
  align-items: center;
}

.trash-icon-div button {
  border: none;
  background-color: #fff;
  color: #868686;
  font-size: 1.2rem;
  cursor: pointer;
}

.products-carrinho {
  display: flex;
  gap: 1rem;
}

.image {
  max-width: 130px;
}

.image img {
  width: 100%;
}

.text-carrinho {
  flex-grow: 1;
  display: grid;
  margin-top: 0.2rem;
}

hr {
  margin: 1rem 0;
}

.amount-price-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 8px;
}

.amount-div {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: Gotham-Book;
  color: #a3a3a3;
}

.amount-div input[type="text"] {
  text-align: center;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  font-size: 14px;
  padding: 0.5rem 0rem;
  max-width: 40px;
  margin: 0 5px;
}

.amount-div input[type="button"] {
  cursor: pointer;
  color: #a3a3a3;
  background-color: #fff;
  border: 1px solid #bfbfbf;
  border-radius: 5em;
  padding: 0.2rem 0.5rem;
}

.price-div span {
  font-family: Gotham-Book;
}

.price-div span:nth-child(1) {
  color: #868686;
  font-size: 1.6rem;
  font-weight: 900;
  margin-right: 5px;
}

.price-div span:nth-child(2) {
  color: #e61655;
  font-size: 1.8rem;
  font-weight: 900;
}

.form-div form {
  max-width: 380px;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0;
  gap: 1.2rem 0;
}

.form-div input {
  padding: 1rem;
  font-size: 16px;
  flex-grow: 1;
  border: 1px solid #868686;
  border-radius: 5px;
  font-family: Gotham-Book;
}

.form-div textarea {
  flex-grow: 1;
  width: 100%;
  resize: none;
  font-family: Gotham-Book;
  padding: 1rem;
}

.form-div input:focus,
.form-div textarea:focus {
  border: none;
  outline: none;
  border: 1px solid #e61655;
  box-shadow: 0 0 5px #e61655;
}

.form-div button {
  width: 100%;
  background-color: #5e984c;
  color: #fff;
  border: 0;
  letter-spacing: 2px;
  border-radius: 5px;
  font-size: 1.3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: 0.3s all;
}

.form-div button:hover {
  background-color: #538a42;
  box-shadow: 0px 0px 5px #999;
}

@media only screen and (max-width: 1120px) {
  .carrinho-details-section {
    padding: 1rem 1.5rem;
  }

  .carrinho-details-section {
    padding: 1rem 1.5rem;
  }
  .top-nav-info {
    padding: 0.8rem 1rem;
  }

  .top-nav-info span {
    padding: 0 0.5rem;
  }

  .top-nav-info hr {
    margin-top: 0.2rem;
    height: 15px;
  }
}

@media only screen and (max-width: 555px) {
  .carrinho-details-section {
    padding: 1rem 1.5rem;
    gap: 1rem;
  }

  .trash-icon-div button {
    font-size: 1rem;
  }

  .products-carrinho {
    display: flex;
    gap: 0.5rem;
  }

  .image {
    max-width: 80px;
  }

  .text-carrinho {
    margin-top: 0rem;
  }

  .text-carrinho h1 {
    font-size: 1rem;
    padding-bottom: 0.5rem;
  }

  .text-carrinho p {
    font-size: 0.8rem;
  }

  .amount-price-main p {
    font-size: 0.8rem;
  }

  .amount-div {
    gap: 0.3rem;
  }

  .amount-div input[type="text"] {
    font-size: 12px;
    padding: 0.3rem 0rem;
  }

  .amount-div input[type="button"] {
    padding: 0.1rem 0.4rem;
  }

  .price-div span:nth-child(1) {
    font-size: 0.9rem;
  }

  .price-div span:nth-child(2) {
    font-size: 1rem;
  }

  .form-div form {
    max-width: 380px;
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
    gap: 1.2rem 0;
  }

  .form-div input {
    padding: 0.7rem;
    font-size: 14px;
    font-family: Gotham-Book;
  }

  .form-div textarea {
    padding: 0.5rem;
  }

  .form-div input:focus,
  .form-div textarea:focus {
    border: none;
    outline: none;
    border: 1px solid #e61655;
    box-shadow: 0 0 5px #e61655;
  }

  .form-div button {
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

  .form-div input {
    padding: 0.7rem;
  }

  .form-div textarea {
    padding: 0.5rem;
  }
}

@media only screen and (max-width: 320px) {
  .carrinho-details-section {
    padding: 1rem 0.6rem;
  }

  .trash-icon-div button {
    font-size: 0.8rem;
  }

  .products-carrinho {
    gap: 0.3rem;
  }

  .image {
    max-width: 60px;
  }

  .text-carrinho h1 {
    font-size: 0.8.5rem;
    padding-bottom: 0.4rem;
  }

  .text-carrinho p {
    font-size: 0.6rem;
  }

  .amount-div input[type="text"] {
    font-size: 11px;
    padding: 0.2rem 0rem;
  }

  .amount-div input[type="button"] {
    padding: 0.1rem 0.4rem;
  }

  .price-div span:nth-child(1) {
    font-size: 0.8rem;
  }

  .price-div span:nth-child(2) {
    font-size: 0.9rem;
  }
}

span.text-error {
  color: #e61655;
  font-size: 12px;
  display: block;
}
</style>
