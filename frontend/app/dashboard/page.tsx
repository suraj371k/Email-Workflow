"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { EmailInbox } from "@/components/email-inbox"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <EmailInbox />
    </DashboardLayout>
  )
}
