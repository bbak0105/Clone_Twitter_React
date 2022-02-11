import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

// console.log(fbase);
//App.js에 login 했는지 안했는지 여부를 판단하는 변수를 가지고옴
/**
 * useEffect 
 * 1. 화면이 처음 떴을때 실행.
 * deps에 [] 빈배열을 넣을 떄.
 * life cycle중 componentDidmount처럼 실행
 * 2. 화면이 사라질때 실행(clean up함수).
 * componentWillUnmount처럼 실행
 * 3. deps에 넣은 파라미터값이 업데이트 됬을때 실행.
 * componentDidUpdate처럼 실행.
 */
function App() {
  // const auth = fbase.auth();
  // console.log(authService.currentUser); // null
  // => 너무 빨리 일어나서 계속 로그아웃 처리가 될 것이다.
  // => 조금 있다가 넣을 거다!
  // onAuthStateChanged : 사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시킨다.
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true); // 만약 init 이 false라면 router 를 숨길 거야!
    })
  }, []); // 빈 배열을 넣었으므로 componentDidMount 처럼 작동한다. 
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing ..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
