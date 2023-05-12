import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Apple', value: 400 },
  { name: 'Banana', value: 300 },
  { name: 'Grapes', value: 200 },
  { name: 'Orange', value: 150 },
  { name: 'Pineapple', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];
const handClickCell = (index, entry, COLORS) => {
  console.log("index" + index + ", entry:" + entry + "Colors" + COLORS[index % COLORS.length] )
}
function PieChartExample() {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
         
          <Cell onClick={() => handClickCell((index, entry, COLORS))} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
}

export default PieChartExample;
