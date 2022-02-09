import React, { useState } from 'react';
import firebase from '../firebase';
import AppRouter from './Router';

console.log(firebase);

//App.js에 login 했는지 안했는지 여부를 판단하는 변수를 가지고옴
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <AppRouter isLoggedIn={isLoggedIn} />
  );
}

export default App;
