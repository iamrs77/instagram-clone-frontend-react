import FacebookIcon from "@material-ui/icons/Facebook";
import { useRef, useState } from "react";
import axios from '../../utils/axios';
import Cookies from 'universal-cookie';
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import { addUserData } from "../../redux/actions/userActions";

function Signup(props) {
    let cookies = new Cookies();

    let errorRef = useRef(null);

    let [formData, setFormData] = useState({
        email: '',
        fullname: '',
        username: '',
        password: ''
    })
    let signup = (e) => {
        e.preventDefault();
        let data = {
            email: formData.email,
            firstName: formData.fullname.substr(0,formData.fullname.indexOf(' ')),
            lastName: formData.fullname.substr(formData.fullname.indexOf(' ')+1),
            username: formData.username,
            password: formData.password,
            bio: ''
        }
        axios.post('api/v1/user/signup', {...data}).then(res => {
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
            <div>
                <h2 className="text-base text-center text-custom-light-gray font-bold">
                    Sign up to see photos and videos
                    from your friends.
                </h2>
                <div className="flex items-center justify-center bg-custom-blue text-white p-1 mt-3 rounded">
                    <FacebookIcon />
                    <span className="ml-1">
                        Login in with Facebook
                    </span>
                </div>
                <div className="flex items-center mt-5 mb-5">
                    <div className="relative flex-grow bg-custom-light-gray h-default"></div>
                    <div className="text-center w-14 text-sm text-custom-light-gray">
                        OR
                    </div>
                    <div className="relative flex-grow bg-custom-light-gray h-default"></div>
                </div>

                <form onSubmit={signup}>
                    <input
                        className="signup__input"
                        type="text"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={(e) => (setFormData({...formData, email: e.target.value}))}
                    />
                    <br />
                    <input
                        className="signup__input"
                        type="text"
                        placeholder="Full Name"
                        required
                        value={formData.fullname}
                        onChange={(e) => (setFormData({...formData, fullname: e.target.value}))}
                    />
                    <br />
                    <input
                        className="signup__input"
                        type="text"
                        placeholder="Username"
                        required
                        value={formData.username}
                        onChange={(e) => (setFormData({...formData, username: e.target.value}))}
                    />
                    <br />
                    <input
                        className="signup__input"
                        type="Password"
                        placeholder="Password"
                        minLength="5"
                        maxLength="12"
                        required
                        value={formData.password}
                        onChange={(e) => (setFormData({...formData, password: e.target.value}))}
                    />
                    <br />
                    <div ref={errorRef} id="error" className="text-insta-redheart text-center text-xs overflow-hidden"></div>
                    <button className="w-full bg-custom-blue text-white rounded p-1 mt-2">
                        Sign up
                    </button>
                </form>

                <p className="terms mt-3 mb-5 text-custom-light-gray font-light text-sm text-center">
                    By signing up, you agree to our
                    &nbsp;
                    <a
                        className="text-custom-dark-gray"
                        target="_blank"
                        rel="noreferrer"
                        href="https://help.instagram.com/581066165581870"
                    >
                        Terms
                    </a>
                    , &nbsp;
                    <a
                        className="text-custom-dark-gray"
                        target="_blank"
                        rel="noreferrer"
                        href="https://help.instagram.com/519522125107875"
                    >
                        Data Policy
                    </a>{" "}
                    and &nbsp;
                    <a
                        className="text-custom-dark-gray"
                        target="_blank"
                        href="/legal/cookies/"
                    >
                        Cookies Policy
                    </a>
                    .
                </p>
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUserData: (user) => {dispatch(addUserData(user))}
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Signup));
