"use client";
import Select1 from "./Select";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useMediaQuery } from "react-responsive";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useGetTagsQuery, useGetSubredditQuery } from "../feautres/postapi";
import Posts from "./Posts";
import axios from "axios";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const content = ["Images", "Videos", "All"];
const options = ["tag", "subreddit"];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Dashboard() {
  const [tags, settags] = React.useState(null);
  const [subreddit, setsubs] = React.useState(null);
  // if (typeof window !== 'undefined') {
  //   const userId = window.localStorage.getItem('userid');
  //   // do something with userId
  //   setid(userId)
  // }
 React.useEffect(() => {
  const userid = localStorage.getItem("userid")
  axios.get(`api/tags/create?userid=${userid}`).then((res)=>settags(res.data)).catch((err)=>console.log(err))
  axios.get(`api/subreddit/create?userid=${userid}`).then((res)=>setsubs(res.data)).catch((err)=>console.log(err))
 }, [])
  
  const [fetch, setfetch] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [error1, seterror1] = React.useState("");
  const [success, setsuccess] = React.useState("");
  // const { data: tags, error, isLoading } =id ? useGetTagsQuery(id): {data:undefined};
  // const { data: subreddit, error2, isLoading1 } =id? useGetSubredditQuery(id) :{data:undefined};
  const [open, setOpen] = React.useState(false);
  const tagnames = tags?.map((tag) => tag.name);
  const subredditnames = subreddit?.map((sub) => sub.name);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setsuccess("");
      seterror1("");
      return;
    }

    setOpen(false);
    setOpen1(false);
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [tagPosts, settagPosts] = React.useState(null);
  const [subredditPosts, setsubredditPosts] = React.useState(null);
  const [notPosted, setnotPosted] = React.useState(null);
  const [personName, setPersonName] = React.useState([]);
  const [tagstore, settagstore] = React.useState([]);
  const [search, setsearch] = React.useState("");
  const [redditstore, setredditstore] = React.useState([]);
  const [personName1, setPersonName1] = React.useState(["All"]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName1(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // console.log(personName.indexOf(value))
    console.log(value[0]);
    setsearch(value[0]);
    
  };
  const handleChangetag = (event) => {
    const {
      target: { value },
    } = event;
    settagstore(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // console.log(personName.indexOf(value))
    // console.log(value[0]);
    // setsearch(value[0]);
  };
  const handleChangereddit = (event) => {
    const {
      target: { value },
    } = event;
    setredditstore(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // console.log(personName.indexOf(value))
    // console.log(value[0]);
    // setsearch(value[0]);
  };
  const handleSearchtag = () => {
    const userid = localStorage.getItem("userid")
    axios
      .get(`api/posts/search?tags=${tagstore}&userid=${userid}`)
      .then((res) => {
        console.log(res.data);
        setsuccess("Search is Successfull");
        setOpen1(true);
        settagPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
        seterror1(err.response.data.message);
        setOpen(true);
      });
  };
  const handleSearchnotPosted = () => {
    const userid = localStorage.getItem("userid")
    axios
      .get(`api/posts/search?userid=${userid}`)
      .then((res) => {
        console.log(res.data);
        setsuccess("Search is Successfull");
        setOpen1(true);
        setnotPosted(res.data);
      })
      .catch((err) => {
        console.log(err);
        seterror1(err.response.data.message);
        setOpen(true);
      });
  };
  const handleSearchsubreddit = () => {
    const userid = localStorage.getItem("userid")
    axios
      .get(`api/posts/search?subreddits=${redditstore}&userid=${userid}`)
      .then((res) => {
        console.log(res.data);
        setsuccess("Search is Successfull");
        setOpen1(true);
        setsubredditPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
        seterror1(err.response.data.message);
        setOpen(true);
      });
  };
  return (
    <>
      <div>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems={"center"}
        >
          <div className="w-80">
            <Stack
              direction="row"
              spacing={{ sm: 1, md: 2 }}
              alignItems={"center"}
            >
              <h1 className="font-sans  text-xl font-medium">Select content</h1>
              <div className=" ">
                <FormControl sx={{ m: 1, width: 120 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Content
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName1}
                    onChange={handleChange1}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {content?.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName1.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <button
                type="button"
                className="bg-blue-800 text-white px-4 py-2 rounded-xl"
                onClick={() => {
                  setfetch(!fetch);
                  settagPosts(null);
                  setsubredditPosts(null);
                  setnotPosted(null);
                }}
              >
                Fetch
              </button>
            </Stack>
          </div>
          {/* <Select1 /> */}
          <div>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              alignItems={"center"}
            >
              <h1 className="font-sans  text-xl font-medium">Search Data By</h1>
              <div className=" ">
                <FormControl sx={{ m: 1, width: 120 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Option
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {options?.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
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
              {search === "tag" ? (
                <div>
                  <Stack direction="row" spacing={2} alignItems={"center"}>
                    <FormControl sx={{ m: 1, width: 120 }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        tags
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={tagstore}
                        onChange={handleChangetag}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {tagnames?.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={tagstore.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <button
                      type="button"
                      className="bg-blue-800 text-white px-4 py-2 rounded-xl"
                      onClick={handleSearchtag}
                    >
                      Search
                    </button>
                  </Stack>
                </div>
              ) : search === "subreddit" ? (
                <div>
                  <Stack direction="row" spacing={2} alignItems={"center"}>
                    <FormControl sx={{ m: 1, width: 120 }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Subreddits
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={redditstore}
                        onChange={handleChangereddit}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {subredditnames?.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox
                              checked={redditstore.indexOf(name) > -1}
                            />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <button
                      type="button"
                      className="bg-blue-800 text-white px-4 py-2 rounded-xl"
                      onClick={handleSearchsubreddit}
                    >
                      Search
                    </button>
                  </Stack>
                </div>
              ) : (
                <>
                  <h1>Select Option to Search</h1>
                  <button
                    type="button"
                    className="bg-blue-800 text-white px-4 py-2 rounded-xl"
                    onClick={handleSearchnotPosted}
                  >
                    Not Posted Posts
                  </button>
                </>
              )}
            </Stack>
          </div>
        </Stack>
        <div className="mt-10">
          <Box sx={{ flexGrow: 1 }}>
            <Posts searchedPosts={tagPosts || subredditPosts || notPosted} fetch={fetch} />
          </Box>
        </div>
      </div>
    </>
  );
}
