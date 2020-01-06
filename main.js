import {search} from './components/search.js';
import {cartContainer} from './components/cart.js';
import {item} from './components/item.js';
import {list} from './components/list.js';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    searchLine: '',
    error: '',
    cart: [],
    v_cart:false
  },
  template: `
    <div>
      <transition name="fade">
        <div class="notification error" v-if="error && error.length">
          {{ error }}
        </div>
      </transition>
      <header class="header">
        <div class="container">
          <search :search-line.sync="searchLine"></search>
          <button class="cart-button" @click="toggleCartVisibility">Корзина</button>
          <cart v-if="v_cart" @delete = 'deleteFromCart' :cart="cart"></cart>
        </div>
      </header>
      <main :class="{['search-active']: searchLine.length > 0}">
        <goods-list :goods="filteredGoods" @buy='buy'></goods-list>
      </main>
    </div>
  `,
  methods: {
    setError(e) {
      this.error = e.message || e;
      setTimeout(() => {
        this.error = '';
      }, 3500);
    },
    makeGETRequest(url) {
      const baseUrl = 'http://localhost:3000';
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

        xhr.open('GET', baseUrl + url);
        xhr.send();
      });
    },
    makeDELETERequest(url) {
      const baseUrl = 'http://localhost:3000';
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

        xhr.open('DELETE', baseUrl + url);
        xhr.send();
      });
    },
    makePOSTRequest(url, data) {
      const baseUrl = 'http://localhost:3000';
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

        xhr.open('POST', baseUrl + url);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(data));
      });
    },
    toggleCartVisibility() {
      this.v_cart = !this.v_cart;
    },
    async buy(good) {
      let cart = await this.makePOSTRequest('/cart', good);
      cart = JSON.parse(cart);

      this.cart = cart;
    },
    async deleteFromCart(index) {
        const cart = await this.makeDELETERequest(`/cart/${index}`);
        this.cart = JSON.parse(cart);
    }
  },
  beforeMount() {
    this.makeGETRequest('/cart')
      .then(data => {
        this.cart = data;
      })
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
