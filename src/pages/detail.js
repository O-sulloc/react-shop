import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// CSS-in-JS 자바스크립트 안에 css 코드 쓰기
// 기존에는 html, css, js는 각자 별도의 파일에 넣는 게 best practice로 여겨졌음.
// 최근에는 재활용 가능한 블록으로 분리하여 개발하는 '컴포넌트 기반 개발 방법'이 주류임
// 컴포넌트로 분리 -> 컴포넌트 안에 html, css, js 다 넣어서 코딩
// 장점 1. 페이지 로딩시간 단축 2.
// 단점 1. JS파일 복잡해짐 2. 다른파일에서 해당 css 쓰고 싶을 대..
// CSS-in-JS 라이브러리 중 가장 많이 쓰이는 Styled Components를 사용

// * css파일을 쓰고 싶으면?? detail.module.css로 작명하면 됨. 중간에 module

let YellowBtn = styled.button`
	background: ${ props => props.bg };
  // 노랑, 파랑, 검정 버튼 만들고 싶을 때마다 만드는 거 X
  // props로 받아오면 컴포넌트 재활용할 수 있다.
  color: ${ props => props.bg == 'blue' ? 'white' : 'black' };
  // 이렇게 조건문도 사용 가능
  padding: 10px;
`

// 옛날 방식으로 컴포넌트 만들기
class Detail2 extends React.Component {
  componentDidMount() {
    // 컴포넌트가 마운트될 때 실행되는 코드
  }
  componentDidUpdate() {

  }
  componentWillUnmount(){

  }
}

const Detail = (props) => {

  
  let [count, setCount] = useState(0);
  
	let { id } = useParams(); // 현재 url의 파라미터 가져오는 hook
	// ex: /detail/1 이면 1이 파라미터 detail은 pathname이다
	// pathname은 useLocation() hook을 사용하여 가져올 수 있다.
  
	let shoe = props.shoes.find(shoe => shoe.id == id);
  
  let [alert, setAlert] = useState(true);
  
  // mount, update시 아래 있는 코드가 실행됨.
  // useEffect 훅에 의존성 배열을 전달하지 않으면, 해당 effect가 매 렌더링 시마다 실행된다.
  // 즉, 의존성이 없어서 컴포넌트가 렌더링될 때마다 useEffect 함수가 실행됨
  useEffect(() => {
    console.log('asdfasdf');
    // 처음 페이지 띄워졌을 때도 콘솔 찍히고
    // setcount로 뭐 바꿔서 다시 렌더링 될 때도 콘솔 찍힘
    // 즉, useEffect 안에 있는 코드는 html 렌더링 후에 동작한다.
    // html 먼저 다 가져오고 오래걸리는 일은 여기에 적는 게 좋을듯
    // 오래걸리는 일 -> 어려운 연산, 서버에서 데이터 가져오는 작업, 타이머 장착 등

    // 타이머
    const timer = setTimeout(() => { console.log('타이머 시작'); setAlert(false) }, 2000)
    console.log('12341234');

    // useEffect 훅 사용시 클린업 함수를 반환할 수 있다. side effect로 인해 생성된 리소스를 정리하거나 해제하는 데 사용
    return () => {
      // useEffect 내 생성된 타이머는 컴포넌트가 언마운트되거나 업데이트되기 전에 제거되어야 한다. (memory leak 방지)
      console.log('컴포넌트가 언마운트되거나 업데이트되기 전에 타이머 정리하자');
      clearTimeout(timer);
    }
  }, [])
  // useEffect 훅의 두 번째 인수로 전달된 배열(count)은 의존성 배열(dependency array)라고 한다. (특정 값에 의존하여 실행 조건을 설정한다)
  // count의 값이 바뀔 때마다 'useEffect' 함수가 실행됨.
  // 즉, count 값이 바뀔 때마다 특정 작업을 수행하는 것임

  // 빈배열[]을 전달하면 useEffect는 한 번만 실행되고 그 이후에는 다시 실행되지 않음. 즉, 첫 렌더링될 때만 useEffect 함수 실행함
  // 여기서도 처음 렌더링할 때만 '123123' 찍히고 그 이후에는 한 번도 안 찍히는 걸 볼 수 있음
  // 이렇게 하는 게 맞는게.. 계속 123123 찍히면 곤란.. 이게 콘솔이 아니라 반복문 만 번 수행하는 거였으면.. 렌더링 될 때마다 반복문 수행한다는 건데 좀 에바인 것 같습니다.

	return (
		<div className="container">
      {/* <Alert alert={alert}/> */}
      {
        alert ? <Alert /> : null
      }
      {count}
      <button onClick={()=>{setCount(++count)}}>button</button>
			<div className="row">
				<div className="col-md-6">
				<img src={'https://codingapple1.github.io/shop/shoes'+ (shoe.id+1) +'.jpg'} width="80%" />
				</div>
				<div className="col-md-6">
					<h4 className="pt-5">{shoe.title}</h4>
					<p>{shoe.id}</p>
					<p>{shoe.content}</p>
					<p>{shoe.price}</p>
					<button className="btn btn-danger">주문하기</button>
				</div>
			</div>
		</div>
	)
}

const Alert = () => {
  return(
    <div className="alert alert-warning">
      2초 이내 구매시 할인
    </div>
  )
}

export default Detail;