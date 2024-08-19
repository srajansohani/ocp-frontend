import React, { useEffect, useRef, useState } from "react";
import Text from "antd/es/typography/Text";
import { Flex } from "antd";
import axiosInstance from "../../utils/axiosConfig";

export const LeaderBoard = ({ contest_id, problems }) => {
    const [leaderboard, setLeaderBoard] = useState([]);
    const intervalRef = useRef(null);

    const fetchLeaderBoard = async () => {
        try {
            const res = await axiosInstance.get(
                `/contest/leaderboard?contest_id=${contest_id}`
            );

            setLeaderBoard(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        intervalRef.current = setInterval(() => fetchLeaderBoard(), 10000);
    }, []);

    return <div className="p-4"></div>;
};
