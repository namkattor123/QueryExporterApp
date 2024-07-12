import React, { useState } from 'react';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Alert, Space } from 'antd';
const { Dragger } = Upload;
const token = localStorage.getItem('token');
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const BulkImportForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () =>  {
    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('file', file);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const response = axios.post(apiBaseUrl + '/upload-yaml', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          // Add any other headers as needed
        },
    }).then(response => {
         alert('Bulk import successful');
         window.location.reload();
    }).catch(error => {
        console.error('Bulk import failed:', error);
        alert('Bulk import failed:');
        // Handle errors, display an error message to the user, etc.
      });
  };
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: apiBaseUrl + '/upload-yaml',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <div>
        <Dragger{...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
       </Dragger>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      </div>

  );
};

export default BulkImportForm;
