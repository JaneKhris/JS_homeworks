class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable() {
        this.available = !this.available
    }
}

class GoodList {
    #goods =[]
    constructor (filter, sortPrice, sortDir) {
        // this.goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;

    }
    get goods() {
        return this.#goods;
    }
    set goods(goods_list) {
        this.#goods = goods_list;
    }
    get list() {
        // let goods_filtred = this.#goods.filter((good) => !good.available);
        let goods_filtred = this.#goods.filter((good) => this.filter.test(good.name)).filter((good) => good.available);
        if (this.sortPrice) {
            if (this.sortDir) {
                goods_filtred.sort((a,b) => a.price-b.price);
            }
            else {
            goods_filtred.sort((a,b) => b.price-a.price);
             }
        }
        return goods_filtred
    }
    add(id, name, description, sizes, price, available) {
        let good_add = new Good(id, name, description, sizes, price, available);
        this.#goods.push(good_add)
    }
    remove(id) {
        this.#goods = this.#goods.filter((good) => good.id != id)
    }
}

class BasketGood extends Good {
    constructor (good, amount) {
        let id = good.id;
        let name = good.name;
        let description = good.description;
        let sizes = good.sizes;
        let price = good.price;
        let available = good.available;
        super (id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor (goods) {
        this.goods = goods;
    }
    get totalAmount() {
        return this.goods.reduce((total_amount,current_good) => total_amount+current_good.amount, 0);
    }
    get totalSum() {
        return this.goods.reduce((total_sum,current_good) => total_sum+current_good.price*current_good.amount, 0);
    }
    add(good, amount) {
        let counter = 0; 
        for(let i=0; i< this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                this.goods[i].amount += amount;
                break
                }
            counter+=1;
            }
        if (counter === this.goods.length) {
            let good_add_basket = new BasketGood(good,amount);
            this.goods.push(good_add_basket);
        }
    }
    remove(good,amount) {
        let counter = 0;
        let length_start = this.goods.length;
        for(let i=0; i< this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                this.goods[i].amount -= amount;
                if (this.goods[i].amount < 1) {
                    this.goods.splice(i,1)
                }
                break
                }
            counter+=1;
            }
        if (counter === length_start) {
            console.log('Товар отсутствует в корзине')
        } 
    }
    clear() {
        this.goods = [];
    }
    removeUnavailable() {
        this.goods = this.goods.filter((good) => good.available);
    }
}

good1 = new Good(1, 'a','aaa',[4,5],100,true)
good2 = new Good(2, 'b','bbb',[6,7],200,true)
good3 = new Good(3, 'c','ccc',[8,9],30,false)
good4 = new Good(4, 'd','ddd',[10,11],400,false)
good5 = new Good(5, 'e','eee',[12,13],500,true)

goods1 = [good1, good2, good3, good4, good5];

// console.log(goods1);
// console.log(good1.available)
// good3.setAvailable();
// good4.setAvailable();

// console.log(good1.available)
goodList1 = new GoodList(/\w/,false,false);
goodList1.goods = goods1;
// console.log('=====================');
// goodList1.add(6, 'e','eee',[12,13],800,true);
// goodList1.remove(4);
console.log(goodList1.list);
// console.log('=====================');

basketgood1 = new BasketGood(good2,5);
basketgood2 = new BasketGood(good3,4);
basketgood3 = new BasketGood(good4,7);

basket_goods = [basketgood1, basketgood2, basketgood3];
 
basket1 = new Basket(basket_goods);
console.log(basket1);
console.log(basket1.totalAmount);
console.log(basket1.totalSum);
// basket1.remove(good3,17);
basket1.removeUnavailable();
console.log('=====================');
console.log(basket1);
