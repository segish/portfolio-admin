import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: null,
        keyFeatures: ['']
    });
    const [resumeFile, setResumeFile] = useState(null);
    const API_BASE_URL = 'http://localhost:5000';

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newProject.title);
        formData.append('description', newProject.description);
        formData.append('image', newProject.image);
        formData.append('keyFeatures', JSON.stringify(newProject.keyFeatures));

        try {
            await axios.post('http://localhost:5000/api/projects', formData);
            fetchProjects();
            setNewProject({ title: '', description: '', image: null, keyFeatures: [''] });
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleResumeUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', resumeFile);

        try {
            await axios.post('http://localhost:5000/api/resume', formData);
            setResumeFile(null);
            alert('Resume uploaded successfully!');
        } catch (error) {
            console.error('Error uploading resume:', error);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${id}`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>

            <section className="resume-section">
                <h2>Upload Resume</h2>
                <form onSubmit={handleResumeUpload}>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setResumeFile(e.target.files[0])}
                    />
                    <button type="submit">Upload Resume</button>
                </form>
            </section>

            <section className="projects-section">
                <h2>Add New Project</h2>
                <form onSubmit={handleProjectSubmit}>
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
                    />
                    {newProject.keyFeatures.map((feature, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Key Feature"
                                value={feature}
                                onChange={(e) => {
                                    const newFeatures = [...newProject.keyFeatures];
                                    newFeatures[index] = e.target.value;
                                    setNewProject({ ...newProject, keyFeatures: newFeatures });
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const newFeatures = newProject.keyFeatures.filter((_, i) => i !== index);
                                    setNewProject({ ...newProject, keyFeatures: newFeatures });
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setNewProject({
                            ...newProject,
                            keyFeatures: [...newProject.keyFeatures, '']
                        })}
                    >
                        Add Feature
                    </button>
                    <button type="submit">Add Project</button>
                </form>
            </section>

            <section className="projects-list">
                <h2>Existing Projects</h2>
                {projects.map(project => (
                    <div key={project._id} className="project-item">
                        <h3>{project.title}</h3>
                        <img
                            src={`${API_BASE_URL}/${project.image}`}
                            alt={project.title}
                            style={{ maxWidth: '200px' }}
                        />
                        <p>{project.description}</p>
                        <ul>
                            {project.keyFeatures.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default AdminPanel; 