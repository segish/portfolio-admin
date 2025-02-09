import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';
import config from '../../../config';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState({
        title: '',
        description: '',
        image: null,
        keyFeatures: [''],
        githubLink: '',
        demoLink: ''
    });
    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(false);
    const API_BASE_URL = config.API_BASE_URL;

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/projects/${id}`);
            const projectData = response.data;
            setProject({
                title: projectData.title,
                description: projectData.description,
                keyFeatures: projectData.keyFeatures,
                image: null,
                githubLink: projectData.githubLink,
                demoLink: projectData.demoLink
            });
            setCurrentImage(projectData.image);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProject({ ...project, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`${API_BASE_URL}/api/projects/${id}`, {
                title: project.title,
                description: project.description,
                image: project.image,
                keyFeatures: JSON.stringify(project.keyFeatures),
                githubLink: project.githubLink,
                demoLink: project.demoLink
            });
            navigate('/admin/projects');
        } catch (error) {
            console.error('Error updating project:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-project">
            <div className="page-header">
                <h1>Edit Project</h1>
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
                    <label>Current Image</label>
                    <img
                        src={currentImage || project.image}
                        alt="Current"
                        className="edit-project-image"
                    />
                    <label>Upload New Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {project.image && project.image !== currentImage && (
                        <img
                            src={project.image}
                            alt="Preview"
                            className="image-preview"
                            style={{ maxWidth: '200px', marginTop: '10px' }}
                        />
                    )}
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
                    <button type="button" className="btn-cancel" onClick={() => navigate('/admin/projects')}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProject; 