<template>
  <header class="site-header">
    <div class="container">
      <h1 class="site-title">ShoeShop</h1>
      <div class="cart-info">
        <img src="/cart.svg" alt="Shopping Cart" class="cart-icon" />
        <span class="cart-count">{{ cartItemCount }}</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader',
  props: {
    cartItemCount: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.site-header {
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  padding: 1.5rem 0;
  margin-bottom: 2rem;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-title {
  font-size: 2rem;
  font-family: 'Playfair Display', serif;
  color: #2c3e50;
}

.cart-info {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-icon {
  width: 32px;
  height: 32px;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #ff4d4f;
  color: white;
  border-radius: 50%;
  padding: 0.25em 0.6em;
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
