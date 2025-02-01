import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/Admin/Layout/AdminLayout';
import ProjectsList from './components/Admin/Projects/ProjectsList';
import AddProject from './components/Admin/Projects/AddProject';
import ProjectDetails from './components/Admin/Projects/ProjectDetails';
import ResumeManager from './components/Admin/Resume/ResumeManager';
import EditProject from './components/Admin/Projects/EditProject';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/projects" replace />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="projects" replace />} />
                    <Route path="projects" element={<ProjectsList />} />
                    <Route path="projects/add" element={<AddProject />} />
                    <Route path="projects/:id" element={<ProjectDetails />} />
                    <Route path="projects/edit/:id" element={<EditProject />} />
                    <Route path="resume" element={<ResumeManager />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App; 