import React, { useEffect, useState } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

const SelectAddress = ({ onSelectedAddress, onClearSelection }) => {
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);
  const [regionAddr, setRegionAddr] = useState("");
  const [provinceAddr, setProvinceAddr] = useState("");
  const [cityAddr, setCityAddr] = useState("");
  const [barangayAddr, setBarangayAddr] = useState("");

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    setRegionAddr(e.target.selectedOptions[0].text);
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setProvinceAddr(e.target.selectedOptions[0].text);
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setCityAddr(e.target.selectedOptions[0].text);
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const brgy = (e) => {
    setBarangayAddr(e.target.selectedOptions[0].text);
  };

  useEffect(() => {
    region();
  }, []);

  useEffect(() => {
    if (!regionAddr || !provinceAddr || !cityAddr || !barangayAddr) {
      onSelectedAddress("");
    } else {
      onSelectedAddress(`${barangayAddr}, ${cityAddr}, ${provinceAddr}`);
    }
  });

  useEffect(() => {
    if (onClearSelection) {
      setRegion("");
      setProvince("");
      setCity("");
      setBarangay("");
    }
  }, [onClearSelection]);

  return (
    <div className='flex flex-col gap-5'>
      <select
        onChange={province}
        onSelect={region}
        className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 outline-none ease-in-out duration-300'>

        <option>Select Region</option>
        {regionData &&
          regionData.length > 0 &&
          regionData.map((item) => (
            <option key={item.region_code} value={item.region_code}>
              {item.region_name}
            </option>
          ))}
      </select>
      <select
        onChange={city}
        className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 outline-none ease-in-out duration-300'>
        <option>Select Province</option>
        {provinceData &&
          provinceData.length > 0 &&
          provinceData.map((item) => (
            <option key={item.province_code} value={item.province_code}>
              {item.province_name}
            </option>
          ))}
      </select>
      <select
        onChange={barangay}
        className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 outline-none ease-in-out duration-300'>
        <option>Select City/Municipality</option>
        {cityData &&
          cityData.length > 0 &&
          cityData.map((item) => (
            <option key={item.city_code} value={item.city_code}>
              {item.city_name}
            </option>
          ))}
      </select>
      <select onChange={brgy} className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 outline-none ease-in-out duration-300'>
        <option>Select Barangay</option>
        {barangayData &&
          barangayData.length > 0 &&
          barangayData.map((item) => (
            <option key={item.brgy_code} value={item.brgy_code}>
              {item.brgy_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectAddress;
