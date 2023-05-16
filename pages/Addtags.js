import Layout from "../components/Layout";
import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import { RxCross1 } from "react-icons/rx";
import { useGetTagsQuery, useGetSubredditQuery } from "../feautres/postapi";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Addtags() {
  const [name, setname] = useState("");
  const [name1, setname1] = useState("");
  const [error1, seterror1] = useState("");
  const [success, setsuccess] = useState("");
  const { data: tags, error, isLoading } = useGetTagsQuery();
  const { data: subreddit, error2, isLoading1 } = useGetSubredditQuery();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleDeletetags = (id) => {
    axios
      .delete(`/api/tags/${id}`)
      .then((res) => {
        console.log(res);
        setsuccess("Successfully Deleted");
        setOpen1(true);
      })
      .catch((err) => {
        seterror1(err.response.data.message);
        console.log(err);
        setOpen(true);
      });
  };
  const handleDeleteSubreddit  = (id) => {
    axios
      .delete(`/api/subreddit/${id}`)
      .then((res) => {
        console.log(res);
        setsuccess("Successfully Deleted");
        setOpen1(true);
      })
      .catch((err) => {
        seterror1(err.response.data.message);
        console.log(err);
        setOpen(true);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = localStorage.getItem("userid");
    const data = {
      name: name,
      userid: id,
    };
    axios
      .post("/api/tags/create", data)
      .then((res) => {
        console.log(res);
        setsuccess("Successfully Created");
        setOpen1(true);
      })
      .catch((err) => {
        seterror1(err.response.data.message);
        console.log(err);
        setOpen(true);
      });
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    const id = localStorage.getItem("userid");
    const data = {
      name: name1,
      userid: id,
    };
    axios
      .post("/api/subreddit/create", data)
      .then((res) => {
        console.log(res);
        setsuccess("Successfully Created");
        setOpen1(true);
      })
      .catch((err) => {
        seterror1(err.response.data.message);
        console.log(err);
        setOpen(true);
      });
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setsuccess("");
      seterror1("");
      return;
    }

    setOpen(false);
    setOpen1(false);
  };
  return (
    <Layout>
      <Container>
        <div className="bg-blue-800 text-white p-4 w-2/3  rounded-xl flex justify-center mx-auto">
          <h3 className="text-center text-4xl font-semibold">Tags</h3>
        </div>
        <div className="mt-5">
          <h3 className=" text-3xl font-semibold underline">Create a Tag</h3>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error1}
            </Alert>
          </Snackbar>
          <Snackbar
            open={open1}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {success}
            </Alert>
          </Snackbar>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                variant="standard"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="bg-blue-800 text-white px-4 py-2 rounded-full"
              >
                Create
              </button>
            </div>
          </form>
          <div className="mt-5">
            <h3 className=" text-3xl font-semibold underline">
              Available Tags
            </h3>
          </div>
          <div>
            <Grid container spacing={2}>
              {tags?.map((tag) => (
                <Grid item xs={4} md={2} key={tag._id} className="mt-8">
                  <div className="bg-black rounded-full  justify-evenly items-center flex flex-grow">
                    <h3 className="text-white text-center py-2">
                      {" "}
                      {tag.name}{" "}
                    </h3>
                    <button onClick={() => handleDeletetags(tag._id)}>
                      <RxCross1 color="white" size={15} />
                    </button>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
          <div className="mt-12">
            <div className="bg-blue-800 text-white p-4 w-2/3  rounded-xl flex justify-center mx-auto">
              <h3 className="text-center text-4xl font-semibold">Subreddit</h3>
            </div>
            <div className="mt-5">
              <h3 className=" text-3xl font-semibold underline">
                Create a Subreddit
              </h3>
            </div>
            <form onSubmit={handleSubmit1}>
              <div className="mt-5">
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  fullWidth
                  variant="standard"
                  required
                  value={name1}
                  onChange={(e) => setname1(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-4 py-2 rounded-full"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
          <div className="mt-5">
            <h3 className=" text-3xl font-semibold underline">
              Available Subreddits
            </h3>
            <div>
              <Grid container spacing={2}>
                {subreddit?.map((subreddit) => (
                  <Grid item xs={4} md={2} key={subreddit._id} className="mt-8">
                    <div className="bg-black rounded-full  justify-evenly items-center flex flex-grow">
                      <h3 className="text-white text-center py-2">
                        {" "}
                        {subreddit.name}{" "}
                      </h3>
                      <button onClick={() => handleDeleteSubreddit(subreddit._id)}>
                        <RxCross1 color="white" size={15} />
                      </button>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
