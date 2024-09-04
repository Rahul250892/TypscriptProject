import React, { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface ValidationErrors {
    [key: string]: string[];
}

const Login: FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== "" && localStorage.getItem('token') !== null) {
            navigate("/dashboard");
        }
        console.log(localStorage.getItem('token'));
    }, []);

    const loginAction = (e: React.FormEvent<HTMLFormElement>): void => {
        setValidationErrors({});
        e.preventDefault();
        setIsSubmitting(true);
        const payload = {
            email: email,
            password: password,
        };
        axios.post('/api/login', payload)
            .then((r: AxiosResponse) => {
                setIsSubmitting(false);
                localStorage.setItem('token', r.data.token);
                navigate("/dashboard");
            })
            .catch((e) => {
                setIsSubmitting(false);
                if (e.response.data.errors !== undefined) {
                    setValidationErrors(e.response.data.errors);
                }
                if (e.response.data.error !== undefined) {
                    setValidationErrors(e.response.data.error);
                }
            });
    }

    return (
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Sign In</h5>
                            <form onSubmit={(e) => { loginAction(e) }}>
                                {Object.keys(validationErrors).length !== 0 &&
                                    <p className='text-center '><small className='text-danger'>Incorrect Email or Password</small></p>
                                }

                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label">Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block">Login</button>
                                    <p className="text-center">Don't have account? <Link to="/register">Register here</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;