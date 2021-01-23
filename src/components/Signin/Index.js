import Footer from "../Footer/Index";
import appStore from "../../assets/store.png";
import { useRef, useState } from "react";
import Signup from '../Signup/Index'
import axios from '../../utils/axios';
import Cookies from 'universal-cookie';
import { withRouter } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { connect } from "react-redux";
import { addUserData } from "../../redux/actions/userActions";

function Signin(props) {
    const cookies = new Cookies();
    
    let errorRef = useRef(null);

    const [isSignin, setIsSignin] = useState(true);
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    let login = (e) => {
        e.preventDefault();
        axios.post('api/v1/user/signin', {username, password}).then(res => {
            cookies.set('jwt', res.data.accessToken, {path: '/', maxAge: 24*60*60});
            let user = jwtDecode(res.data.accessToken);
            props.dispatchUserData(user);
            props.history.push('/');
        }).catch(err => {
            errorRef.current.innerHTML = err?.response?.data?.errorMsg ? err?.response?.data?.errorMsg: "";
        })
    }

    return (
        <>
        <div className="signup__div">
            <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                    alt="Instagram"
                    className="w-46 mx-auto mt-7 mb-3"
                />

            { isSignin ? 
            <div className="w-68 mx-auto mt-7">
                <form onSubmit={login}>
                    <input
                        type="text"
                        placeholder="Phone number, username, or email"
                        className="bg-insta-gray border border-insta-border-gray h-10 w-full mx-auto text-xs p-2 mb-1.5 rounded-sm outline-0"
                        value={username}
                        onChange={(e) => (setUsername(e.target.value))}
                        required
                    />
                    <input
                        placeholder="Password"
                        type="Password"
                        required
                        minLength="5"
                        maxLength="12"
                        className="bg-insta-gray border border-insta-border-gray h-10 w-full mx-auto text-xs p-2 mb-2 rounded-sm outline-0"
                        value={password}
                        onChange={(e)=>(setPassword(e.target.value))}
                    />
                    <div ref={errorRef} id="error" className="text-insta-redheart text-center text-xs overflow-hidden"></div>
                    <button className="bg-custom-blue text-white w-full text-sm h-7.5 mt-1 rounded">
                        Log In
                    </button>
                </form>
                <div className="flex flex-row my-4">
                    <div className="w-28 flex flex-col justify-center">
                        <hr />
                    </div>
                    <div className="text-insta-text-gray text-xs font-semibold flex-1 text-center">
                        OR
                    </div>
                    <div className="w-28 flex flex-col justify-center">
                        <hr />
                    </div>
                </div>
                <button className="text-insta-blue-facebook text-sm font-bold w-full mb-3">
                    <i className="fab fa-facebook-square text-lg"></i>
                    &nbsp;&nbsp;Log in with Facebook
                </button>
                <button className="text-insta-blue-facebook text-xs w-full mb-4">
                    Forgot password?
                </button>
            </div>
        : <Signup /> }
        </div>
        <div className="signup__div mt-2 p-3 text-center text-sm">
        {isSignin ?
        <p>
            Don't Have an account?{" "}
            <span
                className="text-custom-blue cursor-pointer"
                onClick={() => (setIsSignin(false))}
            >
                Sign up
            </span> 
        </p> : 
        <p>
            Have an account?{" "}
            <span
            className="text-custom-blue cursor-pointer"
            onClick={() => (setIsSignin(true))}
        >
            Log in
        </span>
        </p>
        }
    </div>
    <div className="signup__div bg-transparent border-0 mt-2 text-center p-2">
        <div>Get the app.</div>
        <img
            className="w-72 mx-auto"
            src={appStore}
            alt="get on store"
        />
    </div>
    <Footer />
    </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUserData: (user) => {dispatch(addUserData(user))}
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Signin));
