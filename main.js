const cart = [];

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
