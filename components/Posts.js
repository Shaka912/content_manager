"use client";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchPostsQuery, useGetPostsQuery } from "../feautres/postapi";
import { PostDetailsModal } from "./PostdetailsModal";
import { useRouter } from "next/router";
import axios from "axios";

export default function Posts({searchedPosts,fetch}) {
  const [posts, setposts] = React.useState(null);
  useEffect(() => {
   const userid = localStorage.getItem("userid")
    axios.get(`api/posts/create?userid=${userid}`).then((res) => {
      setposts(res.data);
    }).catch((err)=>{
      console.log(err)
    
    })
   
  }, [])
  const [searcharray, setsearcharray] = useState([])
  
  const [searchParams, setSearchParams] = useState(null);
  // const {
  //   data: posts,
  //   error,
  //   isLoading,
  // } =  useGetPostsQuery(id);
  //searchParams ? useSearchPostsQuery(searchParams) :
  const [selectedPostId, setSelectedPostId] = useState(null);
  const router = useRouter();

  const [openstate, setOpenstate] = useState(false);
  // variables for pagination 
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(30);
  const lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;
  const currentposts = posts?.slice(firstpostindex, lastpostindex);
  const totalpage = Math.ceil(posts?.length / postperpage);
  useEffect(() => {
    console.log(searchedPosts)
    if(searchedPosts){
      setsearcharray(searchedPosts)

    }else if(fetch){
      setsearcharray(currentposts)
      console.log(searcharray)
    }
    
    else{
      setsearcharray(currentposts)
    }
  }, [searchedPosts, posts,fetch])
  const handlePostClick = (id) => {
    setSelectedPostId(id);
    setOpenstate(true);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
    setOpenstate(false);
  };
  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {
              posts ===null && (
                <div className="flex justify-center items-center content-center">
                  <h3 className="text-xl text-center ml-32">NO posts to display please create Posts to start using</h3>
                </div>
              )
            }
            { searcharray?.map((post) => (
              <Grid item xs={6} md={2} key={post._id}>
                <button
                  onClick={() => {
                    handlePostClick(post._id);
                    console.log(posts);
                  }}
                >
                  <img
                    src={post.path}
                    alt="11"
                    style={{
                      width: 300,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />
                </button>
              </Grid>
            ))}
            {selectedPostId && (
              <PostDetailsModal
                postId={selectedPostId}
                onClose={handleCloseModal}
                open={openstate}
              />
            )}
          </Grid>
          <div className="flex justify-center items-end content-end self-end">
            <Stack spacing={2}>
              <Pagination count={totalpage} shape="rounded" size="large" page={currentpage} onChange={(e,page)=>setcurrentpage(page)}/>
            </Stack>
          </div>
        </Box>
      </div>
    </>
  );
}
