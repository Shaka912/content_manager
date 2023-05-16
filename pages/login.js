import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from "../feautres/auth/authSlice";
import { useLoginUserMutation } from "../feautres/postapi";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Login() {
  const dispatch = useDispatch();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();
  const [open, setOpen] =useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handlesub = async(e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    try {
      const result = await loginUser(credentials).unwrap();
      // Save user data to Redux store
      dispatch(setUser(result.user));
      localStorage.setItem("userid", result.user.id);
      router.push("/");
    } catch (err) {
      console.error('Login failed:', err);
      handleClick();
    }
    // axios
    //   .post("http://localhost:3000/api/auth/login", {
    //     email,
    //     password,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     localStorage.setItem("userid", res.data);
    //     router.push("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     handleClick();
    //   });
  };
  return (
    <div className="">
      <header>
        <div className="mb-10 mt-10">
          <div className="flex justify-center">
            <img
              alt=""
              className="h-14 w-14"
              src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
            />
          </div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your Account
          </h2>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
              
            >
              Email or password is incorrect
            </Alert>
          </Snackbar>
          <form className="mt-8" onSubmit={handlesub}>
            <div className="my-5 flex justify-center ">
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                name="email"
                type="email"
                required={true}
                className="rounded-xl appearance-none relative block w-2/4 px-3 py-2 border-2  border-gray-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div className="my-5 flex justify-center ">
              <input
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                name="password"
                type="password"
                required={true}
                className="rounded-xl appearance-none relative block w-2/4 px-3 py-2 border-2  border-gray-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative w-1/6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-500 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 mt-10"
              >
                Login
              </button>
            </div>
          </form>
          <p className=" text-center text-sm text-gray-600 mt-5">
            Don't have an account yet?
            <Link
              href={"#"}
              className="font-bold text-blue-600 hover:text-blue-900"
            >
              Signup
            </Link>
          </p>
        </div>
      </header>
    </div>
  );
}
