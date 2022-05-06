<template>
  <div>
    <input
      v-model="phone"
      v-maska="'(##) # ####-####'"
      type="text"
      placeholder="Número do Whatsapp"
      @keypress.enter="submit"
    />

    <Loading v-if="loading" />
    <template v-else>
      <button
        class="submit"
        @click="submit"
      >
        Validar cadastro
      </button>
      <button @click="onRestartRequested()">
        Voltar
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import useAlert from "@/composables/useAlert";
import { http } from "@/service";
import { ref } from "vue";
import Loading from "../../global/Loading.vue";
import { maska } from "maska";
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


const vMaska = maska

const loading = ref(false)
const phone = ref('')
const { alerts } = useAlert();

const submit = async () => {
  try {
    loading.value = true;
    const {data: {authorization}} = await http.post<{authorization:string}>(`/valida-telefone`, {phone: phone.value})
    localStorage.setItem('milpares_authorization', authorization);
    alerts.success('Identificamos seu cadastro! Aproveita as ofertas que preparamos pra você')
    props.onFinished();
  } catch (error) {
    alerts.error(error)
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>
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

</style>