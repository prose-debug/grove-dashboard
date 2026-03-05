'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  metrics: Record<string, any>;
  relatedLearning: number;
  learningTitle: string;
  impact: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({ ...project });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      const response = await fetch('/api/admin/projects', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchProjects();
        setShowForm(false);
        setEditingId(null);
        setFormData(null);
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/admin/projects/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchProjects();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout currentPage="projects">
        <div className="text-center py-12">Loading projects...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="projects">
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Conservation Projects</h1>
            <p className="text-slate-600 text-sm mt-1">Manage your 6 conservation initiatives</p>
          </div>
          <button
            onClick={() => {
              setFormData({
                id: Math.max(...projects.map((p) => p.id), 0) + 1,
                title: '',
                description: '',
                status: 'active',
                metrics: {},
                relatedLearning: 0,
                learningTitle: '',
                impact: '',
              });
              setEditingId(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            + Add Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              {/* Title & Status */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-900">{project.title}</h3>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    project.status === 'thriving'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'recovering'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm mb-3 line-clamp-2">{project.description}</p>

              {/* Impact */}
              <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-4">
                <p className="text-xs text-blue-900">
                  <strong>Impact:</strong> {project.impact}
                </p>
              </div>

              {/* Learning Link */}
              <div className="text-xs text-slate-600 mb-4">
                <strong>Learning:</strong> #{project.relatedLearning} — {project.learningTitle}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Form Modal */}
        {showForm && formData && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId ? 'Edit Project' : 'New Project'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setFormData(null);
                  }}
                  className="text-2xl text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>active</option>
                    <option>thriving</option>
                    <option>recovering</option>
                    <option>expanding</option>
                    <option>ongoing</option>
                    <option>launching</option>
                  </select>
                </div>

                {/* Impact */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Impact Statement
                  </label>
                  <input
                    type="text"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Related Learning */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Related Learning Number
                  </label>
                  <input
                    type="number"
                    value={formData.relatedLearning}
                    onChange={(e) => setFormData({ ...formData, relatedLearning: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Learning Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Learning Title
                  </label>
                  <input
                    type="text"
                    value={formData.learningTitle}
                    onChange={(e) => setFormData({ ...formData, learningTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="p-6 border-t border-slate-200 flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setFormData(null);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Save Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
