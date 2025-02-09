import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';
import config from '../../../config';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const API_BASE_URL = config.API_BASE_URL;

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/projects/${id}`);
            setProject(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    if (!project) return <div>Loading...</div>;

    return (
        <div className="project-details">
            <div className="page-header">
                <h1>Project Details</h1>
                <Link to="/admin/projects" className="btn-submit">Back to List</Link>
            </div>
            <div className="project-info">
                <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                />
                <h2>{project.title}</h2>
                <p className="description">{project.description}</p>
                <div className="project-links">
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-link github-link"
                    >
                        <i className="fab fa-github"></i> View on GitHub
                    </a>
                    <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-link demo-link"
                    >
                        <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                </div>
                <div className="key-features">
                    <h3>Key Features</h3>
                    <ul>
                        {project.keyFeatures.map((feature, index) => (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <i className="fas fa-check" style={{ color: 'blue' }}></i><li key={index}>{feature}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails; 