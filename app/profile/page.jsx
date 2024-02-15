"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProfileInfo from "@components/ProfileInfo";

const Profile = () => {
  return (
    <ProfileInfo />
  )
}

export default Profile;