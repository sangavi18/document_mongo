import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DocumentManager.css';

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [editingDocumentId, setEditingDocumentId] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      if (editingDocumentId) {
        await axios.put(`http://localhost:5050/api/documents/${editingDocumentId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setEditingDocumentId(null);
      } else {
        await axios.post('http://localhost:5050/api/documents/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchDocuments();
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/documents/${id}`);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleEdit = (document) => {
    setTitle(document.title);
    setDescription(document.description);
    setEditingDocumentId(document._id);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">{editingDocumentId ? 'Update Document' : 'Upload Document'}</button>
      </form>
      <h2>Documents</h2>
      <div className="card-list">
        {documents.map((doc) => (
          <div className="card" key={doc._id}>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
            <a href={`http://localhost:5050/${doc.file}`} target="_blank" rel="noopener noreferrer">View</a>
            <button onClick={() => handleDelete(doc._id)}>Delete</button>
            <button onClick={() => handleEdit(doc)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentManager;
