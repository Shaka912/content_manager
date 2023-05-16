import React from 'react'
import { limit } from 'firebase/firestore';

const Pagination = () => {
    let pages = [];
    for(let i =0;i<= Math.ceil(totalPosts/posterperpage);i++){
        pages.push(i);
    }
  return (
    <div>Pagination</div>
  )
}

export default Pagination