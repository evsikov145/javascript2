export const cartContainer = Vue.component('cart', {
    data: () => ({
      isVisibleCart: false,
    }),
    props: {
      cart: Array,
    },
    methods: {
      deleteFromCart(index) {
        this.cart.splice(index, 1);
        this.$emit('delete', index);
      }
    },
    template: `
      <div class="cart-container">
        <ul>
          <li v-for="(good, index) in cart">
             {{good.product_name}}
             <button @click="deleteFromCart(index)">X</button>
          </li>
        </ul>
      </div>
    `
  });