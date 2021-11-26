import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errorAlert1, setErrorAlert1] = useState(0);
    const [errorAlert2, setErrorAlert2] = useState(0);



    function SubmitRegister() {
        // console.log("กดแล้ว");

        if (password === rePassword) {
            setErrorAlert1(0);
            setErrorAlert2(0);
            axios.post('http://f07e-223-24-92-42.ap.ngrok.io/register', {
                username: username, password: password
            })
                .then(function (response) {
                    // console.log(response.data.Response);
                    // console.log(response.data.status);

                    if (response.data.Response === "True") {
                        navigate(`../login`, { replace: false })
                    }
                    if (response.data.Response === "False") {
                        setErrorAlert2(1);
                    }
                })
        }
        else {
            setErrorAlert1(1);
        }
    }


    return (
        <section className="vh-0">
            {
                errorAlert1
                    ? <div class="alert alert-warning" role="alert" data-mdb-color="warning">
                        Your password and confirmation password do not match.
                    </div>
                    : <div></div>
            }
            {
                errorAlert2
                    ? <div class="alert alert-warning" role="alert" data-mdb-color="warning">
                        That username has been taken.
                    </div>
                    : <div></div>
            }
            <div className="container h-10">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-10 col-xl-12">
                        <div className="cardRe text-black" style={{ borderRadius: "25px" }}>
                            <div className="cardRe-body p-md-12">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="username"
                                                        id="form3Example3c"
                                                        className="form-control"
                                                        onChange={event => {
                                                            // console.log("UserName", event.target.value);
                                                            setUsername(event.target.value);
                                                            // console.log("username", username);
                                                        }}
                                                    />
                                                    <label className="form-label" for="form3Example3c">Username</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                {/* <i className="fas fa-lock fa-lg me-3 fa-fw"></i> */}
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        id="form3Example4c"
                                                        className="form-control"
                                                        onChange={event => {
                                                            // console.log("Password", event.target.value);
                                                            setPassword(event.target.value);
                                                            // console.log("RePassword", this.Password);

                                                        }}
                                                    />
                                                    <label className="form-label" for="form3Example4c">Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                {/* <i className="fas fa-key fa-lg me-3 fa-fw"></i> */}
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        id="form3Example4cd"
                                                        className="form-control"
                                                        onChange={event => {
                                                            // console.log("RePassword", event.target.value);
                                                            setRePassword(event.target.value);
                                                            // console.log("RePassword", this.RePassword);
                                                        }}
                                                    />
                                                    <label className="form-label" for="form3Example4cd">Repeat your password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-lg"
                                                    onClick={SubmitRegister}
                                                >Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png" className="img-fluid" alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;