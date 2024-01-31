import React from 'react'
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';

const RadarGraph = ({ labelColor }) => {

    const data = [
        {
            name: '2019',
            sales: 868,
            returns: 967,
            profit: 1506,
            average: 590,
        },
        {
            name: '2020',
            sales: 1397,
            returns: 1098,
            profit: 989,
            average: 350,
        },
        {
            name: '2021',
            sales: 1480,
            returns: 1200,
            profit: 1228,
            average: 480,
        },
        {
            name: '2022',
            sales: 1520,
            returns: 1108,
            profit: 1100,
            average: 460,
        },
        {
            name: '2023',
            sales: 1400,
            returns: 680,
            profit: 1700,
            average: 380,
        },
    ];


    return (
        <div>

            <ComposedChart width={500} height={350} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20, }}>
                <CartesianGrid stroke={labelColor} />
                <XAxis stroke={labelColor} dataKey="name" scale="band" />
                <YAxis stroke={labelColor} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="profit" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="returns" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="sales" stroke="#ff7300" />
                <Scatter dataKey="average" fill="red" />
            </ComposedChart>

        </div>
    )
}

export default RadarGraph;
