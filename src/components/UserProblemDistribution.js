
import React from 'react';
import { Card } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);
const UserProblemDistribution = ({ problemCount }) => {
    let data = [
        {
            label: "Easy",
            value: problemCount.Easy,
            color: "rgba(0, 176, 116, 1)",
            cutout: "80%",
        },
        {
            label: "Medium",
            value: problemCount.Medium,
            color: "rgba(255, 192, 30, 1)",
            cutout: "50%",
        },
        {
            label: "Hard",
            value: problemCount.Hard,
            color: "rgba(239, 71, 58, 1)",
            cutout: "50%",
        },
    ]

    const options = {
        plugins: {
        }
    }

    const finalData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                data: data.map((item) => Math.round(item.value)),
                backgroundColor: data.map((item) => item.color),
                borderColor: data.map((item) => item.color),
                borderWidth: 1,
                dataVisibility: new Array(data.length).fill(true),
            },
        ],
    };
    const doughnutLabels = {

    }
    return (
        <Card title="Problem Distribution" bordered={false} style={{ width: 400 }}>
            <Doughnut data={finalData} options={options} plugins={[doughnutLabels]} />
        </Card>
    );
};

export default UserProblemDistribution;
