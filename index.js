class GoodsItem {
    constructor(title = 'Без имени', price = '') {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item">
                    <img class="goods__img" src="foto.jpg" alt="foto">
                    <h3 class="goods__title" class="title goods-title">${this.title}</h3>
                    <p class="goods__text">${this.price} ₽</p>
                    <button class="goods__button">Купить</button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods()  {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 350 },
            { title: 'Jacket', price: 450 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    amount() { // Метод подсчёта общей стоимости всех товаров
        var arr = this.goods;
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            var price = arr[i].price;
            sum += price;
        }
        console.log(sum);
    }
    buy() { // Метод перемещения купленных товаров ( заголовка и цена ) в корзину ! не доработан !
        for (var i = 0; i < this.goods.length; i++) {
            var btn = document.getElementsByClassName("goods-item")[i];
            btn.addEventListener('click', (event) => {
                let btn = event.target;
                var item = btn.parentElement;
                var children = item.children;
                var title = children[1];
                var price = children[2];
                var header = document.querySelector("header");
                header.innerHTML = `<div>${title}<br>${price}</div>`;
            });
        }
        
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.amount();
list.buy();

// Чат 

class Chat {
    constructor() {
        this.button = null;
        this.chatRoom = null;
        this.close = null;
    }
    init() {
        this.search();
        this.initEvents();
    }
    search() {
        this.button = document.querySelector(".chat-button");
        this.chatRoom = document.querySelector(".chat-room");
        this.close = document.querySelector(".chat-close");
    }
    initEvents() {
        this.button.addEventListener('click', () => {
            this.button.style.display = "none";
            this.chatRoom.style.display = "block";
        });
        this.close.addEventListener('click', () => {
            this.chatRoom.style.display = "none";
            this.button.style.display = "block";
        });
    }
}

const chat = new Chat;
chat.init();