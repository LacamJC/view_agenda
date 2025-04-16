// src/App.js
import React from 'react';
import ProfessionalColumn from './components/ProfessionalColumn';
import './App.css';
import TabelaDeDuasSemanas from './TabelaDeDuasSemanas';

function App() {
  const professionals = [
    {
      name: 'Beatriz',
      appointments: [
        { client: 'Cliente A', startTime: '13:00', duration: 60 }, // Duração em minutos
      ],
    },
    {
      name: 'Renata',
      appointments: [
        { client: 'Cliente B', startTime: '16:00', duration: 30 },
      ],
    },
    {
      name: 'Nali',
      appointments: [],
    },
    {
      name: 'Ian',
      appointments: [
        { client: 'Cliente C', startTime: '10:00', duration: 30 },
        { client: 'Cliente D', startTime: '14:00', duration: 60 },
      ],
    },
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  ];

  return (
    <>
      <TabelaDeDuasSemanas/>
    </>
  );
}

export default App;