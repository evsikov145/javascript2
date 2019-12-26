const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const cart = [];

Vue.component('cart-component', { // корзина
  props: ['cartItem'],
  data() {
    return {
      isVisibleCart: false,
    }
  },
  template: `
  <div class = "cart-component" >
    <button class="cart-button"  @click='toggleCartVisibility'>Корзина</button>
    <div class="cart-container"  v-if="isVisibleCart">
    <p>{{name}}</p>
    </div>
  </div>
  `,
  methods: {
    toggleCartVisibility() {
      this.isVisibleCart = !this.isVisibleCart;
      this.$emit('input', this.isVisibleCart);
    },
    
    
  }, 
});

Vue.component('search-component', { // поиск
  
  data() {
    return {
      searchLine: ''
    }
  },
  template : `
  <form class="search-form" @submit.prevent="sendRequest">
    <input type="text" class="search-input" v-model.trim="searchLine"/>
  </form>
  `,
  methods: {
    sendRequest() {
      this.$emit('request',this.searchLine);
    }
  }
});

Vue.component('goods-item', { // продукт
  props: ['good'],
  template: `
    <div class="goods-item" >
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button class="goods-item__btn"type="submit" @click.prevent = "addCart">Купить</button>
    </div>
  `,
methods: {
  addCart() {
    this.$emit('add_name_product', this.good.product_name)
  }
}
});

Vue.component('goods-list', { // список продуктов
  props: ['goods'],
  computed: {
    isGoodsEmpty() {
      return this.goods.length === 0;
    }
  },
  template: `
    <div class="goods-list" v-if="!isGoodsEmpty">
      <goods-item v-for="good in goods" :good="good" :key="good.id_product" @add_name_product="addProduct"></goods-item>
    </div>
    <div class="not-found-items" v-else>
      <h2>Нет данных</h2>
    </div>
  `,
  addProduct(i) { // Добавление наименований в список товаров
    this.$emit('add_product_in_cart', i);
  },
});

const app = new Vue({ // глобальный родитель
  el: '#app',
  data: {
    goods: [],
    searchLine: '',
    isVisibleCart: false,
    cartItem: []
  },
  methods: {
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
    searchValues(i) {
      this.searchLine = i;
    },
    addInCart(i) {
      this.cartItem.push(i);
    }
    
  },
  computed: {
    filteredGoods() {
      const searchValue = this.searchLine.replace(/[\*]/gi, '');
      const regexp = new RegExp(searchValue, 'i');
      return this.goods.filter((good) => regexp.test(good.product_name));
    },
  },
  async mounted() {
    try {
      this.goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
    } catch (e) {
      console.error(e);
    }
  }
});
