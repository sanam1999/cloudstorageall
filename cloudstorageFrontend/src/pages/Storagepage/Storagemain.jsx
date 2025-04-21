import React ,{useEffect,useState}from "react";
import "./Storage.css";
import axios from "axios";
import File from "./File";
import { useNavigate } from "react-router-dom";
import PATHS from "../../constants/pathConstants";


const Storagemain = () => {
  const [data, setdata] = useState([])
  const navigate = useNavigate();
  const files = [
    { cloudname: "Desktop", _id :"sdkfjjjklfkjskljfjasd" },
    { cloudname: "Documents", _id :"sdkfjjjklfkjskljfjasd" },
    { cloudname: "Downloads", _id :"sdkfjjjklfkjskljfjasd" },
    { cloudname: "Movies", _id :"sdkfjjjklfkjskljfjasd" },
    { cloudname: "Music", _id :"sdkfjjjklfkjskljfjasd" },
    { cloudname: "Pictures", _id :"sdkfjjjklfkjskljfjasd" },
    { cloudname: "Public", _id :"sdkfjjjklfkjskljfjasd" },
    { cloudname: "reactfirst", _id :"sdkfjjjklfkjskljfjasd" },
    { cloudname: "temp", _id :"sdkfjjjklfkjskljfjasd" },
  ];


    useEffect(() => {
      axios
        .get("http://localhost:3001/folder", { withCredentials: true })
        .then((res) => {
          setdata(res.data);
        })
        .catch((err) => console.error("Error fetching user:", err));
    }, []);
    console.log(data)

  const getimages= (_id)=>{
    console.log(_id)
    navigate(`${PATHS.FILE}/${_id}`);
  }


  return (
    <div className="storage-container">
      <div className="file-list">
        {data?.map((file) => (
          <div key={file._id} className="file-item" onClick={()=>{getimages(file._id)}}>
            <span className="file-icon">📁</span>
            <span className="file-name">{file.cloudname}</span>
          </div>
        ))}
         <div  className="file-item" onClick={()=>{getimages("0000")}}>
            <span className="file-icon">📁</span>
            <span className="file-name">All</span>
          </div>
      </div>
    </div>
  );
};

export default Storagemain;
