import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

// eslint-disable-next-line import/no-anonymous-default-export
const AppRouter = ({ isLoggedIn, userObj }) => {
    console.log('isLoggedIn', isLoggedIn);
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        {/* <Redirect from="*" to="/" /> 
                        // useHistory 방법으로도 사용 가능! -> Profile.js 
                        */}
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                )}
            </Switch>
        </Router>
    )
}

/**
 * Redirect 
 * 위에 Route 들이 있으면 Redirect로 가라는 의미
 * => 새로 고침을 하면 다시 첫 번째 페이지로 돌아간다!
 * 그러나 버전이 업그레이드 되면서 버전 이슈가 발생함
 * 상위 버전에서는 작동이 안됨!!!!
 *  
 * Profile.js 에서 다음과 같이 사용하여 해결할 수 있음.
 * 
 * import { useNavigate } from "react-router-dom";
 *  const Profile = () => {
 *  const navigate = useNavigate();
 *  const onLogOutClick = () => {
 *  authService.signOut();
 *  navigate("/");
 * };
 */

export default AppRouter;