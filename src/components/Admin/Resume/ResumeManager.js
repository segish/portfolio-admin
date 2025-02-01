import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Resume.css';
import config from '../../../config';

const ResumeManager = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const [currentResume, setCurrentResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_BASE_URL = config.API_BASE_URL;

    useEffect(() => {
        fetchCurrentResume();
    }, []);

    const fetchCurrentResume = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/resume`);
            setCurrentResume(response.data);
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    const handleResumeUpload = async (e) => {
        e.preventDefault();
        if (!resumeFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('resume', resumeFile);

        try {
            await axios.post(`${API_BASE_URL}/api/resume`, formData);
            setResumeFile(null);
            fetchCurrentResume();
            alert('Resume uploaded successfully!');
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert('Failed to upload resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-manager">
            <div className="page-header">
                <h1>Resume Management</h1>
            </div>
            <div className="resume-content">
                <form onSubmit={handleResumeUpload} className="resume-form">
                    <div className="form-group">
                        <label>Upload New Resume (PDF)</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setResumeFile(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading || !resumeFile}>
                        {loading ? 'Uploading...' : 'Upload Resume'}
                    </button>
                </form>

                {currentResume && (
                    <div className="current-resume">
                        <h2>Current Resume</h2>
                        <div className="resume-preview">
                            <p>File: {currentResume.file.split('/').pop()}</p>
                            <p>Last Updated: {new Date(currentResume.updatedAt).toLocaleDateString()}</p>
                            <a
                                href={`${API_BASE_URL}/${currentResume.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-view"
                            >
                                View Resume
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeManager; 