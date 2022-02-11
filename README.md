# [Frontend Clone Coding] 트위터 클론 코딩

### 📌 Development Environment
React, Firebase
<img src="/Images/ReactPng.png" width="100px" height="100px"></img>
<img src="/Images/firebase.png" width="200px" height="100px"></img>

<br/>

### 📌 Technology Used
### `Login`
> ✏️ [Social Login (github, google)]()
> 소셜 아이디로 로그인 할 수 있습니다.

```javascript
const onSocialClick = async (e) => {
    const { target: { name } } = e;
    let provider;
    if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
}
```
<br/>

> ✏️ [Social Login (github, google)]()
> 유저가 존재하면 로그인, 존재하지 않으면 계정을 생성합니다.

```javascript
const onSubmit = async (e) => {
  e.preventDefault(); //새로고침을 방지한다.
  try {
      let data;
      if (newAccount) { //create account
          // createUserWithEmailAndPassword 는 Promise를 리턴하므로 비동기 await으로 받아줘야한다.
          await authService.createUserWithEmailAndPassword(email, password);
      } else { //log in
          await authService.signInWithEmailAndPassword(email, password);
      } // 사용자가 만들어지고 파이어베이스에 적혀있다.
  } catch (error) {
      setError(error.message);
  }
};
```
<br/>

> ✏️ [Confirm User]()
> 유저가 존재하면 로그인, 존재하지 않으면 계정을 생성합니다.

```javascript
const [init, setInit] = useState(false);
const [userObj, setUserObj] = useState(null);

useEffect(() => {
  // 사용자가 로그인 되어있는지 로그아웃 상태인지 확인해준다.
  authService.onAuthStateChanged((user) => {
    if (user) {
      setUserObj(user);
    }
    setInit(true); // setInit 이 false이면 로딩창을 띄운다.
  })
}, []); 

return (
  <>
    {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing ..."}
  </>
 );
```
<br/>
