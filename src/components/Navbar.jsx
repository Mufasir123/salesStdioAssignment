'use client'

import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'AllCoupons', url: '/all-coupons', icon: User },
    { name: 'About', url: '/', icon: Briefcase },
    { name: 'ClaimedCoupons', url: '/claimed-coupon', icon: FileText }
  ]

  return <NavBar items={navItems} />
}