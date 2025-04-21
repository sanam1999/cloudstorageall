import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Storage.css';
import axios from 'axios';

const File = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/folder/file?id=${id}`, { withCredentials: true })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.error('Error fetching user:', err));
    }
  }, [id]);

  const handleDelete = (fileId) => {
    if (fileId) {
      axios
        .delete(`http://localhost:3001/upload/image?id=${fileId}`, { withCredentials: true })
        .then((res) => {
          // Update state only after successful deletion
          setData(data.filter((file) => file._id !== fileId));
          setShowMenu(null);
        })
        .catch((err) => {
          console.error('Error deleting file:', err);
          // Optionally, you can revert the state or show an error message to the user
        });
    }
    console.log(fileId);
  };

  return (
    <>
      {data.length === 0 ? (
        <p className="empty">Empty folder</p>
      ) : (
        <>
          <div className="file-container">
            {data.map((file) => (
              <div key={file._id} className="file-item" onClick={() => setImage(file.url)}>
                <div className="smalimage">
                  <img src={file.url} alt={file.originalname} />
                </div>
                <div className="file-info">
                  <div className="file-name">{file.originalname}</div>
                  <div className="file-modified"> Last Modified: {new Date(file.updatedAt).toISOString().slice(0, 16).replace("T", " ")}</div>
                </div>
                <div className="file-actions">
                  {showMenu === file._id ? (
                    <button className="delete-button" onClick={() => handleDelete(file._id)}>
                      Delete
                    </button>
                  ) : (
                    <button className="menu-button" onClick={() => setShowMenu(file._id)}>
                      ...
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="imageview">
            {image && <img src={image} alt="Selected File" />}
          </div>
        </>
      )}

      
    </>
  );
};

export default File;