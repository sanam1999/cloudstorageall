import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Api.css";
import Lodin from "../../components/Lodinpage/Lodin";

const Api = () => {
  const [showInput, setShowInput] = useState(false);
  const [showNewApi, setShowNewApi] = useState(false);
  const [cloudname, setCloudName] = useState("");
  const [error, setError] = useState("");
  const [newapi, setNewApi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allapi, setAllApi] = useState([]);

  const handleButtonClick = () => {
    setShowInput(!showInput);
    setShowNewApi(false);
  };

  const getApi = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/", { withCredentials: true });
      setAllApi(res.data);
    } catch (err) {
      console.error("Error fetching APIs:", err);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const deleteApi = async (_id) => {
    console.log("Deleting API with ID:", _id);
    setLoading(true);
    try {
      await axios.delete("http://localhost:3001/api/", {
        data: { _id },
        withCredentials: true,
      });
      getApi(); // Refresh the list after deletion
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = async () => {
    if (!cloudname.trim()) {
      setError("Cloud name cannot be empty!");

      return;
    }
    setShowInput(false)
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/generateapi",
        { cloudname },
        { withCredentials: true }
      );
      setNewApi(res.data);
      setShowNewApi(true);
      getApi();
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
      setCloudName("");
    }
  };

  return loading ? (
    <Lodin />
  ) : (
    <div className="container">
      {error && <p className="error">{error}</p>}

      <div className="addapikey">
        <button className="button" onClick={handleButtonClick}>
          Create API Key
        </button>

        {showInput && (
          <>
            <input
              type="text"
              placeholder="Enter New Cloud name"
              className="input"
              value={cloudname}
              onChange={(e) => setCloudName(e.target.value)}
            />
            <button className="button" onClick={generateApiKey}>
              Generate API Key
            </button>
          </>
        )}
      </div>

      {showNewApi && newapi && (
        <div className="mt-4 card">
          <h5>New API Key Details</h5>
          <p>
            <strong>Cloud Name:</strong> {newapi.cloudname}
          </p>
          <p>
            <strong>API Key:</strong> {newapi._id}
          </p>
          <p>
            <strong>API Secret:</strong> {newapi.secret}
          </p>
        </div>
      )}

      {allapi.length > 0 ? (
        <>
          <h3 className="mt-5">API</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Cloud Name</th>
                <th>API Key</th>
                <th>Secret</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>
              {allapi.map((api) => (
                <tr key={api._id}>
                  <td className="names">{api.cloudname}</td>
                  <td className="apikeys">{api._id}</td>
                  <td className="apikeys">{api.secret}</td>
                  <td className="names">
                    <button className="button button-danger" onClick={() => deleteApi(api._id)}>
                      Delete API
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No API keys found.</p>
      )}
    </div>
  );
};

export default Api;
