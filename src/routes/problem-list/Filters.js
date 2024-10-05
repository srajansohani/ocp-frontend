import { Button, Flex, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

export const Filters = ({
    problems,
    setFilteredProblems,
    filters,
    setFilters,
}) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const tagSet = new Set();
        problems.forEach((problem) => {
            problem.tags.forEach((tag) => {
                tagSet.add(tag);
            });
        });
        const tagArray = [];
        for (const tag of tagSet) {
            tagArray.push({ lable: tag, value: tag });
        }

        setTags(tagArray);
    }, [problems]);

    const handleChange = (field, value) => {
        setFilters((prev) => {
            return { ...prev, [field]: value };
        });
    };

    const sortingHelper = (a, b, field) => {
        const difficultyMap = {
            Easy: 0,
            Medium: 1,
            Hard: 2,
        };

        let valA, valB;

        if (field === "difficultyAscending") {
            valA = difficultyMap[a.difficulty];
            valB = difficultyMap[b.difficulty];
        }

        if (field === "difficultyDecending") {
            valA = difficultyMap[a.difficulty] * -1;
            valB = difficultyMap[b.difficulty] * -1;
        }

        if (field === "acceptanceRate") {
            valA =
                a.correct_submissions /
                (a.wrong_submissions + a.correct_submissions);
            valB =
                b.correct_submissions /
                (b.wrong_submissions + b.correct_submissions);
        }

        if (field === "recent") {
            valA = a.createdAt;
            valB = b.createdAt;
        }

        return [valA, valB];
    };

    useEffect(() => {
        // console.log(problems);
        const filteredProblems = problems;

        //sort by logic
        filteredProblems.sort((a, b) => {
            const values = sortingHelper(a, b, filters.sortBy);

            if (values[0] < values[1]) {
                return -1;
            }
            if (values[0] > values[1]) {
                return 1;
            }

            return 0;
        });

        filteredProblems.forEach((problem) => {
            console.log(problem.difficulty);
        });

        console.log("setting ...");

        setFilteredProblems(filteredProblems);
    }, [filters, problems]);

    return (
        <div style={{ width: "40rem" }}>
            <div
                className="p-4"
                style={{
                    boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                }}
            >
                <Title style={{ fontWeight: "300" }} level={3}>
                    Filters
                </Title>

                <Flex vertical gap={"large"}>
                    <Flex justify="space-between" className="items-center">
                        <Title
                            style={{ fontWeight: "300", margin: 0 }}
                            level={5}
                        >
                            Sort By :
                        </Title>
                        <Select
                            className="w-60"
                            defaultValue=""
                            onChange={(value) => handleChange("sortBy", value)}
                            options={[
                                {
                                    value: "difficultyAscending",
                                    label: "Difficulty Ascending",
                                },
                                {
                                    value: "difficultyDecending",
                                    label: "Difficulty Descending",
                                },
                                {
                                    value: "acceptanceRate",
                                    label: "Acceptance Rate",
                                },
                                {
                                    value: "recent",
                                    label: "Recent",
                                },
                            ]}
                        />
                    </Flex>

                    <Flex justify="space-between" className="items-center">
                        <Title
                            style={{ fontWeight: "300", margin: 0 }}
                            level={5}
                        >
                            Difficulty :
                        </Title>
                        <Select
                            className="w-60"
                            mode="multiple"
                            allowClear
                            onChange={(value) =>
                                handleChange("difficulty", value)
                            }
                            options={[
                                {
                                    value: "easy",
                                    label: "Easy",
                                },
                                {
                                    value: "medium",
                                    label: "Medium",
                                },
                                { value: "hard", label: "Hard" },
                            ]}
                        />
                    </Flex>

                    <Flex justify="space-between" className="items-center">
                        <Title
                            style={{ fontWeight: "300", margin: 0 }}
                            level={5}
                        >
                            Tags :
                        </Title>
                        <Select
                            className="w-60"
                            mode="multiple"
                            allowClear
                            // onChange={handleChange}
                            // style={{ width: 200 }}
                            options={tags}
                        />
                    </Flex>

                    <Button type="primary">Filter</Button>
                </Flex>
            </div>
        </div>
    );
};
