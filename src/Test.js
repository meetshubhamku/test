import React, { useEffect, useState } from "react";
const axios = require("axios").default;

export default function Test() {
  const [data, setData] = useState({});
  const getData = async () => {
    axios.defaults.withCredentials = true;
    const res = await axios.get(
      "https://www.hostindia.net/user/index.php?mode=client_aws_manage&client_sop_id=81448&mid=150884857898&cidf[]=472015886777&op=advisor&json=1"
    );
    // const res = await axios.get("    http://localhost/test/index.php");
    console.log("res : ", res);
    setData({
      ...data,
      data: res,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return <div>{JSON.stringify(data.data)}</div>;
}
