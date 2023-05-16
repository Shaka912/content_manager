import Layout from "../components/Layout";

import Dashboard from "..//components/Dashboard";
import jwt from "jsonwebtoken";

import { useRouter } from "next/router";
import { useLayoutEffect,useEffect,useState } from "react";
const  JWT_SECRET  = process.env.JWT_SECRET;
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
