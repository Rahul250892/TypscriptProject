import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

interface User {
  name?: string;
  [key: string]: any;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    } else {
      getUser();
    }
  }, [navigate]);

  const getUser = () => {
    axios
      .get('/api/user', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .then((r) => {
        setUser(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logoutAction = () => {
    axios
      .post(
        '/api/logout',
        {},
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
      )
      .then(() => {
        localStorage.removeItem('token');
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Layout>
      <div className="row justify-content-md-center">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/dashboard">
                Dashboard
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/product">
                      Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/project">
                      ProjectList
                    </Link>
                  </li>
                </ul>
                <div className="d-flex">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <button
                        onClick={logoutAction}
                        className="btn btn-link nav-link"
                        aria-current="page"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <h2 className="text-center mt-5">Welcome, {user.name}!</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
