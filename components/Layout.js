import Nav from "./Nav";
import { useRouter } from "next/router";
import { useLayoutEffect, useEffect, useState } from "react";


export default function Layout({ children }) {
  const [user, setuser] = useState({});
  const router = useRouter();

  return (
    <>
      
        <div className="bg-blue-900 min-h-screen flex">
          <Nav />
          <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
            <h3 className="text-black">{children}</h3>
          </div>
        </div>
     
        {/* <div className="bg-white min-h-screen flex">
          
        </div> */}
     
    </>
  );
}
