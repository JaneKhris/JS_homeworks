const goods = [
    {
        id: 1,
        name: 'Ботинки',
        description: 'ботинки кожаные коричневые ',
        sizes: [39, 40, 41, 42, 43, 44],
        price: 400,
        available: true,
    },
    {
        id: 2,
        name: 'Сапоги',
        description: 'сапоги детские синие',
        sizes: [25, 26, 27],
        price: 300,
        available: true,
    },    
    {
        id: 3,
        name: 'Брюки',
        description: 'брюки серые прямые',
        sizes: [48, 50],
        price: 350,
        available: true,
    },    
    {
        id: 4,
        name: 'Свитер',
        description: 'свитер шерстяной белый',
        sizes: [42, 44, 46, 48],
        price: 420,
        available: true,
    },    
    {
        id: 5,
        name: 'Юбка',
        description: 'юбка джинсовая',
        sizes: [44, 46, 48, 50],
        price: 280,
        available: true,
    },
]

let basket = [
    {
        good: 1,
        amount: 1,
    },
    {
        good: 4,
        amount: 3,
    }
]

function add_good(goodId,goodAmount) {
    let counter = 0;
    for (let i=0; i<basket.length;i++) {
        if (goodId === basket[i].good) {
            basket[i].amount = basket[i].amount + goodAmount;
            break
        }
        else {
            counter++;
        }
    }
    if (counter === basket.length) {
        basket.push({
            good: goodId,
            amount: goodAmount,
        })
    }

}

function delete_good(goodId) {
    let length_start = basket.length
    for (let i=0; i<basket.length;i++) {
        if (goodId === basket[i].good) {
            basket.splice(i,1);
            break
        }
        }
    if (basket.length === length_start) {
        console.log('Товар с таким id отсутствует в корзине')
    }  
}

function clear_basket() {
    basket = [];
}

function total_basket(){
    let totalAmountBasket = 0;
    let totalSummBasket = 0;
    for (let i=0; i<basket.length;i++) {
        totalAmountBasket = totalAmountBasket+basket[i].amount;
        for (let k=0; k<goods.length; k++) {
            if (goods[k].id === basket[i].good) {
                totalSummBasket = totalSummBasket+basket[i].amount*goods[k].price;
                break
            }
        }
    };
    total = {
        totalAmount: totalAmountBasket,
        totalSumm: totalSummBasket,
        };
    return total

}

console.log(total_basket())
