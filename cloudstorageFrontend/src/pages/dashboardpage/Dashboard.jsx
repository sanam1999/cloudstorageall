import React, { useState,useEffect } from 'react';
import './Dashnoard.css'
import PATHS from '../../constants/pathConstants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({user}) => {
  const navigate = useNavigate();

  const [data, setdata] = useState(null); 
  const [colors, setcolors] = useState("#1F7D53");
  const [dat, setdat] = useState(10);  
  const [totaldat , settotal] = useState(0)

  useEffect(() => {
    axios
      .get("http://localhost:3001/", { withCredentials: true })
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) =>  navigate(PATHS.LOGIN));
  }, []);

  useEffect(() => {
    if (data && data.data) {
      
      const totalsize = data.data.plan === "Free" ? 5120 *1024 :
        data.data.plan === "Premium" ? 51200 *1024 :
        data.data.plan === "Business" ? 204800 *1024:
        data.data.plan === "Enterprise" ? 1024000 *1024: 0;
        settotal(totalsize)
      if (totalsize > 0 && data.data.usedStorage !== undefined) {
      
        const storagePercentage = (data.data.usedStorage / totalsize) * 100;
        
       
        setcolors(storagePercentage <= 70 ? '#1F7D53' : storagePercentage <= 90 ? '#EB5B00' : '#E50046');
       
        setdat(storagePercentage);
      }
    }
  }, [data]); 

  if (!data) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Product Environment */}
        {data.length <=0 && 
        <div className="card">
          <h2 className="card-title">Product Environment</h2>
          {data.cloudnames?.map((cloudname, id) => (
            <div className="card-body" key={id}>
              <div className="eos">
                <span className="label">Cloud name</span>
                <span className="value">{cloudname}</span>
              </div>
              <div className="button-container">
                <button className="btn-primary" onClick={() => navigate(PATHS.API)}>Go to API Keys</button>
              </div>
              <hr className='hr' />
            </div>
          ))}
        </div>
        }

        {/* Plan Current Usage */}
        <div className="card">
          <h2 className="card-title">Plan Current Usage</h2>
          <div className="plan-container">
            {/* Credit Usage */}
            <div className="plan-box">
              <h3 className="plan-label">Total Credit Usage</h3>

              <div className='pragrass'>
                <div className="parsan" style={{ width: `${dat}%`, backgroundColor: colors }}></div>
              </div>
              <p className="plan-percentage"> {(data.data?.usedStorage / (1024*1024)).toFixed(2)} GB used/ {totaldat / 1024 / 1024} GB </p>
              {colors=="#E50046" ? <p className='storagelimit'>⚠️ Your storage limit is almost reached!</p>: ""}
            </div>
            {/* Plan Details */}
            <div className="plan-box plan-small">
              <h3 className="plan-label">{data.data?.plan}</h3>
              <button className="btn-primary" onClick={() => (window.location.href = PATHS.PLAN)}>Upgrade Plan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
