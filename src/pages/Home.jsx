import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])

    const authStatus = useSelector((state) => (state.auth.status))

    useEffect(() => {

        if(authStatus == true) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }


    }, [])

    if(authStatus) {
        if(posts.length === 0) {
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No any post
                                </h1>
                                <h1 className="text-xl font-bold hover:text-gray-500">
                                    (Add one)
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )

        } else {
            return (
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )

        }
    } else {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  
}

export default Home