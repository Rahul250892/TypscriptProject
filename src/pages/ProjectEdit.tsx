import React, { useState, useEffect, FC } from 'react';
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from "../components/Layout";

const ProjectEdit: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
        .then((response) => {
            const project: { name: string; description: string } = response.data;
            setName(project.name);
            setDescription(project.description);
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                showConfirmButton: false,
                timer: 1500
            });
        });
    }, [id]);

    const handleSave = (): void => {
        setIsSaving(true);
        axios.patch(`/api/projects/${id}`, {
            name: name,
            description: description
        })
        .then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Project updated successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            setIsSaving(false);
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                showConfirmButton: false,
                timer: 1500
            });
            setIsSaving(false);
        });
    };

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    onChange={(event) => { setName(event.target.value); }}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea 
                                    value={description}
                                    onChange={(event) => { setDescription(event.target.value); }}
                                    className="form-control"
                                    id="description"
                                    rows={3}
                                    name="description"></textarea>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjectEdit;