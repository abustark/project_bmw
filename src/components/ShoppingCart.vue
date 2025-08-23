<template>
  <div class="shopping-cart">
    <h2>Shopping Cart</h2>
    <div v-if="cart.length === 0" class="empty-cart">
      Your cart is empty.
    </div>
    <div v-else>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <span>{{ item.name }}</span>
        <span>\${{ item.price }}</span>
        <button @click="$emit('remove-from-cart', item)">Remove</button>
      </div>
      <div class="cart-total">
        <strong>Total: \${{ totalPrice }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price, 0);
    },
  },
};
</script>

<style scoped>
.shopping-cart {
  flex: 1;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-self: flex-start; /* Aligns to the top */
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-family: 'Playfair Display', serif;
  text-align: center;
}

.empty-cart {
  text-align: center;
  color: #868e96;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eaeaea;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item span {
  flex: 1;
}

.cart-item span:first-child {
  flex: 2;
  font-weight: 500;
}

.cart-item button {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
}

.cart-total {
  margin-top: 1.5rem;
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
