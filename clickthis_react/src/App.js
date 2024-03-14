//////////////////
// package.json 에서 scripts에서 "start": "PORT=3002 react-scripts start",
// PORT 3002에서 열림
/////////////////

import React, { useEffect, useState } from 'react';
import './App.css'; // App, AppText

function App() {

// 누를 때 POST요청 보내는 함수
const postCount = () => {
  //fetch
  fetch('http://127.0.0.1:8002/count_click/click/', {
    method: 'POST', // POST요청 명시
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({}), //빈 Body
  }) //여기까지 fetch
  //then => response
  .then(response => response.json()) //응답 json으로 파싱
  // then=> data
  .then(data => {
    console.log('POST request succeeded:', data);
    setCount(data.count_id);
  })
  .catch(error => {
    console.error('POST request failed:', error);
    setCount('Error'); // 에러 발생 setCount('Error')
  });
}


// click this ! 색 변경 state, handlers
  const [clickThisColor, setClickThisColor] = useState('#FFFFFF'); 
  const handleClickThisDown = () => {
    setClickThisColor("#222222")
    postCount(); // 완료 !
  };
  const handleClickThisUp = () => {
    setClickThisColor('#FFFFFF')
  }

// count state
const [count, setCount] = useState(0);

// 페이지 로드될 때 count 불러오는 Effect
// Django API TEST Successed !
// 그러나 첫 번째 실패 => Django CORS ?
// 맞음 ! => 장고 CORS 수정/ 장고 서버는 8002번 포트에서 열림/ React App은 3002번 포트에서 열리게끔
useEffect(() => { 
  fetch('http://127.0.0.1:8002/count_click/click/') // 어차피 React App, Django Server 같은 VM, 루프백 서버로 사용 ~~~
    // try
    .then(response => response.json()) //json화
    .then(data => { 
      setCount(data.count_id); // count_id값으로 count state 설정
      console.log('GET request succeeded ! ');
      console.log(data);
    })
    // catch
    .catch(error => {
      console.log('GET request failed ... ');
      console.error('Error:', error);
      setCount('Error');
    })
  },[]) 


// 의존성 배열은 당연히 없음 <= 페이지가 로드될 때 실행되는 Effect를 의미

////////////////////////////////return part
  return (
    <div 
      className="App"
      style = {{
        flexDirection:'column'
      }}
    >
{/*click this !*/}
      <div 
        className='AppText'
        style={{
          color : clickThisColor,
          fontSize : 40
        }}
        onMouseDown = {handleClickThisDown}
        onMouseUp = {handleClickThisUp}
      >
        click this !
      </div>
{/*count !*/}
      <div 
        className="AppText"
        style = {{
          color : '#FFFFFF',
          fontSize : 30,
          marginTop:20
        }}
      >
        {count}
      </div>
    </div>
  );
}

export default App;
