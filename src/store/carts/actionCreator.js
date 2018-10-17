import {
    ADD_TO_CART,
    REMOVE_GOODS_IN_CART,
    CHANGE_GOODS_QTY
} from './const'

function addToCart(goods){
    return {
        type: ADD_TO_CART,
        payload:goods
    }
}

function removeGoods(id){
    return {
        type: REMOVE_GOODS_IN_CART,
        payload:{
            id
        }
    }
}

function changeQty(id,qty){
    return {
        type: CHANGE_GOODS_QTY,
        payload:{
            id,
            qty
        }
    }
}

export{
    addToCart,
    removeGoods,
    changeQty
}