import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { loadAllPosts } from '../services/post-service'
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
import { deletePostService } from '../services/post-service'

// THIS section is Show all the post present in the website in the sorted  mannner.

function NewFeed() {

    const [postContent, setPostContent] = useState({                     //1. var declared to store all the posts[] , pages , etc details present in backend api "to display all posts"
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''

    })

    // 10.var taken to call the useEffect again and again to load the posts of upcomming pages as requested by infiniteScroll.

    const [currentPage, setCurrentPage] = useState(0)                    //   var declared    , used in navigation  of pages


    useEffect(() => {                                                    // 3. hook to load the following method present in useEffect based on dependecy ,  dependecy  here based on currentPage
        console.log("loading posts")
        console.log("Current page : "+currentPage)
        changePage(currentPage)                  // only passing the current page and other field will be default avalable ie pageSize

    }, [currentPage])

                                                                          //4. Method helping in implementing pagenation. 
    const changePage = (pageNumber = 0, pageSize = 5) => {
       
       
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {     // To avoid clicking next button when we are on last page.
            return
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {     //Disabling previous button when on front page
            return
        }

      // 5. post-service method to call the backend api to load the posts & otherr stuff
loadAllPosts(pageNumber, pageSize).then(data => {
            setPostContent({
                content: [...postContent.content, ...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })
            console.log("Data of Load All post : pagenation ");
            console.log(data);

        }).catch(error => {
            toast.error("Error in loading posts")

        })
    }



    function deletePost(post) {
        //going to delete post
        console.log(post)

        deletePostService(post.postId).then(res => {
            console.log(res)
            toast.success("post is deleled..")

            let newPostContents = postContent.content.filter(p => p.postId != post.postId)
            setPostContent({ ...postContent, content: newPostContents })

        })
            .catch(error => {
                console.log(error)
                toast.error("error in deleting post")
            })
    }


    const changePageInfinite = () => {
        console.log("page chagned")
        setCurrentPage(currentPage + 1)

    }

    return (
        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 12

                    }
                }>



                    <h1>Blogs Count  ( {postContent?.totalElements} )</h1>
                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        
                        {

                        // Now mapping over the array of Posts to display the Card of posts on New Feed Page.  Also passing the deletePost fucntion  as props in Post component. 

                            postContent.content.map((post, index) => (
                                <Post deletePost={deletePost} post={post} key={index} />                     
                            ))
                        }

                    </InfiniteScroll>


                    {/* JUST IMPLEMENTING THE PAGENATION:    :::::::::::::::::    */}

                    {/*
                    
                    <Container className='mt-3'>
                        <Pagination size='lg'>


                            <PaginationItem      onClick={() => changePage(postContent.pageNumber-1)}    disabled={postContent.pageNumber == 0}   >
                                <PaginationLink previous>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>

                            {
                                [...Array(postContent.totalPages)].map((item, index) => (


                                    <PaginationItem onClick={() => changePage(index)} active={index == postContent.pageNumber} key={index}>
                                        <PaginationLink>

                                            {index + 1}

                                        </PaginationLink>
                                    </PaginationItem>

                                ))
                            } 


                            <PaginationItem onClick={() => changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                                <PaginationLink next>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>

                    </Container> */}






                </Col>
            </Row>
        </div>


    )
}

export default NewFeed