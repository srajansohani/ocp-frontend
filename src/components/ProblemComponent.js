import Title from 'antd/es/typography/Title'
import React from 'react'
import { Problem } from '../routes/problem'

const ProblemComponent = ({ problem }) => {
    return (
        <div>
            <Title>{problem?.title}</Title>
            <div>
                {problem?.desc}
            </div>
            <div>
                {problem?.constraints}
            </div>
            <div>
                {problem?.testcases?.map((testcase, index) => {
                    return (<div className='mb-5 mt-5'>
                        <div className=" border rounded-lg p-4 ">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-gray-800"> Example {index}:</h3>

                            </div>
                            <div className="text-gray-700 mb-2">
                                <p><strong>Input:</strong> {atob(testcase?.input)}</p>
                                <p><strong>Expected Output:</strong> {atob(testcase?.expected_output)}</p>
                            </div>
                        </div>
                    </div>)
                })}
            </div>

        </div>
    )
}

export default ProblemComponent