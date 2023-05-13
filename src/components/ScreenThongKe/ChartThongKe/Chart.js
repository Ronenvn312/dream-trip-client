import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Chart(props) {
  return (
    <LineChart width={920} height={500} data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="slThich" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="slDat" stroke="#82ca9d" />
      <Line type="monotone" dataKey="slThemKeHoach" stroke="red" />
    </LineChart>
  ); 
}

export default Chart;