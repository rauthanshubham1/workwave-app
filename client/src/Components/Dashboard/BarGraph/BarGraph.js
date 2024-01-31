import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarGraph = ({ labelColor }) => {

    const data = [
        {
            name: 'Jan',
            return: 4000,
            sales: 2400,
            amt: 2400,
        },
        {
            name: 'Feb',
            return: 3000,
            sales: 1398,
            amt: 2210,
        },
        {
            name: 'Mar',
            return: 2000,
            sales: 9800,
            amt: 2290,
        },
        {
            name: 'Apr',
            return: 2780,
            sales: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            return: 1890,
            sales: 4800,
            amt: 2181,
        },
        {
            name: 'Jun',
            return: 2390,
            sales: 3800,
            amt: 2500,
        },
        {
            name: 'Jul',
            return: 3490,
            sales: 4300,
            amt: 2100,
        },
    ];


    return (
        <div>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid stroke={labelColor} strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={labelColor} />
                <YAxis stroke={labelColor} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" stackId="a" fill="#8884d8" />
                <Bar dataKey="return" stackId="a" fill="#82ca9d" />
            </BarChart>
        </div>
    )
}

export default BarGraph