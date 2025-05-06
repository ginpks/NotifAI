import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './ClaimsAlert.css';

                        // func that opens notif and mark as read
export default function ClaimsAlert({selectNotifFunc}){
  const [queue,   setQueue]   = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const body = {
      most_recent_first: true,
      filters: {
        sent:   false,
        type:   'CLAIMS',
        read:   false,
        args:   { priority: 'HIGH_PRIORITY' }
      }
    };

    axios
      .post(
        'http://localhost:3000/notifications',  
        body,
        { withCredentials: true }
      )
      .then(res => {
        console.log('📬 fetched claims:', res.data.notifications);
        // the controller returns an array of objects { from, to, notification }
        const notes = res.data.notifications.map(n => ({
          id:   n.notification.id,
          args: n.notification.args
        }));
        setQueue(notes);
      })
      .catch(console.error);
  }, []);

   // whenever current is null and there’s still something in queue, show the next one
   useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
    }
  }, [queue, current]);

  useEffect(() => {
    if (current) {
      const timer = setTimeout(() => setCurrent(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [current]);

  // // 2) dequeue and show
  // useEffect(() => {
  //   if (!current && queue.length) {
  //     const next = queue[0];
  //     setCurrent(next);
  //     setQueue(q => q.slice(1));
  //     const t = setTimeout(() => dismiss(next.id), 10000);
  //     return () => clearTimeout(t);
  //   }
  // }, [queue, current]);

  // 3) dismiss & mark read
  const dismiss = (id) => {
    setCurrent(null);
    axios.post(`http://localhost:3000/notifications/claims/${id}/mark-read`, {}, { withCredentials: true })
      .catch(console.error);
  };

  const open = async (id) => {
    console.log('open', id); 
          
    try {
      // Getting Notification Wrapper for selecting and opening it
      const response = await axios.get("http://localhost:3000/notifications/" + id, { withCredentials: true }); // send cookies with request
      const notifWrapper = response.data;
      selectNotifFunc(notifWrapper);
      setCurrent(null);

    } catch (error) {
      console.error("Error with opening claims message:" + error);
    }
  }

  if (!current) return null;
  const { id, args } = current;

  return (
    <div className="claims-alert-container">
      <div className="claims-alert-header">
        <div>
          <h3 className="claims-alert-title">Claims Priority Message</h3>
          <span className="claims-alert-timestamp">Just now</span>
        </div>
        <button
          className="claims-alert-close-button"
          onClick={() => dismiss(id)}
        >
          ×
        </button>
      </div>
      <div className="claims-alert-content">
        <div className="claims-alert-icon-container">{/* bell SVG */}</div>
        <p className="claims-alert-message">{`Task: ${args.tasktype}`}</p>
        <p className="claims-alert-message">{`Due: ${new Date(
          args.duedate
        ).toLocaleString('en-US', {
      month: 'long',
      day:   'numeric',
      year:  'numeric',
    })}`}</p>
      </div>
      <button
        className="claims-alert-open-button"
        onClick={() => open(id)}
      >
        Open
      </button>
    </div>
  );
}
