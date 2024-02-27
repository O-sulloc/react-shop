// 셋팅 1. store.js 파일 생성
// state들을 보관하는 장소

import { configureStore, createSlice } from "@reduxjs/toolkit"

// useState와 비슷한 용도
let user = createSlice({
  name: 'user',
  initialState: 'kjh',
  reducers: {
    change(state) {
      return 'kimmmm'
    }
  }
})

export let { change } = user.actions;

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
  ]
})

// 여기서 export하는 configureStore를 index.js가 씀
export default configureStore({
  reducer: { 
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer
  }
})