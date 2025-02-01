import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';
import config from '../../../config';

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const API_BASE_URL = config.API_BASE_URL;

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`${API_BASE_URL}/api/projects/${id}`);
                fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    return (
        <div className="projects-list">
            <div className="page-header">
                <h1>Projects</h1>
                <Link to="/admin/projects/add" className="btn-add">
                    <i className="fas fa-plus"></i> Add New Project
                </Link>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project._id}>
                                <td>
                                    <img
                                        src={`${API_BASE_URL}/${project.image}`}
                                        alt={project.title}
                                        className="project-thumbnail"
                                    />
                                </td>
                                <td>{project.title}</td>
                                <td>{project.description.substring(0, 100)}...</td>
                                <td>
                                    <div className="action-buttons">
                                        <Link
                                            to={`/admin/projects/${project._id}`}
                                            className="action-icon view-icon"
                                            title="View Details"
                                        >
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                        <Link
                                            to={`/admin/projects/edit/${project._id}`}
                                            className="action-icon edit-icon"
                                            title="Edit Project"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProject(project._id)}
                                            className="action-icon delete-icon"
                                            title="Delete Project"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectsList; 