// src/Appointment.js
import React from 'react';
import './assets/css/Appointment.css'; // Criaremos este arquivo depois

function Appointment({ clientName, time }) {
  return (
    <div className="appointment">
      <div>{clientName}</div>
      <div className="appointment-time">{time}</div>
    </div>
  );
}

export default Appointment;