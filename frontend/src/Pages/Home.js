import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [rdata, setrdata] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetch(
          "https://cpalead.com/dashboard/reports/campaign_json.php?id=2831541"
        );
        if (data) {
          setrdata(data);
        }
      } catch (err) {

        console.log(err)
        toast.error(err.response && err.response.data.message ? err.response.data.message : err.message)

      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen bg-white ">
      <div className="800px:w-[50%] w-full overflow-y-scroll bg-[#ffffffc7] shadow-md">
        <div className="w-full items-center text-[black] font-[600] text-[16px]">
          {rdata.number_offers}
        </div>
      </div>
    </div>
  );
};

export default Home;
