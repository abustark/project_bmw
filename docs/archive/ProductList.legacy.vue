<template>
  <div class="product-list">
    <h2>Products</h2>
    <div class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>\${{ product.price }}</p>
        <button @click="$emit('add-to-cart', product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [
        { id: 1, name: 'Cool Shoe', price: 50, image: 'static/1010138_P_PDP.jpg' },
        { id: 2, name: 'Awesome Sneaker', price: 60, image: 'static/1017679_P_PDP.jpg' },
        { id: 3, name: 'Stylish Boot', price: 70, image: 'static/1018589_P_PDP.jpg' },
        { id: 4, name: 'Running Shoe', price: 80, image: 'static/1022308_P_PDP.jpg' },
        { id: 5, name: 'Casual Loafer', price: 90, image: 'static/1022332_P_PDP.jpg' },
      ],
    };
  },
};
</script>

<style scoped>
.product-list {
  width: 100%;
}
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.product-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  width: 200px;
}
.product-card img {
  width: 100%;
  height: auto;
}
</style>
