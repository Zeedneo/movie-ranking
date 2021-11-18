import login from '../login/login.css';
import { useState } from 'react';
import axios from 'axios';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function SubmitLogin() {
        // console.log(username);
        // console.log(password);

        axios.post('http://05ba-2001-fb1-1-5392-3509-e6e4-83a4-ca4b.ap.ngrok.io/login', {
            username: username , password: password
        })
            .then (function (response) {
                console.log(response.data.Response);
                console.log(response.data.status);
                console.log(response.data.username);
            })
    }


    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100 width-50">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png" className="img-fluid"
                            alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            {/* <!-- Email input --> */}
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    onChange={event => {
                                        // console.log("Username", event.target.value);
                                        setUsername(event.target.value);
                                        // console.log("name", name);
                                    }}
                                />
                                <label className="form-label" for="form3Example3">Username</label>
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="form3Example4"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    onChange={event => {
                                        // console.log("Password", event.target.value);
                                        setPassword(event.target.value);
                                        // console.log("name", name);
                                    }}
                                />
                                <label className="form-label" for="form3Example4">Password</label>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: "2.5rem" }, { paddingight: "2.5rem" }}
                                    onClick={SubmitLogin}
                                >Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                                    className="link-danger">Register</a></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Login;