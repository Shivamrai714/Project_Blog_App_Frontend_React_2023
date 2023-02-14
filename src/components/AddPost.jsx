import { useState } from "react"
import { useEffect } from "react"
import { Card, CardBody, Form, Input, Label, Button, Container } from "reactstrap"
import { loadAllCategories } from "../services/category-service"
import JoditEditor from "jodit-react"
import { useRef } from "react"
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service"
import { getCurrentUserDetail } from "../auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

// This PAGE is to show the html-form for Adding the new post by user to a specific category consists of title, content, image, category .
const AddPost = () => {

    const navigate=useNavigate();

    
    const editor = useRef(null)
    // const [content,setContent] =useState('')
    const [categories, setCategories] = useState([])                      // 1.declared variable just to store categories fetched from backend. 
    const [user, setUser] = useState(undefined)                           //  var dec to store user.  setUser is fucntion. This is used because on calling the docreatePost function in post-service.js file we need to pass the userId as well as category Id in the url.

    const [post, setPost] = useState({                                    // declared post type variable to store title, content, cateogoryId .These field should have same name as field in backend.
        title: '',
        content: '',
        categoryId: ''
    })


    

    const [image, setImage] = useState(null)                              // declared var to store the image 


    // const config={
    //     placeholder:"Start typing...",   //refer to google Jodit Editor if want to use need to use with useMemo() hook

    // }

    useEffect(                                                            // 2. THIS is the hook which start all it fucntion as soon the component loads , and [] refers to the dependecy . That is this useEffect will run as many times as dependency var is changed. Here its [] empty ,so only 1 time useEffect work ie on start of the component.
        () => {
            setUser(getCurrentUserDetail())                              // setting values in user variable by  calling the fuction to get the current user detail . This detail is present because we have retured "token  and current user " from the backend.
            loadAllCategories().then((data) => {                         // uses fun defined in user-service.js to load the categories from backend by calling the api using myAxios. And in promise the json data can be received which is sent by the backend.
                console.log(data)
                setCategories(data)                                      // using stateHook method  { setCategories(data) } to set the local created variable 'category' with received json data from the backend . So we can access those categories here.
            }).catch(error => {
                console.log(error)
            })
        },
        []
    )

    //field changed function
    const fieldChanged = (event) => {                                   // 3.   This method is defined to do the two way data binding . The fields of post like title ,category etc  used this fucntion To bind the form field data to the local post object variable created over here . 
        // console.log(event)
        setPost({ ...post, [event.target.name]: event.target.value })               //  ...post means keep other field as it is. Just change the field dynamically  form where the method is called. is if title field called this fucntion , then event.target.name="title" and event.target.value=......value entered in title field will be updated dynamically.
    }

    const contentFieldChanaged = (data) => {                            //4 . Defined this method explicity { for Content field JODIT EDITOR } because data-binding is done differently here. We observed on console that  JODIT Editor on calling the fucntion onChange is returning the actual "content-data" directly not the event like in title & category case . 

        setPost({ ...post, 'content': data })                                      // keep ...post object as it is . only change the content field with the updated data.
    }


    //__________________create post function : Handle submission of Post-Form

    const createPost = (event) => {                                            //5. This fucntion is created to handle the submission of html-form of add post . with chosen details entered by user.

        event.preventDefault();                                                 //To prevent the default behavior of submitted the form and emptying all the field , as we need to perfrom validataion before sending the data to save in database.

        // console.log(post)
        // Checking the data is valid 
        if (post.title.trim() === '') {                                       // now we have data in post object locally so we can validate it filed like title ,content, category like this.
            toast.error("post  title is required !!")
            return;
        }

        if (post.content.trim() === '') {
            toast.error("post content is required !!")
            return
        }

        if (post.categoryId === '') {
            toast.error("select some category !!")
            return;
        }


        //submit the form one server : used in url calling in backend api
        post['userId'] = user.id                                                 //6. This is done to add one more field to the post object ie 'usedId'  to get information of user who created the post.
        
        
        //post-service.js method to call backend with privateaxios obj :  This post obj has userId,categoryId,title,content fields 
    
        doCreatePost(post).then(data => {                                        //7. Post-servicee: This fucntion is the renamed version of createPost called from  post-service.js file to call the backend api to subimit the post to database. 


            uploadPostImage(image,data.postId).then(data=>{   
                toast.success("Image Uploaded !!")                                  // Discuss Later related to image upload
            }).catch(error=>{ 
                toast.error("Error in uploading image")
                console.log(error)
            })



            toast.success("Post Created !!")                            //Data submitted to backend and reseting the fields after submission.
            // console.log(post)
            setPost({
                title: '',
                content: '',
                categoryId: 0
            })
            
            


            //POST CREATED AND DATA  SUBMITTED TO BACKEND : Now we can redirect user to userProfile to show his blog, or reload this page.
            // navigate("/")   This is also not loading the posts on home pag
            
             //************* */

        }).catch((error) => {
            toast.error("Post not created due to some error !!")
            // console.log(error)
        })

    }

    //handling file chagne event This is called when we choose the image 
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

                                                                          //7. This is the html / jsx form to create the new post
    return (
        <div className="wrapper">
            <Card className="shadow-sm  border-0 mt-2">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>What going in your mind ?</h3>
                    <Form onSubmit={createPost}>  

                        <div className="my-3">
                            <Label for="title" >Post title</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Enter here"
                                className="rounded-0"
                                name="title"
                                value={post.title}
                                onChange={fieldChanged}        //This fucntion is for two way data binding.  : HERE WE HAVE NOT USED THE TWO WAY DATA _ BINDING DONE IN CASE OF REGISTER USER FORM (like using value property and calling the onChagne fucntion)
                            />
                        </div>

                        <div className="my-3">
                            <Label for="content" >Post Content</Label>
                            {/* <Input
                                type="textarea"
                                id="content"
                                placeholder="Enter here"
                                className="rounded-0"
                                style={{ height: '300px' }}
                            /> */}

                            <JoditEditor
                                ref={editor}
                                value={post.content}

                                onChange={(newContent) => contentFieldChanaged(newContent)}           
                            />
                        </div>

                        {/* file field  */}

                        <div className="mt-3">
                            <Label for="image">Select Post banner</Label>
                            <Input 
                            id="image" 
                            type="file" 
                            
                            onChange={handleFileChange} />
                        </div>




                        <div className="my-3">
                            <Label for="category" >Select  Post Category</Label>
                            <Input
                                type="select"
                                id="category"
                                placeholder="Choose here"
                                className="rounded-0"
                                value={post.categoryId}                     //Just done for two way data binding ie to empty form fields when we submit form. and empty the fields using setPost(...) method.
                                name="categoryId"
                                onChange={fieldChanged}               // 2 way data binding.  to reflect change in local variable post . as soon the data is enterned in the field od form
                                defaultValue={0}

                            >

                                <option   value={0} >--Select category--</option>

                                {

                                    categories.map((category) => (                                           // categories var is local var which already contains all the categories fetched from the backend using useEffect()  hook . now looping / mapping over them to display them.
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))

                                }



                            </Input>
                        </div>



                        <Container className="text-center">
                            <Button type="submit" className="rounded-0" color="primary">Create Post</Button>
                            <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                        </Container>


                    </Form>


                </CardBody>

            </Card>




        </div>
    )
}

export default AddPost