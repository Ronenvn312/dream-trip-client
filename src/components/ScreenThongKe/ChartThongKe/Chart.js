import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', 2021: 400, 2022: 240, amt: 2400 },
  { name: 'Feb', 2021: 300, 2022: 139, amt: 2210 },
  { name: 'Mar', 2021: 200, 2022: 980, amt: 2290 },
  { name: 'Apr', 2021: 278, 2022: 390, amt: 2000 },
  { name: 'May', 2021: 189, 2022: 480, amt: 2181 },
  { name: 'Jun', 2021: 239, 2022: 380, amt: 2500 },
  { name: 'Jul', 2021: 349, 2022: 430, amt: 2100 },
];

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