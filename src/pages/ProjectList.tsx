import React, { FC, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from "../components/Layout";

interface Project {
    id: number;
    name: string;
    description: string;
}

const ProjectList: FC = () => {
    const [projectList, setProjectList] = useState<Project[]>([]);

    useEffect(() => {
        fetchProjectList();
    }, []);

    const fetchProjectList = (): void => {
        axios.get('/api/projects')
            .then((response) => {
                setProjectList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id: number): void => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/projects/${id}`)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Project deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        fetchProjectList();
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occurred!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    };

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Project Manager</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/project/create">Create New Project
                        </Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th style={{width:'240px'}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectList.map((project: Project, key: number) => {
                                    return (
                                        <tr key={key}>
                                            <td>{project.name}</td>
                                            <td>{project.description}</td>
                                            <td>
                                                <Link
                                                    to={`/project/show/${project.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/project/edit/${project.id}`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjectList;