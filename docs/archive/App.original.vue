<template>
  <div id="app">
    <header>
      <h1>My Shopping Cart</h1>
    </header>
    <main>
      <ProductList @add-to-cart="addToCart" />
      <ShoppingCart :cart="cart" @remove-from-cart="removeFromCart" />
    </main>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    ShoppingCart,
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
main {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
