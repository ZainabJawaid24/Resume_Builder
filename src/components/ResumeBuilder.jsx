import React, { useState } from "react";
import jsPDF from "jspdf";

function ResumeBuilder() {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [resumes, setResumes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update resume
  const handleSave = () => {
    if (editingIndex !== null) {
      // Update existing
      const updatedResumes = [...resumes];
      updatedResumes[editingIndex] = formData;
      setResumes(updatedResumes);
      setEditingIndex(null);
    } else {
      // Add new
      setResumes([...resumes, formData]);
    }
    setFormData(initialForm);
  };

  // Delete resume
  const handleDelete = (index) => {
    const updatedResumes = resumes.filter((_, i) => i !== index);
    setResumes(updatedResumes);
    // Reset form if deleting the one being edited
    if (editingIndex === index) {
      setFormData(initialForm);
      setEditingIndex(null);
    }
  };

  // Edit resume
  const handleEdit = (index) => {
    setFormData(resumes[index]);
    setEditingIndex(index);
  };

  // Download PDF
  const handleDownloadPDF = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Resume", 105, 10, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Name: ${data.name}`, 10, 30);
    doc.text(`Email: ${data.email}`, 10, 40);
    doc.text(`Phone: ${data.phone}`, 10, 50);
    doc.text(`Education: ${data.education}`, 10, 60);
    doc.text(`Experience: ${data.experience}`, 10, 70);
    doc.text(`Skills: ${data.skills}`, 10, 80);
    doc.save(`${data.name || "resume"}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Resume Builder</h1>

      {/* Form */}
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="education"
          placeholder="Education"
          value={formData.education}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => setFormData(initialForm)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {editingIndex !== null ? "Update Resume" : "Save Resume"}
          </button>
        </div>
      </div>

      {/* Saved Resumes */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Saved Resumes</h2>
        {resumes.length === 0 && <p>No resumes saved yet.</p>}
        <div className="space-y-4">
          {resumes.map((resume, index) => (
            <div
              key={index}
              className="p-4 border rounded bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p><strong>{resume.name}</strong></p>
                <p>{resume.email} | {resume.phone}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleDownloadPDF(resume)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
