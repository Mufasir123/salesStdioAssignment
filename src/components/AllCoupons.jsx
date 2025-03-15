"use client";

import { Check } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function AllCoupons({ className, ...props }) {
  const [coupons, setCoupons] = useState([]);
  const [claimingStates, setClaimingStates] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);
  const [ip, setIp] = useState()
  useEffect(() => {
    async function fetchCoupons() {
      try {
        const response = await axios.get("/api/admin/get-coupons");
        if (response.status === 200) {
          setCoupons(response.data.coupons);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    }
    fetchCoupons();
    const storeIp = localStorage.getItem('ip');
    if(storeIp) {
      setIsCookieAccepted(true);
      setIp(storeIp);
    }
  }, []);

console.log("Ip address", isCookieAccepted, ip);


  const handleAddClime = async (couponCode) => {
    if (!isCookieAccepted) {
      alert("Please accept cookies first!");
      return;
    }
    if (claimingStates[couponCode]) return; // Agar already claiming hai to return karo

    setClaimingStates((prev) => ({ ...prev, [couponCode]: true }));
    setErrorMessage("");

    try {
      const response = await axios.post(
        "/api/coupons",
        { couponCode ,ip},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      if (response.status === 200) {
        localStorage.setItem("lastClaimTime", Date.now());
        toast.success("🎉 Coupon claimed successfully!");
      }
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error(
          error.response?.data?.error || "You can claim a coupon later."
        );

      } else if (error.response?.status === 400) {
        setErrorMessage("Please accept cookies first!");
      } 
    } finally {
      setClaimingStates((prev) => ({ ...prev, [couponCode]: false }));
    }
  };

  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
      {coupons.map((coupon) => (
        <Card key={coupon._id} className="p-4">
          <CardContent className="space-y-3 h-52">
            <p className="text-xl font-medium">{coupon.title}</p>
            <p className="text-md text-muted-foreground">
              Description: {coupon.description}
            </p>
            <p className="text-md text-neutral-600">
              Discount: {coupon.discount}%
            </p>
            <p className="text-sm text-neutral-600">
              Expires: {new Date(coupon.expiryDate).toDateString()}
            </p>

          </CardContent>
            <button
              className="cursor-pointer flex items-center justify-center gap-2 w-full py-2 bg-black text-white rounded-2xl mt-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => handleAddClime(coupon.code)}
              disabled={!isCookieAccepted || claimingStates[coupon.code]}
            >
              <Check />
              {claimingStates[coupon.code] ? "Claiming..." : `Claim ${coupon.code}`}
            </button>

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </Card>
      ))}
    </div>
  );
}
