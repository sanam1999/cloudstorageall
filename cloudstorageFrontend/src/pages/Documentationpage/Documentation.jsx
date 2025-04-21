import React from 'react';
import './Documentation.css'; // Import the CSS file

const Documentation = () => {
  return (
    <div className="documentation-container">
      <header className="headers">
        <h1 className="title">Documentation</h1>
      </header>

      <section className="step-container">
        <h2 className="step-title">Step 1: Clone the Repository</h2>
        <p className="step-description">
          Clone the repository using the following command:
        </p>
        <pre className="code-block">
          <code>git clone https://github.com/sanam1999/cloudesstorege.git</code>
        </pre>
      </section>

      <section className="step-container">
        <h2 className="step-title">Step 2: Locate the Configuration File</h2>
        <p className="step-description">
          Navigate to the <code>cloudesstorege</code> folder and find the <code>config</code> file.
        </p>
        <pre className="code-block">
          <code>
{`const config = {
  Secret: "Your secret key", // Your secret key
  Key: "Your API key",  // Your API key
  folder: "Your cloud name",
};

const params = {
  allowedFormats: ["png", "jpg", "jpeg"],
};

module.exports = { config, params };`}
          </code>
        </pre>
      </section>

      <section className="step-container">
        <h2 className="step-title">Step 3: Install Dependencies</h2>
        <p className="step-description">
          Install the required dependencies using npm:
        </p>
        <pre className="code-block">
          <code>npm install axios form-data multer</code>
        </pre>
      </section>

      <section className="step-container">
        <h2 className="step-title">Step 4: Upload Image</h2>
        <p className="step-description">Handle image uploads:</p>
        <pre className="code-block">
          <code>
{`const { uploadImageToStorage, upload } = require('./cloudesstorege/lib/api');

app.post('/uploadFile', upload.single('image'), async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ success: false, error: "No file uploaded" });
        }

        const data = await uploadImageToStorage(imageFile, 'image');
        return data.error 
            ? res.json({ success: false, error: data.error }) 
            : res.json({ success: true, data });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ success: false, error: 'Failed to process image' });
    }
});`}
          </code>
        </pre>
      </section>

      <section className="step-container">
        <h2 className="step-title">Step 5: Delete Image</h2>
        <p className="step-description">Handle image deletion:</p>
        <pre className="code-block">
          <code>
{`const { deleteImageformStorage } = require('./cloudesstorege/lib/api');

app.post('/deleteImage', async (req, res) => {
    console.log("Delete request received:", req.body);

    if (!req.body.url) {
        console.log("Error: URL missing in request");
        return res.status(400).json({ success: false, error: 'URL is required' });
    }

    try {
        const data = await deleteImageformStorage(req.body.url);
        console.log("Image deletion response:", data);
        return data.error 
            ? res.json({ success: false, error: data.error }) 
            : res.json({ success: true, data });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ success: false, error: 'Failed to delete image' });
    }
});`}
          </code>
        </pre>
      </section>

      <section className="step-container">
        <h2 className="step-title">Step 6: Use the Cloud Storage Package</h2>
        <p className="step-description">
          After setting up the server, you can start using the cloud storage package to upload and manage your files.
        </p>
      </section>
    </div>
  );
};

export default Documentation;
