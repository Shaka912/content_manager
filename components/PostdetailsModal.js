"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useGetPostByIdQuery } from "../feautres/postapi";
import { RxCross1 } from "react-icons/rx";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function PostDetailsModal({ postId, onClose, open }) {
  const randomId = uuidv4();
  const [loading, setloading] = React.useState(false);
  const { data: post, error, isLoading } = useGetPostByIdQuery(postId);
  const [openerror, setOpenerror] = React.useState(false);
  const [edit, setedit] = React.useState(false);
  const [opensuccess, setOpensuccess] = React.useState(false);
  const [errormsg, seterrormsg] = React.useState("");
  const [successmsg, setsuccessmsg] = React.useState("");
  const [newsub, setnewsub] = React.useState([]);
  const [newstatus, setnewstatus] = React.useState([]);
  const [newtag, setnewtag] = React.useState("");
  const [subs, setsubs] = React.useState(null);
  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
  React.useEffect(() => {
    const name = post?.subreddit;
    const ne = post?.subreddit.split(",");
    setsubs(ne);
    if (name) {
      const nn = post?.tags.join(",");
      setnewtag(nn);
      const subreddits = name.split(",");
      const nameIdArray = subreddits.map((name) => {
        return {
          name: name,
          id: generateUniqueId(),
        };
      });
      // setedit(true);
      setnewsub(nameIdArray);
      // console.log(newsub);
    }
    const mane = post?.status;
    //console.log(newtag);
    if (mane) {
      //const status = mane.split(",");
      const statusIdArray = mane.map((name) => {
        return {
          name: name,
          id: generateUniqueId(),
        };
      });
      // setedit(true);
      setnewstatus(statusIdArray);
    }
  }, [post]);
  const deletePost = (postid) => {
    axios
      .delete(`/api/posts/${postid}`)
      .then((res) => {
        console.log(res);
        setsuccessmsg("Post Deleted Successfully");
        setOpensuccess(true);
      })
      .catch((err) => {
        console.log(err);
        seterrormsg(err.response.data.message);
        setOpenerror(true);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setsuccessmsg("");
      seterrormsg("");
      return;
    }

    setOpenerror(false);
    setOpensuccess(false);
  };
  const handleEdit = (e, postid) => {
    setedit(true);
    console.log(post?.status);
  };
  //display subbredits coponent to add to posted status
  const handleUpdate = (name) => {
    setloading(true);
    const subs = {
      status: name,
    };
    axios
      .patch(`api/posts/subreddits/add/${post._id}`, subs)
      .then((res) => {
        setloading(false);
        setOpensuccess(true);
        setsuccessmsg("Status is posted successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        loading(false);
        setOpenerror(true);
        seterrormsg(err.response.data.message);
      });
  };
  //function for handling delete element from status array
  function handleDeletestatus(name) {
    setloading(true);
    const subs = {
      status: name,
    };
    axios
      .patch(`api/posts/subreddits/remove/${post._id}`, subs)
      .then((res) => {
        setloading(false);
        setOpensuccess(true);
        setsuccessmsg("Status is deleted successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        setOpenerror(true);
        seterrormsg(err.response.data.message);
      });
  }
  // component for displaying subbreddits for editing purposes
  function Displaysub() {
    return newsub?.map((sub) => {
      return (
        <Grid container>
          <div
            className="bg-black rounded-full flex flex-grow justify-center items-center  w-32 h-10 flex-wrap my-2"
            key={sub.id}
          >
            <button
              onClick={() => handleUpdate(sub.name)}
              disabled={loading}
              className=""
            >
              <h3 className="text-white text-center py-2">{sub.name}</h3>
            </button>
          </div>
        </Grid>
      );
    });
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Snackbar
          open={openerror}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errormsg}
          </Alert>
        </Snackbar>
        <Snackbar
          open={opensuccess}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successmsg}
          </Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
          {/* <DialogTitle>{post?.title}</DialogTitle> */}
          <DialogContent>
            <Grid container spacing={6} justifyContent={"space-evenly"}>
              <Grid item xs={6} md={4}>
                <Image
                  src={post?.path}
                  alt=""
                  width={350}
                  height={400}
                  className="rounded-xl mt-4 flex-1"
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <div className="flex flex-col mt-6">
                  <div className="flex flex-row justify-around ">
                    <label className="text-2xl font-bold bg-slate-300 w-24 h-10 text-center rounded-xl">
                      Title
                    </label>
                    <h1 className="text-2xl ">{post?.title}</h1>
                  </div>
                  <div className="flex flex-row justify-around mt-3 flex-wrap">
                    <label className="text-2xl font-bold bg-slate-300 w-24 h-10 text-center rounded-xl">
                      URL
                    </label>
                    <h1 className="text-2xl ">{post?.url}</h1>
                  </div>
                  <div className="flex flex-row justify-around  my-4 items-center flex-wrap">
                    <label className="text-2xl font-bold  bg-slate-300 w-24 h-10 text-center rounded-xl">
                      Tags
                    </label>

                    {/* <h1 className="font-sans  text-2xl  ">{newtag}</h1> */}
                    {post?.tags.map((tag, index) => {
                      return (
                        <Grid item xs={6} md={4}>
                          <div
                            className="bg-orange-300 rounded-xl justify-center items-center flex flex-grow flex-wrap my-2 px-6 py-2 mx-2"
                            key={index}
                          >
                            <h3 className="font-sans  text-xl mx-2 "> {tag} </h3>
                          </div>
                        </Grid>
                      );
                    })}
                  </div>
                  <div className="flex flex-row justify-around flex-wrap">
                    <label className="text-2xl font-bold  bg-slate-300 w-32 h-10 text-center rounded-xl">
                      Subreddit
                    </label>
                    {edit ? (
                      <Displaysub />
                    ) : (
                      // <h3 className="font-sans  text-2xl ">
                      //   {" "}
                      //   {post?.subreddit}{" "}
                      // </h3>
                      <>
                        {subs?.map((tag, index) => {
                          return (
                            <Grid item xs={6} md={6}>
                              <div
                                className="bg-orange-300 rounded-xl justify-center items-center flex flex-grow flex-wrap my-2 mx-4 px-6 py-2"
                                key={index}
                              >
                                <h3 className="font-sans  text-xl mx-4"> {tag} </h3>
                              </div>
                            </Grid>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div className="flex flex-row justify-around my-4">
                    <label className="text-2xl font-bold  bg-slate-300 w-24 h-10 text-center rounded-xl">
                      Type
                    </label>
                    <h1 className="font-sans  text-2xl ">{post?.type}</h1>
                  </div>
                  <div className="flex flex-row justify-around">
                    <label className="text-2xl font-bold  bg-slate-300 w-36 py-5 px-2 text-center rounded-xl">
                      Posted On
                    </label>
                    {edit ? (
                      newstatus?.map((status) => {
                        return (
                          <div
                            className="bg-blue-900 rounded-full h-12  justify-evenly items-center flex  flex-grow ml-5"
                            key={status.id}
                          >
                            <h3 className="text-white text-center py-2 px-3">
                              {status.name}
                            </h3>
                            <button
                              onClick={() => handleDeletestatus(status.name)}
                              disabled={loading}
                            >
                              <RxCross1 color="white" size={15} />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      // <h1 className="font-sans  text-2xl ">{post?.status}</h1>
                      <>
                        {post?.status?.map((tag, index) => {
                          return (
                            <Grid item xs={6} md={6}>
                              <div
                                className=" bg-orange-300 rounded-xl justify-center items-center flex flex-grow flex-wrap my-2 mx-4 px-6 py-2"
                                key={index}
                              >
                                <h3 className="font-sans  text-xl mx-2"> {tag} </h3>
                              </div>
                            </Grid>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="flex flex-row mr-5">
            <button
              type="button"
              className="bg-red-700 text-white px-8 py-2 rounded-xl mr-6"
              onClick={() => {
                deletePost(post?._id);
              }}
              disabled={loading}
            >
              Delete
            </button>
            <button
              type="button"
              className="bg-blue-800 text-white px-8 py-2 rounded-xl"
              onClick={() => {
                setedit(!edit);
                //handleEdit();
              }}
              disabled={loading}
            >
              EDIT
            </button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
