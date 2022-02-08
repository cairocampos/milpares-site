<template>
  <section>
    <div class="top-nav-info">
      <span>Home</span>
      <hr />
      <span>Produtos</span>
      <hr />
      <span>Chinelos</span>
      <hr />
      <span>Chinelo Emborrachado</span>
    </div>
    <main>
      <section class="carrinho-details-section">
        <div class="carrinho-details">
          <div class="products-carrinho">
            <div class="image">
              <img src="@/assets/images/chinelo.png" alt="Chinelo Exemplo" />
            </div>

            <div class="text-carrinho">
              <h1>Chinelo Emborrachado</h1>
              <p><b>Código:</b> MII0001</p>
              <p><b>Tamanho:</b> 35</p>
              <p><b>Cores:</b> Preto</p>
            </div>

            <div class="trash-icon-div">
              <button>
                <i class="icofont-trash"></i>
              </button>
            </div>
          </div>

          <hr />

          <div class="amount-price-main">
            <div class="amount-div">
              <p>
                <b>Quantidade:</b>
              </p>
              <div class="container">
                <input type="button" onclick="decrementValue()" value="-" />
                <input type="text" name="quantity" value="1" id="number"/>
                <input type="button" onclick="incrementValue()" value="+" />
              </div>
            </div>
            <div class="price-div">
              <span>R$</span>
              <span>79,00</span>
            </div>
          </div>
        </div>

        <div class="form-div">
          <form action="#">
            <input type="text" placeholder="Nome *" />
            <input name="email" type="email" placeholder="Email" />
            <input name="number" type="number" placeholder="Número do whatsApp" />
            <textarea
              name="info"
              rows="6"
              placeholder="Informações Adicionais"
            ></textarea>
            <button type="submit">Compre via Whatsapp</button>
          </form>
        </div>
      </section>
    </main>
  </section>
</template>

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

.carrinho-details {
  flex-grow: 1;
  max-width: 100%;
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
</style>
