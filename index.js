const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Jacket', price: 250},
    {title: 'Shoes', price: 350},
    {title: 'Hat', price: 450},
    {title: 'Coat', price: 550},
    {title: 'T-shirt', price: 650},
    {title: 'Shorts', price: 750},
    {title: 'Glasses', price: 850}
];

/*const renderGoodsItem = (title = "наименование товара отсутствует", price = "цена товара отсутствует") => {
    return `<div class="list-item"><img src="foto.jpg"><h3>${title}</h3><p>${price}</p></div>`
};*/

const renderGoodsList = (list = "список товаров отсутствует") => {
    const goodsList = list.map(item => {return `<div class="list-item"><img src="foto.jpg"><h3>${item.title}</h3><p>${item.price}</p></div>`});
    document.querySelector('.list').innerHTML = goodsList.join("");
};

renderGoodsList(goods);