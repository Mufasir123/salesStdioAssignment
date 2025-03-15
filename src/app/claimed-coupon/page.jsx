'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ClaimedCoupon = () => {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
      fetchCoupons()
    
  }, [])

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`/api/get-coupon`)
      console.log("response: ", response.data.claimedCoupons);
      setCoupons(response.data.claimedCoupons)

    } catch (error) {
      toast.error(error.response?.data?.error || "Error fetching coupons")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='mt-20 ml-10'>
      <h2 className="text-lg font-semibold mt-6">Claimed Coupons</h2>
      {loading && <p className="text-gray-600">Loading coupons...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-gray-200 p-4 rounded-md w-44">
        {coupons?.length === 0 && !loading ? (
          <p>No coupons available.</p>
        ) : (
          <ul className="divide-y">
            {coupons?.map((coupon, index) => (
              <li key={index} className="p-2">
                <strong>CouponCode: <strong className='text-blue-600'>{coupon}</strong></strong> 
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ClaimedCoupon
