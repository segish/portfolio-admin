import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';
import config from '../../../config';

const AddProject = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState({
        title: '',
        description: '',
        image: null,
        keyFeatures: [''],
        githubLink: '',
        demoLink: ''
    });
    const [loading, setLoading] = useState(false);
    const API_BASE_URL = config.API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', project.title);
        formData.append('description', project.description);
        formData.append('image', project.image);
        formData.append('keyFeatures', JSON.stringify(project.keyFeatures));
        formData.append('githubLink', project.githubLink);
        formData.append('demoLink', project.demoLink);

        try {
            await axios.post(`${API_BASE_URL}/api/projects`, formData);
            navigate('/admin/projects');
        } catch (error) {
            console.error('Error adding project:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-project">
            <div className="page-header">
                <h1>Add New Project</h1>
                <Link to="/admin/projects" className="btn-submit">Back to List</Link>
            </div>
            <form onSubmit={handleSubmit} className="project-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={project.title}
                        onChange={(e) => setProject({ ...project, title: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={project.description}
                        onChange={(e) => setProject({ ...project, description: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProject({ ...project, image: e.target.files[0] })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>GitHub Link</label>
                    <input
                        type="url"
                        value={project.githubLink}
                        onChange={(e) => setProject({ ...project, githubLink: e.target.value })}
                        placeholder="https://github.com/username/repo"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Demo Link</label>
                    <input
                        type="url"
                        value={project.demoLink}
                        onChange={(e) => setProject({ ...project, demoLink: e.target.value })}
                        placeholder="https://demo-site.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Key Features</label>
                    {project.keyFeatures.map((feature, index) => (
                        <div key={index} className="feature-input">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => {
                                    const newFeatures = [...project.keyFeatures];
                                    newFeatures[index] = e.target.value;
                                    setProject({ ...project, keyFeatures: newFeatures });
                                }}
                                placeholder="Enter feature"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const newFeatures = project.keyFeatures.filter((_, i) => i !== index);
                                    setProject({ ...project, keyFeatures: newFeatures });
                                }}
                                className="btn-remove"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setProject({
                            ...project,
                            keyFeatures: [...project.keyFeatures, '']
                        })}
                        className="btn-add-feature"
                    >
                        Add Feature
                    </button>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProject; 