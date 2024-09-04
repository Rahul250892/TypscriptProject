import React, { FC, useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout";

interface Project {
  name: string;
  description: string;
}

const ProjectShow: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project>({ name: '', description: '' });

  useEffect(() => {
    axios.get(`/api/projects/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Show Project</h2>
        <div className="card">
          <div className="card-header">
            <Link 
              className="btn btn-outline-info float-right"
              to="/"> View All Projects
            </Link>
          </div>
          <div className="card-body">
            <b className="text-muted">Name:</b>
            <p>{project.name}</p>
            <b className="text-muted">Description:</b>
            <p>{project.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectShow;