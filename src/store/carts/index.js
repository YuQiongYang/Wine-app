import state from './state'

import {
    ADD_TO_CART,
    REMOVE_GOODS_IN_CART,
    CHANGE_GOODS_QTY
} from './const'

const reducer = (previousState = state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...previousState,
                data: [...previousState.data, action.payload]
            }

        case REMOVE_GOODS_IN_CART:
            return {
                ...previousState,
                data: state.data.filter(item => item.id != action.payload.id)
            }

        case CHANGE_GOODS_QTY:
            return {
                ...previousState,
                data: previousState.data.map(item => {
                    if (item.id === action.payload.id) {
                        item.qty = action.payload.qty
                    }
                })
            }

        default:
            return previousState
    }
}

export default reducer