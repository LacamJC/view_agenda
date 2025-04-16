// src/ProfessionalColumn.js
import React from 'react';
import Appointment from './Appointment';
import './assets/css/ProfessionalColumn.css';

function ProfessionalColumn({ professionalName, appointments, timeSlots }) {
  return (
    <div className="professional-column">
      <div className="professional-header">{professionalName}</div>
      <div className="appointments-container">
        {appointments.map((appointment, index) => {
          // Encontra o índice do horário de início no array timeSlots
          const startIndex = timeSlots.indexOf(appointment.startTime);

          // Calcula o deslocamento vertical (top) e a altura do agendamento
          const top = startIndex * 30; // Cada slot tem 30px de altura
          const height = (appointment.duration / 30) * 30;

          return (
            <Appointment
              key={index}
              clientName={appointment.client}
              time={`${appointment.startTime} - ${calculateEndTime(appointment.startTime, appointment.duration)}`}
              style={{ top: `${top}px`, height: `${height}px` }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Função auxiliar para calcular o horário de fim
function calculateEndTime(startTime, duration) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

export default ProfessionalColumn;