<template>
  <div id="app">
    <SiteHeader :cart-item-count="cart.length" />
    <main class="container">
      <ProductList @add-to-cart="addToCart" />
      <ShoppingCart :cart="cart" @remove-from-cart="removeFromCart" />
    </main>
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from './components/Header.vue';
import SiteFooter from './components/Footer.vue';
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';

export default {
  name: 'App',
  components: {
    SiteHeader,
    ProductList,
    ShoppingCart,
    SiteFooter,
  },
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
    },
    removeFromCart(item) {
      this.cart = this.cart.filter(product => product.id !== item.id);
    },
  },
};
</script>

<style>
/* Global styles */
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f8f9fa;
  color: #495057;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}
</style>
