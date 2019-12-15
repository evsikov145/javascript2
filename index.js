const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
function makeGETRequest(url, callback) {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
    } else {
        xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const body = JSON.parse(xhr.responseText);
            callback(body)
        }
    };
    xhr.open('GET', url);
    xhr.send();
}

class GoodsItem {
    constructor(title = 'Без имени', price = '') {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item">
                    <h3 class="title goods-title">${this.title}</h3>
                    <p>${this.price} ₽</p>
                    <button class = "goods-btn"> Купить </button>
                </div>`;
    }
}

class GoodsList { //2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины. (+)
    constructor() {
        this.goods = [];
        this.cartBtn = document.querySelector('.cart-button');
        this.cart = document.querySelector('.cart');
        this.head = document.querySelector('.header');
    }
    
    fetchGoods(cb)  {       //1. Переделайте makeGETRequest() так, чтобы она использовала промисы. (+) 
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => { 
            return new Promise ((resolve, reject) => {
                setTimeout(() => {
                    if(goods) {
                        this.goods = goods;
                        cb(goods);
                        resolve(cb);
                    } else {
                        reject('Error')
                    }
                }, 1000);
            });
            
        });
    }
    totalPrice() {
        return this.goods.reduce((accum, item) => {
            if (item.price) accum += item.price;
            return accum;
        }, 0);
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml; // отрисовка корзины (  внутри )
        var cart = document.createElement('div');
        cart.className = 'cart';
        document.querySelector('.header').append(cart); 
        var text = document.createElement('p'); // добавление p для опубликования кол-ва элементов в корзине
        text.classList = "cart-title";
        this.head.append(text);
    }
    showCart() {    // открытие корзины
        var cart = document.querySelector('.cart');
        this.cartBtn.addEventListener("click", function () {
            cart.classList.toggle('active');
        });
    }
    addItem() { // добавление в корзину
        var btn = document.querySelectorAll('.goods-btn');
        btn.forEach( (item) => {
            item.addEventListener("click", (e) => {
                    var btn = e.target;
                    var item = btn.parentNode;
                    var itemTitle = item.querySelectorAll('h3')[0].innerText;
                    
                    var itemPrice = item.querySelectorAll('p')[0].innerText;
                    var cell = `<div class="cart-cell">
                                ${itemTitle}
                                ${itemPrice}
                                </div>`;
                    document.querySelector('.cart').innerHTML += cell;
                    this.infoItem();
                    this.deleteItem();
                    });
                    
        });     
    }
    deleteItem(){       // удаление из корзины (по клику на продукте )
        var cell = document.querySelectorAll('.cart-cell');
            cell.forEach((item) => {
                item.addEventListener("click", (e) => {
                    var elem = e.target;
                    elem.remove();
                    this.infoItem();
                });
            });
        }
        
    infoItem() { // информация о содержимом в корзине
        var item = document.querySelectorAll('.cart-cell').length;
        var text = document.querySelector('.cart-title');
        if(item > 4) {
            text.innerText =`В корзине ${item} элементов`;
        } else if (item == 1) {
            text.innerText =`В корзине ${item} элемент`;
        } else if (item == 0 ){
            text.innerText =`В корзине ${item} элементов`;
        } else {
            text.innerText =`В корзине ${item} элемента`;
        }
        
    }

}

class Cart extends GoodsList {
    constructor(props) {
        super(props);
    }
    clean() {}
    incGood() {}
    decGood() {}
}

class CartItem extends GoodsItem {
    constructor(props) {
        super(props);
    }
    delete() {}
}

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
    list.addItem();
    list.showCart();
});
