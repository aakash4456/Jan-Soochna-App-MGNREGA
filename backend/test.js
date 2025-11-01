import axios from "axios";

async function getIndianStates() {
  try {
    const response = await axios.get(
      "https://api.instantpay.in/utility/fetch/indianStates",
      {
        headers: {
          "X-Ipay-Auth-Code": "2",
          "X-Ipay-Client-Id": "vOSSM+C/FQe8sBzp/QsqgqIlk1yoWakR3qtuhKafBMs=",
          "X-Ipay-Client-Secret": "da5457f6c3eb5eeef6bc59e189dfeb510aedad8af0d9d8f970ab21e2525c990a",
          "X-Ipay-Endpoint-Ip": "14.142.186.14",
          "X-Ipay-Outlet-Id": "72762",
          "Content-Type": "application/json"
        }
      }
    );
    console.log(response.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

getIndianStates();
