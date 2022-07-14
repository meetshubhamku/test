import {
  Box,
  chakra,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsCardChecklist } from "react-icons/bs";
import { TbChecks, TbAlertTriangle } from "react-icons/tb";
import { useParams } from "react-router-dom";
import Data from "./Data.json";

function StatsCard(props) {
  const { title, stat, statColor, titleColor, iconColor, percentRate } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow="dark-md"
      border={"0.5px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.900")}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            color={titleColor}
            fontSize="lg"
            fontWeight={"bolder"}
            isTruncated
          >
            {title}
          </StatLabel>
          <StatNumber color={statColor} fontSize={"3xl"} fontWeight={"bold"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {/* {icon} */}
          <CircularProgress value={percentRate} color={iconColor} size={"85px"}>
            <CircularProgressLabel fontSize={15}>
              {percentRate}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  let { obj } = useParams();
  obj = JSON.parse(obj);
  const [data, setData] = useState({
    totalPercent: 100,
    failPercent: 0,
    passPercent: 0,
  });

  const TotalPassTest = () => {
    const obj = Data.filter((item) => {
      return item.Status === "PASS";
    });
    return obj.length;
  };
  const TotalFailTest = () => {
    const obj = Data.filter((item) => {
      return item.Status === "FAIL";
    });
    return obj.length;
  };

  const TotalTest = () => {
    const obj = Data.length;
    return obj;
  };

  useEffect(() => {
    setData({
      ...data,
      failPercent: ((TotalFailTest() * 100) / TotalTest()).toFixed(1),
      passPercent: ((TotalPassTest() * 100) / TotalTest()).toFixed(1),
    });
  }, []);

  return (
    <Box mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        // textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Audit Report
      </chakra.h1>
      <chakra.h4
        // textAlign={"center"}

        py={2}
        fontWeight={"bold"}
      >
        Session from param : {obj.session_id}
      </chakra.h4>
      <chakra.h4
        // textAlign={"center"}

        py={2}
        fontWeight={"bold"}
      >
        Json data : {JSON.stringify(obj.jsondata)}
      </chakra.h4>

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Total Checks"}
          stat={TotalTest()}
          icon={<BsCardChecklist size={"3em"} color="lightblue" />}
          percentRate={data.totalPercent}
          statColor="blue.400"
          titleColor="blue.400"
          iconColor="blue.400"
        />
        <StatsCard
          title={"Pass"}
          stat={TotalPassTest()}
          percentRate={data.passPercent}
          icon={<TbChecks size={"3em"} color="green" />}
          statColor="green.400"
          titleColor="green.400"
          iconColor="green.400"
        />
        <StatsCard
          title={"Fail"}
          stat={TotalFailTest()}
          percentRate={data.failPercent}
          icon={<TbAlertTriangle size={"3em"} color="red" />}
          statColor="red.400"
          titleColor="red.400"
          iconColor="red.400"
        />
      </SimpleGrid>
    </Box>
  );
}
