import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineGraph = ({ labelColor }) => {

    const data = [
        {
            name: "Dept1",
            yesterday: 4000,
            today: 2400,
            amt: 2400
        },
        {
            name: "Dept2",
            yesterday: 3000,
            today: 1398,
            amt: 2210
        },
        {
            name: "Dept3",
            yesterday: 2000,
            today: 9800,
            amt: 2290
        },
        {
            name: "Dept4",
            yesterday: 2780,
            today: 3908,
            amt: 2000
        },
        {
            name: "Dept5",
            yesterday: 1890,
            today: 4800,
            amt: 2181
        },
        {
            name: "Dept6",
            yesterday: 2390,
            today: 3800,
            amt: 2500
        },
        {
            name: "Dept7",
            yesterday: 3490,
            today: 4300,
            amt: 2100
        }
    ];

    return (
        <div>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid stroke={labelColor} strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={labelColor} />
                <YAxis stroke={labelColor}  />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="today"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="yesterday" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}

export default LineGraph