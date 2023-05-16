import { useRouter } from 'next/router';
import { useGetPostByIdQuery } from "../../feautres/postapi"

export default function posts (){
    const router = useRouter();
  const { id } = router.query;
  const { data: post, error, isLoading } = useGetPostByIdQuery(id);
    return(
        <>
        <h1>Posts</h1>
        
        </>
    )

}