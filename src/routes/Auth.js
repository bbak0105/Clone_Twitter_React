import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

// 자동으로 import 하는 법! 안녕!!
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccoount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        //구조분해 -> e.target.name / e.target.value
        const { target: { name, value } } = e;
        if (name === "email") {
            setEmail(value) //this.setState({ email: e.target.value })
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault(); //새로고침을 방지한다.
        try {
            let data;
            if (newAccount) { //create account
                // createUserWithEmailAndPassword 는 Promise를 리턴하므로 비동기 await으로 받아줘야한다.
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            } else { //log in
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            } // 사용자가 만들어지고 파이어베이스에 적혀있다.
            console.log('data', data);
        } catch (error) {
            setError(error.message);
        }
    };
    // 그 값에 반대대는 것을 리턴할 거야!!!
    const toggleAccoount = () => setNewAccoount((prev) => !prev);
    // persistence 
    // 1. local : 브라우저를 닫더라도 사용자의 정보는 기억될 것이다.
    // 2. session : 탭이 열려있는 동안에는 사용자 정보를 기억하는 것을 의미한다.
    // 3. none : 유저를 기억하지 않는다.
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
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Sign In"}
                />
            </form>
            {error}
            <span onClick={toggleAccoount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}
export default Auth;