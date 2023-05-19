"use client";
import Layout from "../../components/Layout";
import { Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useGetTagsQuery, useGetSubredditQuery } from "../../feautres/postapi";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Create(props) {
  
  // const { data: tags1, error, isLoading } = useGetTagsQuery();
  // const { data: subreddit1, error2, isLoading1 } = useGetSubredditQuery();
  const [tags1, settags1] = React.useState(null);
  const [subreddit1, setsubreddit1] = React.useState(null);
  const [title, settitle] = React.useState("");
  const [url, seturl] = React.useState("");
  const [type, settype] = React.useState("");
  const [tags, settags] = React.useState([]);
  const [subreddit, setsubreddit] = React.useState([]);
  const [status, setstatus] = React.useState("");
  const [image, setimage] = React.useState(null);
  const [loading, setloading] = React.useState(false);
  
  const [open, setOpen] = React.useState(false);
  const selector = useSelector((state) => state.auth.data);
  const router = useRouter();
  const handleClick = () => {
    setOpen(true);
  };
React.useEffect(() => {
    const id = localStorage.getItem("userid");

    axios.get(`http://localhost:3000/api/tags/create?userid=${id}`).then((res) => {
      console.log(res);
      settags1(res.data);
    }).catch((err) => {
      console.log(err);
    })
    axios.get(`http://localhost:3000/api/subreddit/create?userid=${id}`).then((res) => {
      console.log(res);
      setsubreddit1(res.data);
    
    }).catch(err=>{
      console.log(err);})
    }  
    
  , [])
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handlefile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setimage(file);
    };
    reader.readAsDataURL(file);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setimage(selectedFile);
    console.log("Selected file:", selectedFile);

    // Perform further actions with the selected file
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    const id = localStorage.getItem("userid");
    const strtags = tags.join(",");
    const strsubreddit = subreddit.join(","); 
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("type", type);
    formdata.append("tags", strtags);
    formdata.append("subreddit", strsubreddit);
    // formdata.append("status", status);
    formdata.append("file", image);
    formdata.append("userid", id);
    formdata.append("url", url);
    console.log(formdata);
    // setloading(false);
    axios
      .post("/api/posts/create", formdata)
      .then((res) => {
        console.log(res.data);
        router.reload(window.location.pathname);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        handleClick();
        setloading(false);
      });
  };
  const change = (event, update) => {
    //setintialbtnclass(update);
    settype(update);
  };
  return (
    <div>
      <Layout>
        <Container>
          <div className="bg-blue-800 text-white p-4 w-2/3  rounded-xl flex justify-center mx-auto">
            <h3 className="text-center text-4xl font-semibold">
              Create a new Post
            </h3>
          </div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
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
              File was not Uploaded. Try Again
            </Alert>
          </Snackbar>
          <div className="mt-8">
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
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="url"
                  label="URL"
                  fullWidth
                  variant="standard"
                  required
                  value={url}
                  onChange={(e) => seturl(e.target.value)}
                />
              </div>
              <div className="mt-4">
                {/* <TextField
                  autoFocus
                  margin="dense"
                  id="type"
                  label="Video or Picture"
                  fullWidth
                  variant="standard"
                  required
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                /> */}
                <label className="font-semibold text-xl mr-5">Type</label>
                
                <ToggleButtonGroup
                  value={type}
                  onChange={change}
                  exclusive
                  color="primary"
                >
                  <ToggleButton value="Picture" aria-label="Picture" className="bg-orange-300 hover:bg-orange-500 text-black">
                    Picture
                  </ToggleButton>
                  <ToggleButton value="Video" aria-label="Video" className="bg-orange-300 hover:bg-orange-500 text-black">
                    Video
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="mt-4">
                {/* <TextField
                  autoFocus
                  margin="dense"
                  id="tags"
                  label="Tags"
                  fullWidth
                  variant="standard"
                  required
                  value={tags}
                  onChange={(e) => settags(e.target.value)}
                /> */}
                <label className="font-semibold text-xl my-5">Tags</label>
                <Grid container spacing={2} className="mt-2">
                  {tags1?.map((tag) => (
                    <Grid item xs={3} md={2} key={tag._id}>
                      <ToggleButtonGroup
                        value={tags}
                        onChange={(event,update) =>{ settags(update);console.log(tags)}}
                        
                        color="primary"
                      >
                        <ToggleButton value={tag.name} aria-label={tag.name}  className="bg-orange-300 hover:bg-orange-500 text-black rounded-full">
                          {tag.name}
                        </ToggleButton>
                       
                      </ToggleButtonGroup>
                    </Grid>
                  ))}
                </Grid>
              </div>
              {/* <div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="tags"
                  label="State"
                  fullWidth
                  variant="standard"
                  required
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                />
              </div> */}
              <div className="my-5">
                {/* <TextField
                  autoFocus
                  margin="dense"
                  id="subreddit"
                  label="Subreddit"
                  fullWidth
                  variant="standard"
                  required
                  value={subreddit}
                  onChange={(e) => setsubreddit(e.target.value)}
                /> */}
                <label className="font-semibold text-xl my-5">Subreddit</label>
                 <Grid container spacing={2} className="mt-2">
                  {subreddit1?.map((tag) => (
                    <Grid item xs={3} md={2} key={tag._id}>
                      <ToggleButtonGroup
                        value={subreddit}
                        onChange={(event,update) => setsubreddit(update)}
                        key={tag._id}
                        color="primary"
                      >
                        <ToggleButton value={tag.name} aria-label={tag.name} className="bg-orange-300 hover:bg-orange-500 text-black rounded-full">
                          {tag.name}
                        </ToggleButton>
                       
                      </ToggleButtonGroup>
                    </Grid>
                  ))}
                </Grid>
              </div>
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="file"
                  label="File"
                  name="file"
                  fullWidth
                  variant="standard"
                  onChange={handlefile}
                  type="file"
                  // ref={fileInputRef}
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-4 py-2 rounded-full"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </Container>
      </Layout>
    </div>
  );
}
