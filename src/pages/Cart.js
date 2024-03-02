import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeAge, changeUserName } from '../store/userSlice.js'
import { increase, increse, deleteCart } from '../store.js';

const Cart = () => {
  let dispatch = useDispatch() // 디스패치? store.js에 요청을 보내주는 함수

  // 꺼내는 법
  let cart = useSelector((state) => { return state.cart })
  let user = useSelector((state) => { return state.user })

  console.log("cart", cart);
  console.log("user", user);

  return(
    <div>
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