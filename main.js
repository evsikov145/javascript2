const cart = [];

import {search} from './components/search.js';

Vue.component('cart', {
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

Vue.component('goods-item', {
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

Vue.component('goods-list', {
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

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    searchLine: '',
    error: '',
  },
  methods: {
    setError(e) {
      this.error = e.message || e;
      setTimeout(() => {
        this.error = '';
      }, 3500);
    },
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest();
        } else {
          xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const body = JSON.parse(xhr.responseText);
              resolve(body)
            } else {
              reject(xhr.responseText);
            }
          }
        };
        xhr.onerror = function (err) {
          reject(err);
        };

        xhr.open('GET', url);
        xhr.send();
      });
    },
    makeDELETERequest(url) {
      return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest();
        } else {
          xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };
        xhr.onerror = function (err) {
          reject(err);
        };

        xhr.open('DELETE', url);
        xhr.send();
      });
    },
    makePOSTRequest(url, data) {
      return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest();
        } else {
          xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };
        xhr.onerror = function (err) {
          reject(err);
        };

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(data));
      });
    },
    toggleCartVisibility() {
      this.$refs.cart.toggleVisibility();
    },
    async buy(good) {
      await this.makePOSTRequest('/cart', good);
      cart.push(good);
    },
    deleteFromCart(index) {
      this.makeDELETERequest(`/cart/${index}`)
    }
  },
  computed: {
    isSearchActive() {
      return this.searchLine.length > 0;
    },
    filteredGoods() {
      const searchValue = this.searchLine.replace(/[\*]/gi, '');
      const regexp = new RegExp(searchValue, 'i');
      return this.goods.filter((good) => regexp.test(good.product_name));
    },
  },
  mounted() {
    Promise.all([
      this.makeGETRequest('/catalog'),
      this.makeGETRequest('/cart')
    ]).then(([catalogData, cartData])=> {
      this.goods = catalogData;
      cart.push(...cartData);
    }).catch(() => {
      this.setError('Товары не найдены');
    })
  }
});
