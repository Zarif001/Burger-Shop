const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 500,
        amount: 0,
        get Sum(){
            return  this.price * this.amount
        },
        get Kcall(){
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 800,
        amount: 0,
        get Sum(){
            return  this.price * this.amount
        },
        get Kcall(){
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1100,
        amount: 0,
        get Sum(){
            return  this.price * this.amount
        },
        get Kcall(){
            return this.kcall * this.amount
        }
    }    
}
const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной Майонез',
        price: 1000,
        kcall: 300
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 50
    },
    cheese:{
        name:'Сыр',
        price: 800,
        kcall:100
    }
}
const body = document.querySelector('body')
const spanTitle = document.querySelector('.header__title span')
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn')
btnPlusOrMinus.forEach(btn =>{
    btn.addEventListener('click', function(){
        plusOrMinus(this)
    })
})
function plusOrMinus(element) {
    /* 
    closest() - это метод обьекта. Который получает родителя 
    getAttribute() - который получает значение аттрибута у элемента с HTML 
    */
   const parent = element.closest('.main__product'),
       parentID = parent.getAttribute('id'),
       productAmount = parent.querySelector('.main__product-num'),
       price = parent.querySelector('.main__product-price span'),
       kcall = parent.querySelector('.main__product-kcall span '),
       elementAttribute = element.getAttribute('data-symbol');
       
       if(elementAttribute == '+'){
           product[parentID].amount++;
       } else if (elementAttribute == '-' && product[parentID].amount > 0){
           product[parentID].amount--;
       }
       productAmount.innerHTML = product[parentID].amount
       price.innerHTML = product[parentID].Sum
       kcall.innerHTML = product[parentID].Kcall
       
}
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox')
checkExtraProduct.forEach(checkbox =>{
  checkbox.addEventListener('click', function () {
    addExtraProduct(this)
      
  })  
})
function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
    parentId = parent.getAttribute('id'),
    price = parent.querySelector('.main__product-price span'),
    kcall = parent.querySelector('.main__product-kcall span'),
    elementAttr = element.getAttribute('data-extra')
    
    product[parentId][elementAttr] = element.checked;
    
    if(product[parentId][elementAttr] === true){
        product[parentId].price += extraProduct[elementAttr].price
        product[parentId].kcall += extraProduct[elementAttr].kcall
    } else{
        product[parentId].price -= extraProduct[elementAttr].price
        product[parentId].kcall -= extraProduct[elementAttr].kcall
    }
    price.innerHTML = product[parentId].Sum
    kcall.innerHTML = product[parentId].Kcall
}

const addCart = document.querySelector('.addCart'),
receipt = document.querySelector('.receipt')
receiptWindow = document.querySelector('.receipt__window'),
receiptWindowOut = document.querySelector('.receipt__window-out')

let arrProduct = [],
totalPrice = 0,
totalKcall = 0,
totalThing = '',
totalName = ''
addCart.addEventListener('click', function () {
    for(const key in product){
        if(product[key].amount > 0){
            arrProduct.push(product[key])
        } 
    }
    for(let value of arrProduct){
        totalPrice += value.price * value.amount
        totalKcall += value.kcall * value.amount
        totalName += '\n' + value.name + ': ' + value.amount + ' шт' + '\n'
        totalThing += '\n' + value.name + ' Стоит: ' + value.price  +'\n'

    }   
 
    receipt.classList.remove('active')
    receipt.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1
    `

    receiptWindow.style.cssText = `
    background: url('./images/burger.jpg') no-repeat center center/cover;
    border-radius: 10px;
    `
    document.body.style.overflow = 'hidden'
    receiptWindowOut.innerHTML = `Вы заказали: \n ${totalName}  ${totalThing} \n Общая каллория ${totalKcall} \n Общая сумма ${totalPrice} `
    
    if (totalName == 0 && totalKcall == 0 && totalPrice == 0) {
        alert('Вы ничего не закали')
        receipt.style.display = 'none'
        document.body.style.overflow= ''
    } 
})

const receiptBtn = document.querySelector('.receipt__window-btn'),
    receiptPay = document.querySelector('.receipt__pay'),
    header = document.querySelector('header'),
    main = document.querySelector('main')
    receiptBtn.addEventListener('click', function (e) {
    
    receiptPay.classList.add('active')
    receiptPay.style.cssText = `
    background: url('./images/burger.jpg') no-repeat center center/cover;
    border-radius: 10px;
    `
    receiptWindow.style.display = `none`
    header.style.display = `none`
    main.style.display = `none`

})
document.addEventListener('keydown', (e) =>{
    if(e.which === 27){
        receipt.style.display = `none`
        receipt.style.opacity = `0`
        location.reload()
    }
})

const view = document.querySelector('.view'),
productImges = document.querySelectorAll('.main__product-info'),
viewImg = view.querySelector('img'),
viewClose = view.querySelector('.view_close')
productImges.forEach(item =>{
    item.addEventListener('dblclick', function () {
        setImg(item)
    })
}) 

view.addEventListener('click', () =>{
    view.classList.remove('active')
})
function setImg(element) {
    let img  = element.querySelector('img')
     let getImg = img.getAttribute('src')
    viewImg.setAttribute ('src', getImg)
    
    view.classList.add('active')
}

