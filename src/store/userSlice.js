import { createSlice } from "@reduxjs/toolkit";

// useState와 비슷한 용도
let user = createSlice({
  name: 'user',
  initialState: { name: 'kim', age: 99},

  // 값을 바꾸고 싶을 때는 reducers 안에 함수를 써주면 됨
  reducers: {
    changeUserName(state) {
      // return 'jh' + state
      state.name = 'park' // array/ojb의 경우, return 없이 직접 수정해도 state 변경됨.
    },
    changeAge(state, action) {
      state.age += action.payload;
    }
  }
})

// 다른 컴포넌트에서 쓰고 싶으면 이렇게 export 해줘야 함
export let { changeUserName, changeAge } = user.actions;

export default user