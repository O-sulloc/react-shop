import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeAge, changeUserName } from '../store/userSlice.js'
import { increase, increse, deleteCart } from '../store.js';
import { memo, useEffect, useMemo, useState } from 'react';

// memo로 감싸면 전달된 Pros가 변경됐을 때만 재렌더링 된다.
// memo를 사용하면 컴포넌트의 렌더링 성능을 최적화할 수 있으며, 불필요한 재랜더링을 방지하여 애플리케이션의 성능을 향상시킬 수 있다. 
// 특히, 컴포넌트의 렌더링이 자주 발생하고, 이에 따른 성능 문제가 발생할 수 있는 경우에 memo를 사용하여 최적화할 수 있다.

// memo는 렌더링된 결과를 기억하고, 다음 렌더링 시에 이전 props와 새로운 props를 비교하여 변경 여부를 판단한다. 
// 이는 불필요한 렌더링을 방지하고 성능을 최적화하는데 도움이 된다.
// 그러나 이 과정에서 비교 연산이 발생하므로, 렌더링이 자주 발생하거나 props가 복잡한 경우에는 비효율적일 수 있음. 
// 특히 객체나 배열과 같은 복합 데이터 타입을 포함하는 경우에는 깊은 비교(deep comparison)를 수행해야 하기 때문에 성능 저하의 원인이 될 수 있음.
// 이러한 상황에서는 memo를 사용하는 대신, React의 useMemo 훅이나 다른 성능 최적화 기법을 고려할 수 있다. 
// 예를 들어, useMemo 훅을 사용하여 복잡한 계산을 한 번만 수행하고, 결과를 재사용하는 방식으로 성능을 향상시킬 수 잇음.
const Child = memo(() => {
  console.log('차일드도 재렌더링됨')
  return(
    <div>
      자식
    </div>
  )
})

const someFunc = () => {
  console.log('엄청 복잡한 작업 실행하는 함수. 막 반복문 천억번 돌리고')
  return '';
}

const Cart = () => {
  // let result = someFunc(); // 이렇게 쓰면 재렌더링될 때마다 계속 somefunc 함수가 실행됨. 너무 별로인듯
  // let result = useMemo(() => { return someFunc(), []} // 이렇게하면 컴포넌트 첫 렌더링 시 1회만 수행됨!
  // 여기도 마찬가지로 의존성 배열 있음. 의존성 배열 값 달라질 때마다 someFunc 실행되게 할 수도 있음.
  // useEffect랑 똑같은거 아님?? 맞음 근데 실행 시점이 다름. useEffect는 컴포넌트가 렌더링된 후에 실행 vs useMemo는 렌더링되면서 같이 실행된다. 

  let [test, setTest] = useState(0)

  let dispatch = useDispatch() // 디스패치? store.js에 요청을 보내주는 함수

  // 꺼내는 법
  let cart = useSelector((state) => { return state.cart })
  let user = useSelector((state) => { return state.user })

  console.log("cart", cart);
  console.log("user", user);

  return(
    <div>
      <Child props={test}></Child>
      <button onClick={() => { setTest(test+1) }}>button</button>

      <h3>{user.name} {user.age}의 장바구니</h3>
      <button onClick={() => dispatch(changeUserName()) }>nameBtn</button>
      <button onClick={() => dispatch(changeAge(10)) }>ageBtn</button>
      
      <Table> 
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>change</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          {
            cart.map((item, i) => {
              return(
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  
                  <td>
                    <button 
                      onClick={() => {
                        console.log(item.id);
                        dispatch(increase(item.id))
                      }}
                    >
                      add
                    </button>
                  </td>
                  
                  <td>
                    <button onClick={() => { 
                      console.log(item.id)
                      dispatch(deleteCart(item.id))
                    }}> 
                      delete
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}


export default Cart;