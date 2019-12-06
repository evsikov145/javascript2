class GoodsItem {
    constructor(title = 'Без имени', price = '') {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item">
                    <img scr="foto.jpg" alt="фото">
                    <h3 class="title goods-title">${this.title}</h3>
                    <p>${this.price} ₽</p>
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
    amount() {
        var arr = this.goods;
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            var price = arr[i].price;
            sum += price;
        }
        console.log(sum);
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.amount();