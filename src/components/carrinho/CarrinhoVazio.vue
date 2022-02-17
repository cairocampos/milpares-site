<template>
  <div class="carrinho-vazio">
    <div>
      <img
        width="35"
        src="/assets/images/cart.png"
        alt="Carrinho Vazio"
      />
      <h3>Seu carrinho está vazio</h3>
    </div>

    <p>Adicione produtos em seu carrinho e compre via whatsapp.</p>

    <div style="margin-top:32px">
      <router-link to="/produtos">
        Voltar para a página principal
      </router-link>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: Gotham-Light;
}
a {
  width: 100%;
  background-color: #5e984c;
  color: #fff;
  border: 0;
  letter-spacing: 2px;
  border-radius: 5px;
  font-size: 1.3rem;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s all;
  font-weight: bold;
}
.carrinho-vazio {
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 30px;
  margin: 32px 0;
}

.carrinho-vazio div:first-child {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h3 {
  margin-top:16px;
  color: #ef2866;
}

@media (max-width: 430px) {
  a {
    font-size: 14px;
  }
}
</style>