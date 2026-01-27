"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Draft from "@/components/Draft";
import { EmailInbox } from "@/components/email-inbox";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export default function DashboardPage() {

  return (
    <>
    <Draft />
    <DashboardLayout>
      <EmailInbox />
    </DashboardLayout>
    </>
  );
}
