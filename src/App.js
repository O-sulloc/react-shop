import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/detail.js'

function App() {

  let [shoes] = useState(data);
  let navigate  =useNavigate(); // hook(유용한 정보들이 들어있는 함수)
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
          </>
        } /> 
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} /> 
        {/* 목록에서 상품 누르면 각 상품에 해당하는 디테일 페이지 나와야 되는데
            그거 어떻게 나오게 할 것임? 디테일 라우터를 계속 만들어 줄 것임?? 그럼 상품 백 개면 라우터도 100개? 절대 ㄴㄴ
            그럼 반복문으로 감싸서..?? 반복적으로 나오게..?? 그것도 좀 ㄴㄴ인듯..
            url에 파라미터 줘서 0번째 신발 제목 클릭하면 -> 해당 상품의 디테일 페이지 가도록 설정 가능
         */}
        {/* url 파라미터는 -> /:id 이런 식으로 줄 수 있다 */}
        <Route path="/about" element={<About/>} > 
          <Route path="member" element={<div>member!!!</div>} /> 
          <Route path="location" element={<div>서울특별시</div>} /> 
          {/* Nested Route란???
            1. Route 안에 Route 넣으면 /about/member로 바로 연결됨 
            2. 부모(about) 내용과 자식(member) 내용이 같이 보임 (outlet 사용)
            */}
        </Route>
        <Route path='/event' element={<Event/>}>
            <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>없는페이지</div>} /> {/* 404 만들기 */}
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
  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="80%" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </div>
  )
}

export default App;
