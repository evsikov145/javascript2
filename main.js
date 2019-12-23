const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: false
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
    showCart(show) {
      if(show) {
        this.isVisibleCart = false;
      } else {
        this.isVisibleCart = true;
      }
    },
    filterGoods(searchLine) {
      var name = document.querySelectorAll('h3');
      name.forEach(element => {
        if(element.textContent != searchLine && searchLine.length > 0) {
          let parent = element.parentElement;
          parent.style.display = 'none';
        } else if (searchLine.length == 0) {
          let item = document.querySelectorAll('.goods-list');
          item.forEach(element => {
            element.style.display = 'flex';
          });
        }
      });
      
    }
  },
  async mounted() {
    try {
      this.goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
      this.filteredGoods = [...this.goods];
    } catch (e) {
      console.error(e);
    }
  },
  
});

