export const cartContainer = Vue.component('cart', {
    data: () => ({
      cart,
      isVisibleCart: false,
    }),
    methods: {
      toggleVisibility() {
        this.isVisibleCart = !this.isVisibleCart;
      },
      deleteFromCart(index) {
        this.cart.splice(index, 1);
        this.cart = [...this.cart];
        this.$emit('delete', index);
      }
    },
    template: `
      <div class="cart-container" v-if="isVisibleCart">
        <ul>
          <li v-for="(good, index) in cart">
             {{good.product_name}}
             <button @click="deleteFromCart(index)">X</button>
          </li>
        </ul>
      </div>
    `
  });