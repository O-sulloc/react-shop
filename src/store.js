// 셋팅 1. store.js 파일 생성
// state들을 보관하는 장소

import { configureStore, createSlice } from "@reduxjs/toolkit"
import user from './store/userSlice.js'

let stock = createSlice({
  name: 'stock',
  initialState: [10,20,30]
})

let cart = createSlice({
  name: 'cart',
  initialState:
  [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers: {
    increase(state, action) {
      let item = state.find((item) => item.id === action.payload)
      item.count++;
    },
    addCart(state, action) {
      // state.unshift(action.payload) // bad
      // state.push(action.payload) //bad
      // 위 두 방식으로도 되긴하는데 이렇게 직접적으로 state 조작하지 말고 불변성을 지키라네..

      let findItem = state.find((i) => i.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        let { id, title } = action.payload;
        let item = { id, name: title, count: 1 }
  
        return [ ...state, item ] // 이렇게 복사해서 넣는게 good
      }

    },
    deleteCart(state, action) {
      return state.filter(item => item.id !== action.payload)
    }
  }
})

export let { increase, addCart, deleteCart } = cart.actions;

// 여기서 export하는 configureStore를 index.js가 씀
export default configureStore({
  reducer: { 
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer
  }
})