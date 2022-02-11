import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router";

// 자동으로 import 하는 법!
const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};
export default Profile;


/**
 * Redirect
 * 위에 Route 들이 있으면 Redirect로 가라는 의미
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