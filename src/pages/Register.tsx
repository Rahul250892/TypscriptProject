import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

interface ValidationErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  [key: string]: string[] | undefined; // This allows for additional errors
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const registerAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };

    axios
      .post('/api/register', payload)
      .then((r) => {
        setIsSubmitting(false);
        localStorage.setItem('token', r.data.token);
        navigate('/dashboard');
      })
      .catch((e) => {
        setIsSubmitting(false);
        if (e.response?.data?.errors !== undefined) {
          setValidationErrors(e.response.data.errors);
        }
      });
  };

  return (
    <Layout>
      <div className="row justify-content-md-center mt-5">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Register</h5>
              <form onSubmit={registerAction}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {validationErrors.name && (
                    <div className="flex flex-col">
                      <small className="text-danger">{validationErrors.name[0]}</small>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {validationErrors.email && (
                    <div className="flex flex-col">
                      <small className="text-danger">{validationErrors.email[0]}</small>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {validationErrors.password && (
                    <div className="flex flex-col">
                      <small className="text-danger">{validationErrors.password[0]}</small>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm_password"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-block">
                    Register Now
                  </button>
                  <p className="text-center">
                    Have already an account? <Link to="/">Login here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
