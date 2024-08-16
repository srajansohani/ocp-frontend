import React from "react";
import { Flex } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Text from "antd/es/typography/Text";

ChartJS.register(ArcElement, Tooltip, Legend);
const AccuracyChart = ({ problemCount }) => {
    let data = [
        {
            label: "Incorrect",
            value: problemCount.incorrect,
            color: "#F73736",
        },
        {
            label: "Correct",
            value: problemCount.correct,
            color: "#1CBABA",
        },
    ];

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };

    const finalData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                data: data.map((item) => Math.round(item.value)),
                backgroundColor: data.map((item) => item.color),
                // borderColor: data.map((item) => item.color),
                borderWidth: 2,
                borderColor: "#fff",
                dataVisibility: new Array(data.length).fill(true),
            },
        ],
    };
    const doughnutLabels = {};
    return (
        <Flex className="w-1/2 bg-white rounded-md shadow-lg p-4" gap="large">
            <Flex className="w-3/5 p-4">
                <Doughnut
                    data={finalData}
                    options={options}
                    plugins={[doughnutLabels]}
                />
            </Flex>
            <Flex vertical gap="middle" className="w-2/5 p-4 justify-center">
                <Flex className="bg-[#1cbaba48] p-4 rounded-lg justify-center align-middle">
                    <Text>Correct</Text>
                </Flex>
                <Flex className="bg-[#f7363623] p-4 rounded-lg justify-center align-middle">
                    <Text>Incorrect</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AccuracyChart;
