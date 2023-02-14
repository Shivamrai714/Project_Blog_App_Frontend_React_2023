import { privateAxios } from "./helper";
import { myAxios } from "./helper";


//   create post function      // 1 . THIS method is to submit the post form of AddPost.jsx file to backend : 
export const createPost = (postData) => {
  console.log("Displaying the post data");
  console.log(postData);
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

//get all posts                     // 2 . Used to show all the post & pages info. in NewFeed.jsx file.

export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`                // passing pageNumber , pageSize, sortBy , SortDirection attrributes to backend call
    )
    .then((response) => response.data);
};

//load single post of given id
export const loadPost = (postId) => {
  return myAxios.get("/posts/" + postId).then((reponse) => reponse.data);
};



//   FUCNTION TO CALL THE COMMENT API OF BACKEND 

export const createComment = (comment, postId) => {
  return privateAxios.post(`/post/${postId}/comments`, comment);
};

//upload post banner image

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/post/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",                      //this is done as we are uplading the image type
      },
    })
    .then((response) => response.data);
};


//get cateory wise posts
export function loadPostCategoryWise(categoryId) {
  return privateAxios
    .get(`/category/${categoryId}/posts`)
    .then((res) => res.data);
}

export function loadPostUserWise(userId) {
  return privateAxios.get(`/user/${userId}/posts`).then((res) => res.data);
}

//delete post
export function deletePostService(postId) {
  return privateAxios.delete(`/posts/${postId}`).then((res) => res.data);
}

//update post
export function updatePost(post, postId) {
  console.log(post);
  return privateAxios.put(`/posts/${postId}`, post).then((resp) => resp.data);
}
