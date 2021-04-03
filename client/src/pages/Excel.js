import React, { useState, useEffect } from "react";
import ArrayToExcelButton from "../components/ArrayToExcel/ArrayToExcelButton"


export default function Excel() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJsonArray = async () => {
    try {
      const response = await fetch('http://localhost:4000/employees');
      let jsonArray = await response.json();
      console.log(jsonArray)
      setUserData(jsonArray);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJsonArray();
  }, [])


  return (
    <div className="App">
      {loading ?
        <p>Loading</p> :
        <>
          <h1>Export Array to Excel Demo</h1>
          <ArrayToExcelButton apiArray={userData} fileName={"UserData.xls"} buttonTitle={"Download User Data"} />
        </>

      }
    </div>
  );
}
