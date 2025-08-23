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
import products from '../products.json';

export default {
  name: 'ProductList',
  data() {
    return {
      products: products,
    };
  },
};
</script>

<style scoped>
.product-list {
  flex: 3;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-family: 'Playfair Display', serif;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-card h3 {
  font-size: 1.2rem;
  margin: 1rem 1rem 0.5rem;
  font-family: 'Playfair Display', serif;
}

.product-card p {
  font-size: 1.1rem;
  font-weight: 600;
  color: #007bff;
  margin: 0 1rem 1rem;
}

button {
  display: block;
  width: calc(100% - 2rem);
  margin: 0 1rem 1rem;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
