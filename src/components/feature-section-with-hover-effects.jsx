'use client';
import { cn } from "@/lib/utils";
import { getCoupons } from "@/store/slices/couponsStoreSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function FeaturesSectionWithHoverEffects() {

  const [coupons, setCoupons] = useState([]);
  const [claimingStates, setClaimingStates] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);
  const [ip, setIp] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const response = await axios.get("/api/admin/get-coupons");
        if (response.status === 200) {
          dispatch(getCoupons(response.data.coupons));
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

  const handleAddClime = async (couponCode) => {
    if (!isCookieAccepted) {
      toast.error("Please accept cookies first!");
      return;
    }

    if (claimingStates[couponCode]) return; 
    setClaimingStates((prev) => ({ ...prev, [couponCode]: true }));
    setErrorMessage("");

    try {
      const response = await axios.post("/api/coupons", { couponCode,ip }, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("response", response);
      
      if (response.status === 200) {
        localStorage.setItem("lastClaimTime", Date.now());
        toast.success("🎉 Coupon claimed successfully!");
      }
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error(error.response?.data?.error || "You can claim a coupon later.");
      } else if (error.response?.status === 400) {
        setErrorMessage("Please accept cookies first!");
      } else {
        setErrorMessage("Failed to claim the coupon. Try again later.");
      }
    } finally {
      setClaimingStates((prev) => ({ ...prev, [couponCode]: false }));
    }
  };

  const limitedCoupons = coupons.slice(0,8)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {limitedCoupons?.map((coupon, index) => (
        <div
          key={coupon._id}
          className={cn(
            "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
            (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
            index < 4 && "lg:border-b dark:border-neutral-800"
          )}
        >
          <div
            className={`opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-${index < 4 ? 't' : 'b'} from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none`}
          />


          <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">{coupon?.title}</div>


          <div className="text-lg font-bold mb-2 relative z-10 px-10">
            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />


            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
              {coupon?.description}
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">Discount: {coupon.discount}%</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">Expires: {new Date(coupon.expiryDate).toDateString()}</p>

          <div className="flex justify-center mt-5">
          <button
                onClick={() => handleAddClime(coupon.code)}
                className="w-44 items-center bg-green-500 text-black px-4 py-2 mt-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                disabled={!isCookieAccepted || claimingStates[coupon.code]}
              >
                {claimingStates[coupon.code] ? "Claiming..." : `Claim ${coupon.code}`}
              </button>
          </div>
        </div>
        
      ))}
    </div>
  );
}
