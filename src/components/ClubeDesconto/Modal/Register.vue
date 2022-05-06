<template>
  <div>
    <h3>Desejo me cadastrar para ter ofertas.</h3>
    <form @submit.prevent="submit">
      <label for="Sexo">Eu sou:</label>
      <div class="form-group">
        <div>
          <input
            id="m"
            v-model="form.sexo"
            class="form-control"
            type="radio"
            value="m"
          >
          <label for="m">Masculino</label>
        </div>
        <div>
          <input
            id="f"
            v-model="form.sexo"
            class="form-control"
            type="radio"
            value="f"
          >
          <label for="f">Feminino</label>
        </div>
      </div>
      <input
        v-model="form.name"
        type="text"
        placeholder="Nome"
      />
      <input
        v-model="form.email"
        type="text"
        placeholder="Email (opcional)"
      />
      <input
        v-model="form.telefone"
        v-maska="'(##) # ####-####'"
        type="text"
        placeholder="Número do Whatsapp"
      />

      <Loading v-if="loading" />
      <template v-else>
        <button
          class="submit"
          type="submit"
        >
          Cadastrar
        </button>
        <button
          type="button"
          @click="onRestartRequested()"
        >
          Voltar
        </button>
      </template>
    </form>
  </div>
</template>

<script setup lang="ts">
import useAlert from "@/composables/useAlert";
import { http } from "@/service";
import { maska } from "maska";
import { ref } from "vue";
import Loading from "../../global/Loading.vue";

const vMaska = maska

const props = defineProps({
  onRestartRequested: {
    type: Function,
    required:true
  },
  onFinished: {
    type: Function,
    required:true
  }
})

const loading = ref(false)
const form = ref({
  name: "",
  email:"",
  telefone:"",
  sexo: "m"
})
const { alerts } = useAlert();
const submit = async () => {
  try {
    loading.value = true;
    const {data: {authorization}} = await http.post<{authorization:string}>(`/clientes`, form.value)
    localStorage.setItem('milpares_authorization', authorization);
    alerts.success('Aproveita as ofertas que preparamos pra você')
    props.onFinished();
  } catch (error) {
    alerts.error(error);
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>
form {
  font-family: Arial, Helvetica, sans-serif;
}
button {
  padding: 12px;
  border: none;
  border-radius: 10000px;
  width: 100%;
  margin-bottom: 12px;
  font-size: 22px;
  cursor: pointer;
}
button.submit {
  background-color: #F02866;
  color:#FFF;
}

input {
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  border: 1px solid #9A9A9A;
  padding: 16px;
  margin-bottom: 16px;
}

h3 {
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  margin-top: 16px;
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

.form-group div {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="radio"] {
  display: none;
}

.form-group label {
  padding: 8px;
  background-color: #9A9A9A;
  border-radius: 100px;
  color: #F2F2F2;
}

.form-group input:checked + label {
  background-color: #222;
}

</style>