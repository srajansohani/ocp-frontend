import React, { useEffect, useRef, useState } from "react";
import Text from "antd/es/typography/Text";
import { Flex } from "antd";
import axiosInstance from "../../utils/axiosConfig";

export const LeaderBoard = ({ contest_id, problems }) => {
    const [leaderboard, setLeaderBoard] = useState(null);
    const intervalRef = useRef(null);

    const fetchLeaderBoard = async () => {
        try {
            // console.log("here222");
            const res = await axiosInstance.get(
                `/contest/leaderboard?contest_id=${contest_id}`
            );
            // console.log("leaderboard data : ", res.data);
            setLeaderBoard(res.data);
        } catch (err) {
            console.log("error");
        }
    };

    useEffect(() => {
        fetchLeaderBoard();
        intervalRef.current = setInterval(() => fetchLeaderBoard(), 10000);
    }, []);

    useEffect(() => {
        console.log(leaderboard);
    }, [leaderboard]);

    return (
        <Flex className="p-4 w-auto overflow-x-auto text-center" gap="small">
            {!leaderboard ? (
                <Flex className="items-start w-full">
                    <Text>no submissions...</Text>
                </Flex>
            ) : (
                <>
                    <Flex vertical gap="small" className="p-2">
                        <Text className="w-20 h-5 truncate"></Text>
                        {Object.keys(leaderboard).map((leaderboardKey) => {
                            return (
                                <Text className="w-20 h-5 truncate">
                                    {leaderboard[leaderboardKey].username}
                                </Text>
                            );
                        })}
                    </Flex>
                    {problems.map((problemData) => {
                        return (
                            <Flex vertical gap="small" className="p-2">
                                <Text className="h-5 truncate">
                                    {problemData.problem.title}
                                </Text>
                                {Object.keys(leaderboard).map(
                                    (leaderboardKey) => {
                                        return (
                                            <Text className="h-5 truncate">
                                                {leaderboard[leaderboardKey][
                                                    problemData.problem._id
                                                ]
                                                    ? problemData.score
                                                    : 0}
                                            </Text>
                                        );
                                    }
                                )}
                            </Flex>
                        );
                    })}
                    <Flex vertical gap="small" className="p-2">
                        <Text className="w-20 h-5 truncate">Total Score</Text>
                        {Object.keys(leaderboard).map((leaderboardKey) => {
                            return (
                                <Text className="w-20 h-5 truncate">
                                    {leaderboard[leaderboardKey].score}
                                </Text>
                            );
                        })}
                    </Flex>{" "}
                </>
            )}
        </Flex>
    );
};
