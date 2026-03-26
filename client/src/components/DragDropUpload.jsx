import React, { useCallback, useState } from 'react';

const DragDropUpload = ({ onFileSelect, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const validateFile = (file) => {
    setError('');
    if (!file) return false;

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    document.getElementById('file-upload').click();
  };

  const removeFile = (e) => {
    e.stopPropagation();
    onFileSelect(null);
  };

  return (
    <div className="upload-container" style={{ marginBottom: '24px' }}>
      <label className="detail-label" style={{ marginBottom: '8px', display: 'block' }}>
        Upload Resume (Required)
      </label>

      {!selectedFile ? (
        <div
          className={`drag-drop-zone glass ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          style={{
            border: `2px dashed ${isDragging ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`,
            padding: '32px',
            textAlign: 'center',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.02)'
          }}
        >
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <div style={{ fontSize: '2rem', marginBottom: '12px', opacity: 0.7 }}>📄</div>
          <p style={{ fontWeight: 600, marginBottom: '4px' }}>Click to upload or drag and drop</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            PDF or DOCX up to 5MB
          </p>
        </div>
      ) : (
        <div className="selected-file-card glass" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          background: 'rgba(34, 197, 94, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>📄</span>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{selectedFile.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Remove file"
          >
            ✕
          </button>
        </div>
      )}
      
      {error && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '8px' }}>{error}</p>}
    </div>
  );
};

export default DragDropUpload;
