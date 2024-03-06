import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet, json } from 'react-router-dom'
import Detail from './pages/detail.js'
import axios from 'axios';
import Cart from './pages/Cart.js'
import { useQuery } from 'react-query';

// context API 사용해보기
// 1. createContext() 생성해서 context에 넣기 (context가 먼디 -> state 보관함)
export let Context1 = createContext()
// 2. <context1>로 원하는 컴포넌트 감싸기 -> <detail> 컴포넌트 감쌌지롱

function App() {

  // ajax 요청할 때
  // axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
  //   return a.data
  // })
  // 이렇게 해도 되는데 아래처럼 react-query로 감싸면 좋은 이유
  // 1. 성공/실패/로딩중인지 쉽게 알 수 있음 (data.isError, data.isLoading 등)
  // 2. 틈만나면 자동으로 저 Url로 계속 요청 보냄 -> 최신 데이터 계속 받아올 수 있음 (전문용어로 refetch) (staleTime으로 refetch 간격도 조절할 수 있음. refetch 끌 수도 잇음)
  // 3. 실패해도 자동으로 retry 함. 다시 요청 보내줌. 
  // 4. 값을 공유하고 싶을 때 state나 props 안 써줘도 됨. 똑같은 useQuery 복붙해도 됨. 
  // -> 그럼 똑같은 요청을 두 번이나 보내는데 완전 비효율 아님? ㅇㅇ 아님 리액트는 한 번만 처리한다고 하네요... ㄷㄷ 레전드 고능해
  // 5. ajax 결과를 캐싱한다. 똑같은 요청이 들어오면, 일단 그 전에 실행했던 걸 불러와서 먼저 보여주고!! 그 다음에 그 요청을 수행한다고 함... (일단 결과를 빨리 볼 수 있어서 좋은듯)

  // 중괄호랑 return 생략도 가능
  let result = useQuery('call', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청함')
      return a.data
    })
  })

  // localStorage에 최근 본 상품 저장해보기
  useEffect(() => {
    let data = localStorage.getItem('watched')
    if (!data) {
      localStorage.setItem('watched',JSON.stringify([]))
    }
  }, [])

  let obj = { name: 'kim' }
  JSON.stringify(obj); // 배열,객체를 JSON으로 변환해줌
  localStorage.setItem('data', JSON.stringify(obj))
  let d = localStorage.getItem('data')
  JSON.parse(d) // json을 객체로 변환
  console.log(JSON.parse(d))
  console.log(JSON.parse(d).name)

  let [stock] = useState([10, 20, 30]);

  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(2);
  let [show, setShow] = useState(false);
  let navigate = useNavigate(); // hook(유용한 정보들이 들어있는 함수)
  // useNavigate()는 페이지 이동을 도와준다.

  return (
    <div className='App'>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Hyeon's Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ (navigate('/')) }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/event') }}>Event</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {/* { result.isLoading ? 'loding...' : result.data.name } */}
            {/* 삼항 연산자 말고 아래처럼 써도 굳 */}
            { result.isLoading && 'loding...'}
            { result.isError && 'error!!!'}
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        {/* 내 페이지들 */}
        <Route path="/" element={
          <>
            <div className='main-bg'>
              {/* css 말고 html에서 사진 넣고 싶으면
                  1. 우선 사진 import 해와야 됨
                  2. 그리고 backgroundImage 스타일 코드에 넣는다
              */}
              {/* 문자열 안에 변수 넣고 싶으면 '+ 변수명 +' 입력 (플러스 기호랑 따옴표) */}
            </div>

            <div className='container'>
              <div className='row'>
                {
                  shoes.map((shoe, i) => {
                    return (
                      <List shoe={shoe} i={i}/>
                    )
                  })
                }
              </div>
            </div>

            {
              show ? <Loading /> : null
            }

            {/* 버튼 누르면 ajax 요청 가도록 
                사용 방법 대표적으로 3가지 정도
                1. XMLHttpRequest (old)
                2. fetch()
                3. axios 라이브러리
            */}
            {
              count > 3 ? null : 
              <button onClick={() => {
                setShow(true)
                setCount(count+1)
                console.log(`https://codingapple1.github.io/shop/data${count}.json`);
                axios.get(`https://codingapple1.github.io/shop/data${count}.json`)
                // .then(({ data }) => { setShoes(shoes.concat(data)) }) // result : [{ id:4, name:asdf }, {}, {}]
                // concat: 기존 신발 배열과 새로운 데이터를 합친 새로운 배열을 만든다

                .then(({ data }) => { 
                  setShow(false)
                  setShoes([...shoes, ...data])
                })
                // 구조분해할당으로 result.data에서 data만 뽑아 -> 스프레드 문법 ... 사용하면 [{}, {}, {}] 에서 껍데기 벗겨지고 {},{} 만 남음
                // 풀어서 써보면 let copy = [...shoes, ...data]
                // setShoes(copy) 이 두 과정임
                .catch(() => {
                  setShow(false)
                  console.log('fail!!!')
                }) // 예외 처리

                /*
                // 이렇게 한번에 여러개 url로도 요청 가능
                Promise.all([
                  axios.get(),
                  axios.get()
                ])
                */

                /**
                 * // axios말고 js 기본 라이브러리인 fetch 사용할 수도 있는데
                 * 이 경우에는 json을 array/object로 변환해주는 작업을 개발자가 직접해줘야 함.
                 * fetch('url')
                 *  .then( result => result.json() )
                 *  .then(data => {})
                 */
              }}>더보기</button>
            }
          </>
        } /> 
        <Route 
          path="/detail/:id" 
          element={ 
            // 공유하고 싶은 데이터들을 value 안에 넣는다
            <Context1.Provider value={{ stock, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          } 
        /> 
        {/* 목록에서 상품 누르면 각 상품에 해당하는 디테일 페이지 나와야 되는데
            그거 어떻게 나오게 할 것임? 디테일 라우터를 계속 만들어 줄 것임?? 그럼 상품 백 개면 라우터도 100개? 절대 ㄴㄴ
            그럼 반복문으로 감싸서..?? 반복적으로 나오게..?? 그것도 좀 ㄴㄴ인듯..
            url에 파라미터 줘서 0번째 신발 제목 클릭하면 -> 해당 상품의 디테일 페이지 가도록 설정 가능
         */}
        {/* url 파라미터는 -> /:id 이런 식으로 줄 수 있다 */}
        <Route path="/about" element={ <About/> } > 
          <Route path="member" element={<div>member!!!</div>} /> 
          <Route path="location" element={<div>서울특별시</div>} /> 
          {/* Nested Route란???
            1. Route 안에 Route 넣으면 /about/member로 바로 연결됨 
            2. 부모(about) 내용과 자식(member) 내용이 같이 보임 (outlet 사용)
            */}
        </Route>
        <Route path='/event' element={ <Event/> }>
            <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>없는페이지</div>} /> {/* 404 만들기 */}
        <Route path="/cart" element={ <Cart/> } />
      </Routes>

    </div>
  );
}

const Event = () => {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet> {/* member나 location 등 nested Route의 element가 여기에 보인다 */}
    </div>
  )
}

const List = (props) => {
  console.log(props)
  return (
    <div className='col-md-4'>
      <a href={`/detail/${props.shoe.id}`}>
        <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="80%" />
        <h4>{props.shoe.title}</h4>
        <p>{props.shoe.price}</p>
      </a>
    </div>
  )
}

const Loading = (props) => {
  return(
    <div>
      <span>loading...</span>
    </div>
  )
}

export default App;
