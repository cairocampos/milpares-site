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
      <section class="products-display-section">
        <div class="pictures-options">
          <img src="@/assets/images/chinelo.png" alt="Foto Chinelo" />
          <img src="@/assets/images/chinelo.png" alt="Foto Chinelo" />
          <img src="@/assets/images/chinelo.png" alt="Foto Chinelo" />
          <img src="@/assets/images/chinelo.png" alt="Foto Chinelo" />
        </div>

        <div class="products-image-div">
          <img src="@/assets/images/chinelo.png" alt="Foto Chinelo" />
        </div>

        <div class="slideshow-container">
          <div class="mySlides fade">
            <div class="numbertext">1 / 3</div>
            <img
              src="https://media.istockphoto.com/photos/pair-of-beige-female-shoes-on-white-background-picture-id585765638?k=20&m=585765638&s=612x612&w=0&h=1Du8LB3QTb_WLDrkAe3HRa1MkjhrxXrrpH4YaZ4EXCU="
            />
          </div>
          <div class="mySlides fade">
            <div class="numbertext">2 / 3</div>
            <img
              src="https://media.istockphoto.com/photos/shoes-picture-id475661038?s=612x612"
            />
          </div>
          <div class="mySlides fade">
            <div class="numbertext">3 / 3</div>
            <img
              src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-girls-shoes-design-png-image_5363520.jpg"
            />
          </div>
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>

          <div style="text-align: center" class="dots">
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
            <span class="dot" onclick="currentSlide(3)"></span>
          </div>
        </div>

        <br />

        <div class="price-details">
          <div class="product-name-div">
            <h2>Chinelo Emborrachado</h2>
            <h6>Código: MII0001</h6>
          </div>

          <div class="price-info">
            <h6>Por Apenas:</h6>
            <h1>
              <span>R$</span>
              <span>79,00</span>
            </h1>
          </div>

          <div class="colors-info">
            <h6>Cores</h6>
            <div class="circle-div colors">
              <form action="#">
                <label>
                  <input class="color-01" type="radio" name="options" />
                </label>
                <label>
                  <input class="color-02" type="radio" name="options" />
                </label>
              </form>
            </div>
          </div>

          <div class="sizes-div">
            <h6>Tamanhos</h6>
            <div class="sizes">
              <label>
                <input type="radio" name="options" />
                <span>35</span>
              </label>
              <label>
                <input type="radio" name="options" />
                <span>36</span>
              </label>
              <label>
                <input type="radio" name="options" />
                <span>37</span>
              </label>
              <label>
                <input type="radio" name="options" />
                <span>38</span>
              </label>
              <label>
                <input type="radio" name="options" />
                <span>39</span>
              </label>
            </div>
          </div>

          <div class="add-to-cart">
            <button>Adicionar no carrinho</button>
          </div>
        </div>
      </section>

      <section class="description-section">
        <h3>Descrição</h3>
        <p>Chinelo de borracha antiderrapante</p>
        <hr />
      </section>

      <section class="product-card-div-section">
        <h1>Você também pode gostar</h1>
        <div class="product-card-div">
          <div class="card">
            <div class="chinelo-div">
              <img src="@/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="@/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="@/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="@/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="@/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div colors">
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="card">
            <div class="chinelo-div">
              <img src="@/assets/images/chinelo.png" alt="" />
            </div>
            <div>
              <h3>Chinelo Emborrachado</h3>
              <span>Por Apenas:</span>
              <span>R$ 79,00</span>
            </div>
            <div class="circle-div">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<style scoped>
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

/* ============ Product Display End ============ */
.products-display-section {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  gap: 2.5rem;
  font-family: Gotham-Light;
  padding: 3rem 3.5rem;
}

.pictures-options {
  gap: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  max-width: 95px;
}

.pictures-options img {
  width: 100%;
  max-width: 90px;
  min-width: 58px;
}

.products-image-div {
  width: 100%;
  max-width: 500px;
}

.products-image-div img {
  height: 100%;
  width: 100%;

  max-height: 520px;
}

.price-details {
  color: #868686;
  display: grid;
  flex-grow: 1;
  max-width: 450px;
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

.sizes {
  display: flex;
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

label span:first-of-type {
  position: relative;
  font-weight: 900;
  left: -28px;
  font-size: 12px;
  color: #a1a1a1;
}

label span {
  position: relative;
  top: -12px;
  font-weight: 900;
}

.colors .color-01 {
  background-color: #201a1e;
  border-radius: 10em;
  margin-right: 5px;
  border: none;
}

.colors .color-02 {
  background-color: #f0efeb;
  border-radius: 10em;
}

.colors .color-01:checked {
  outline: 3px groove #ef2765;
  background-color: #201a1e;
}

.colors .color-02:checked {
  outline: 3px groove #ef2765;
  background-color: #f0efeb;
}

.add-to-cart {
  display: flex;
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
}

.add-to-cart button:hover {
  cursor: pointer;
  background-color: #558d44;
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

.description-section p {
  color: #a8a7a7;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.description-section hr {
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
}

.chinelo-div img {
  width: 100%;
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

/* ============ Products Card End ============ */

@media only screen and (max-width: 790px) {
  .products-image-div {
    width: 100%;
    max-width: 400px;
  }

  .products-image-div img {
    height: 100%;
    width: 100%;
    max-height: 350px;
  }

  .pictures-options {
    display: none;
  }

  .pictures-options img {
    width: 100%;
    max-width: 60px;
    min-width: 30px;
  }
}

.slideshow-container, .dots {
  display: none;
}

@media only screen and (max-width: 1120px) {
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

  .products-display-section {
    gap: 1rem;
    padding: 2rem 1.5rem;
  }

  .pictures-options {
    gap: 2rem;
  }

  .product-name-div h2 {
    font-size: 1.8rem;
    letter-spacing: 0px;
  }

  .product-name-div h6 {
    font-size: 0.9rem;
  }

  .price-info h6 {
    font-size: 0.9rem;
  }

  .price-info h1 {
    font-size: 2.3rem;
  }

  .price-info h1 span:nth-of-type(2) {
    font-size: 2.3rem;
  }

  .colors-info h6 {
    font-size: 0.9rem;
  }

  .circle-div {
    gap: 0.7rem;
  }

  .circle-div div {
    min-width: 25px;
    min-height: 25px;
  }

  .sizes-div h6 {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .add-to-cart button {
    width: 100%;
    height: 90%;
    font-size: 1.2rem;
  }

  .description-section {
    padding: 1rem 1.5rem;
  }

  .description-section h3 {
    font-size: 1.2rem;
  }

  .chinelo-div {
    border-top: 10px solid #f02866;
    border-bottom: 10px solid #f02866;
  }

  .card h3 {
    padding: 0.8rem 0rem;
    font-size: 1rem;
  }

  .card div span:nth-of-type(2) {
    padding: 1rem 0rem;
    font-size: 1.2rem;
  }

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

@media only screen and (max-width: 1214px) {
  .add-to-cart button {
    padding: 1rem 0;
    position: relative;
    top: 20px;
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
  .products-display-section {
    gap: 1rem;
    padding: 2rem 0.5rem;
  }
  .description-section {
    padding: 1rem 0.5rem;
  }

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
  .slideshow-container, .dots {
    display: block;
  }

  .products-image-div {
    width: 100%;
    max-width: 500px;
    display: none;
  }
}

@media only screen and (max-width: 400px) {
  .product-name-div h2 {
    font-size: 1.1rem;
    letter-spacing: 1px;
  }

  .product-name-div h6 {
    margin-top: 1rem;
    font-size: 0.8rem;
    letter-spacing: 0px;
  }

  .price-info h6 {
    font-size: 0.8rem;
    margin-bottom: 0.7rem;
  }

  .price-info h1 {
    font-size: 1.2rem;
    margin-bottom: 0.7rem;
  }

  .price-info h1 span:nth-of-type(2) {
    font-size: 1.2rem;
  }

  .colors-info h6 {
    font-size: 0.8rem;
    margin-bottom: 0;
  }

  .circle-div {
    display: flex;
    padding-top: 0.8rem;
    gap: 0.5rem;
  }

  .circle-div div {
    min-width: 22px;
    min-height: 22px;
    margin-bottom: 1rem;
  }

  .sizes-div h6 {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
}
</style>
