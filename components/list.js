export const list = Vue.component('goods-list', {
    props: ['goods'],
    computed: {
      isGoodsEmpty() {
        return this.goods.length === 0;
      }
    },
    methods: {
      buy(good) {
        this.$emit('buy', good);
      }
    },
    template: `
      <div class="goods-list" v-if="!isGoodsEmpty">
        <goods-item v-for="good in goods" :good="good" :key="good.id_product" @buy='buy'></goods-item>
      </div>
      <div class="not-found-items" v-else>
        <h2>Нет данных</h2>
      </div>
    `,
  });