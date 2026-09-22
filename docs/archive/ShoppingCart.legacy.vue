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
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}
.cart-total {
  margin-top: 1rem;
  text-align: right;
}
</style>
