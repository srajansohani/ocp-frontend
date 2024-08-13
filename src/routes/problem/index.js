import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Problem = () => {
    const [problem, setProblem] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("problem_id"));

    const fetchProblem = async (problem_id) => {
        const res = await axios.get(
            `http://localhost:8000/problem?problem_id=${problem_id}`
        );
        setProblem(res.data);
    };

    useEffect(() => {
        fetchProblem(searchParams.get("problem_id"));
    }, [searchParams]);

    return (
        <>
            {problem && (
                <>
                    <h1>{problem.title}</h1>
                </>
            )}
        </>
    );
};
