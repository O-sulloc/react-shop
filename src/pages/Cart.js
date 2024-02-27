import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeUserName } from '../store.js'

const Cart = () => {
  let dispatch = useDispatch() // 디스패치? store.js에 요청을 보내주는 함수

  // 꺼내는 법
  let cart = useSelector((state) => { return state.cart })

  console.log("data", cart);

  return(
    <div>
      <Table> 
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>change</th>
          </tr>
        </thead>

        <tbody>
          {
            cart.map((item, i) => {
              return(
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  
                  <button onClick={() => {
                    // dispatch(changeUserName())
                  }}>add</button>
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