export const item = Vue.component('goods-item', {
    props: ['good'],
    methods: {
      buy() {
        this.$emit('buy', this.good);
      }
    },
    template: `
      <div class="goods-item">
          <h3>{{ good.product_name }}</h3>
          <p>{{ good.price }}</p>
          <button @click="buy">Купить</button>
      </div>
    `,
  });