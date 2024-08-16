import React from "react";
import Text from "antd/es/typography/Text";
import { Flex } from "antd";

export const Tag = ({ text }) => {
    return (
        <Flex className=" bg-gray-200 rounded-lg px-3 h-[30px]" align="center">
            <Text>{text}</Text>
        </Flex>
    );
};
