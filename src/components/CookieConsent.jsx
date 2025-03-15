"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CookieConsent({ onAccept }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedIp = localStorage.getItem("ip");
    if (!storedIp) {
      setShowPopup(true);
    }
  }, []);

  const acceptCookies = async () => {
    try {
      const response = await axios.post("/api/store-ip");
      console.log("response : ", response);
      
      if (response.status === 200 && response.data.ip) {
        localStorage.setItem("ip", response.data.ip); 
        localStorage.setItem("sessionId", response.data.sessionId); 
        setShowPopup(false);
        if (onAccept) onAccept(); // Call callback if provided
      }
    } catch (error) {
      console.error("Error storing IP:", error);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="flex flex-col z-10 w-[80%] fixed bottom-4 left-20 bg-black text-white p-5 shadow-lg rounded-lg">
      <p>We use cookies to track coupon claims. Please accept the cookies; otherwise, you won't be able to claim coupons.</p>
      <button
        onClick={acceptCookies}
        className="bg-blue-500 text-white p-2 rounded-md mt-3 w-52 cursor-pointer"
      >
        Accept
      </button>
    </div>
  );
}
