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
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <select
                  id="unidade"
                  v-model="form.unidade_id"
                  name="unidade"
                >
                  <option
                    value="0"
                    disabled
                  >
                    Unidade mais próxima*
                  </option>
                  <option
                    v-for="unidade in unidades"
                    :key="unidade.id"
                    :value="unidade.id"
                  >
                    {{ unidade.nome }} - {{ unidade.cidade }} / {{ unidade.estado }}
                  </option>
                </select>
              </div>
              <div>
                <div class="form-group">
                  <input
                    v-model="form.name"
                    class="form-control"
                    type="text"
                    name="nome"
                    placeholder="Nome completo*"
                  >
                </div>
              </div>

              <div class="form-group">
                <label for="Sexo">Sexo</label>
                <input
                  id="m"
                  v-model="form.sexo"
                  class="form-control"
                  type="radio"
                  value="m"
                >
                <label for="m">Masculino</label>
                <input
                  id="f"
                  v-model="form.sexo"
                  class="form-control"
                  type="radio"
                  value="f"
                >
                <label for="f">Masculino</label>
              </div>
              <div class="form-group">
                <input
                  v-model="form.email"
                  class="form-control"
                  type="email"
                  name="email"
                  placeholder="E-mail*"
                >
              </div>
              <div class="form-group">
                <input
                  v-model="form.telefone"
                  v-maska="'(##) # ####-####'"
                  class="form-control"
                  type="text"
                  name="celular"
                  placeholder="Celular*"
                >
              </div>

              <div class="form-group">
                <input
                  v-model="form.cpf_cnpj"
                  v-maska="'###.###.###-##'"
                  class="form-control"
                  type="text"
                  name="cpf"
                  placeholder="CPF*"
                >
              </div>

              <div class="form-group">
                <input
                  v-model="form.cep"
                  v-maska="'#####-###'"
                  class="form-control"
                  type="text"
                  name="cep"
                  placeholder="CEP*"
                >
              </div>

              <div class="form-group">
                <input
                  v-model="form.logradouro"
                  class="form-control"
                  type="text"
                  name="endereco*"
                  placeholder="Endereço"
                >
              </div>

              <div class="form-group">
                <input
                  v-model="form.bairro"
                  class="form-control"
                  type="text"
                  name="bairro*"
                  placeholder="Bairro"
                >
              </div>

              <div class="form-group">
                <input
                  v-model="form.numero"
                  class="form-control"
                  type="text"
                  name="number"
                  placeholder="Número*"
                >
                <input
                  v-model="form.complemento"
                  class="form-control"
                  type="text"
                  name="complemento"
                  placeholder="Complemento"
                >
              </div>

              <div class="form-group">
                <input
                  v-model="form.estado"
                  v-maska="'AA'"
                  class="form-control"
                  type="text"
                  name="estado"
                  placeholder="Estado"
                >
              </div>

              <div class="form-group">
                <input
                  v-model="form.cidade"
                  class="form-control"
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                >
              </div>

              <div class="button-group">
                <Loading v-if="loading" />
                <button
                  v-else
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
import { http } from '@/service';
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'

type Form = {
  name:string;
  cpf_cnpj:string;
  cep:string;
  logradouro:string;
  numero:string;
  complemento?:string;
  estado:string;
  cidade: string;
  telefone:string;
  email:string;
  unidade_id:number;
  sexo: 'm' | 'f',
  bairro:string;
}

type Unidade = {
  id:number;
  nome:string;
  cidade:string;
  estado:string;
  logradouro:string;
  cep:string;
  numero:string;
}

import { maska } from 'maska'
import useAlert from '@/composables/useAlert';
import Loading from '../components/global/Loading.vue';
import {ICep} from '@/interfaces/ICep'
import Swal from 'sweetalert2';

export default defineComponent({
    directives: { maska },
    components: { Loading },
    setup() {
        const initialState: Form = {
            cep: "",
            cidade: "",
            cpf_cnpj: "",
            email: "",
            estado: "",
            logradouro: "",
            name: "",
            numero: "",
            telefone: "",
            unidade_id: 0,
            complemento: "",
            sexo: "m",
            bairro: ""
        }

        const form = reactive<Form>({...initialState});
        const unidades = ref<Unidade[]>([]);
        const loading = ref(false);
        const { alerts } = useAlert();

        const fetchCep = async (cep: string) => {
          const { data: {data} } = await http.get<{data: ICep}>(`/cep?cep=${cep}`);
          form.logradouro = data.logradouro;
          form.estado = data.uf;
          form.bairro = data.bairro;
          form.cidade = data.localidade;
        };

        watch(() => form.cep, cep => {
          if(cep.length === 9) {
            fetchCep(cep)
          }
        })

        watch(() => form.unidade_id, val => {
          if(val) {
            const unidade = unidades.value.find(item => item.id == val);
          
            if(unidade) {
              Swal.fire({
                icon:"question",
                title: unidade.nome,
                html: `
                  <ul>
                    <li>Unidade situada na:</li>
                    <li>${unidade.logradouro}, Nº ${unidade.numero}</li>
                    <li>${unidade.cidade} / ${unidade.estado}</li>
                  </ul>
                `
              })
            }
          }
        })

        const fetchUnidades = async () => {
            const { data } = await http.get<Unidade[]>("/unidades");
            unidades.value = data;
        };

        const resetForm = () => {
          Object.assign(form, initialState);
        }

        const submitForm = () => {
          alerts.confirm('Após a inscrição, você receberá as instruções via email para acessar o portal.')
            .then(async result => {
              if(result.isConfirmed) {
                try {
                  loading.value = true;
                  await http.post("/revendedores", form);
                  resetForm();
                  alerts.success("Parabéns! Acesse seu email e complete o cadastro!");
                }
                catch (error) {
                  alerts.error(error);
                }
                finally {
                  loading.value = false;
                }
              }
            })
        };
        onMounted(() => fetchUnidades());
        return {
            form,
            unidades,
            submitForm,
            loading
        };
    }
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
  margin-bottom: 1.2rem;
  gap: 1rem;
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

.form-group:nth-of-type(7) input:nth-of-type(1) {
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
