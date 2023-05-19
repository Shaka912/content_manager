import Layout from "../components/Layout";

import Dashboard from "..//components/Dashboard";
import jwt from "jsonwebtoken";

import { useRouter } from "next/router";
import { useLayoutEffect,useEffect,useState } from "react";

export default function Home() {
  const router = useRouter()

  return (
   <>
    <Layout>
     <Dashboard />
    </Layout>
    
   </>
  )
}
