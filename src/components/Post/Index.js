import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { useEffect, useState } from 'react';
import BookmarkBorderTwoToneIcon from '@material-ui/icons/BookmarkBorderTwoTone';
import { connect } from 'react-redux';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { addCommentToPost, addLikeToPost, addPostsData, dispatchMorePosts, removeLikeFromPost } from '../../redux/actions/postActions';
import { useHistory } from "react-router-dom"
import axios from '../../utils/axios';
import GetHeaders from '../../utils/headers';
import { debounce } from '@material-ui/core';

const Post = ({hasMore, dispatchPostsData, postsData, userData, addLikeToPost, removeLikeFromPost, addCommentToPost, dispatchMorePosts}) => {
    const history = useHistory()

    let [isLiked, setIsLiked] = useState(false);
    let [comment, setComment] = useState('');
    let posts = null;

    const[pageNumber, setPageNumber] = useState(1)

    let addLike = (post) => {
        setIsLiked(true);
        addLikeToPost(post, userData);
    }

    let removeLike = (post) => {
        setIsLiked(false);
        removeLikeFromPost(post, userData)
    }

    let addComment = (e, post) => {
        e.preventDefault();
        addCommentToPost(post._id, comment)
        setComment('');
    }

    useEffect(() => {
        axios.get('api/v1/post/getAllPosts/1', {headers: GetHeaders()}).then(res => {
            if(res.data.length<5){
                dispatchPostsData(res.data, false)
            }else{
                dispatchPostsData(res.data, true)
            }
        })
    }, [])

    const loadMorePosts = () => {
        if(!hasMore){
            return
        }
        const nextPage = pageNumber + 1
        axios.get(`api/v1/post/getAllPosts/${nextPage}`, {headers: GetHeaders()}).then(res => {
            const newPostsData = postsData.concat(res.data)
            if(res.data.length<5){
                dispatchPostsData(newPostsData, false)
            }else{
                dispatchPostsData(newPostsData, true)
            }
            setPageNumber(nextPage)
        }).catch(err => {
            console.log(err);
        })
    }

    window.onscroll = debounce(() => {
        if(hasMore && window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight){
                loadMorePosts()
        }
    })

    if(postsData) {
        posts = postsData.map(post => {
            return (
                <div key={post?._id} className="max-w-xl my-6 md:mb-12 sm:bg-white sm:border border-insta-border-gray">
                    <div className="flex flex-row p-2.5 px-3.5">
                        <img src={post?.userId?.displayPic} alt="profile" className="h-11 w-11 rounded-full"/>
                        <div className="flex-1 my-auto pl-2.5 text-sm font-semibold cursor-pointer" onClick={() => history.push(`/profile/${post?.userId?.username}`)}>{post?.userId?.username}</div>
                        <div className="my-auto"><MoreHorizOutlinedIcon/></div>
                    </div>
                    <div className="relative">
                        <div onDoubleClick={() => addLike(post)} className="bg-insta-text-gray">
                            <img src={post?.image} alt="post" className="object-contain w-full"/>
                        </div>
                        <div className="absolute top-1/3 left-68">
                            {isLiked ? <FavoriteOutlinedIcon className="text-7xl text-white opacity-50 heart-likedAnimation"/> : ""} 
                        </div>
                    </div>
                    <div className="flex flex-row h-12 px-4">
                        <div className="my-auto">
                            {!post?.likedBy?.includes(userData?.id) ?
                                <FavoriteBorderOutlinedIcon onClick={() => (addLike(post))} className="text-3xl heart-animation"/> :
                                <FavoriteOutlinedIcon onClick={() => (removeLike(post))} className="text-3xl text-insta-redheart heart-animation"/>
                            }
                        </div>
                        <div className="my-auto pl-4">
                            <ModeCommentOutlinedIcon className="text-3xl"/>
                        </div>
                        <div className="my-auto pl-4">
                            <SendOutlinedIcon className="text-3xl"/>
                        </div>
                        <div className="my-auto ml-auto">
                            <BookmarkBorderTwoToneIcon className="text-3xl"/>
                        </div>
                    </div>
                    <div className="text-insta-black text-sm font-bold pl-4 pb-1">{post?.numberOfLikes} likes</div>
                    <div className="text-insta-black text-sm  pl-4 pb-1 w-full flex flex-row">
                        <div className="font-bold">{post?.userId?.username}</div>
                        &nbsp;<div>{post?.caption}</div>
                    </div>
                    <div className="text-insta-text-gray text-sm pl-4 pb-1">View all comments</div>
                    <div className="pl-4 mb-1">
                        {
                            post.comments.length > 0 && post.comments.map((comment) => {
                                return ( 
                                    <div className="text-sm" key={comment._id}>
                                        <span>{comment.userId.username}</span>
                                        <span className="text-insta-text-gray pl-2">{comment.comment}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="pl-4 pb-3 text-xs text-insta-text-gray">{formatDistanceToNow(new Date(post?.createdAt), {addSuffix: true})}</div>
                    <div className="flex-row p-4 border-t border-insta-border-gray hidden md:flex">
                        <form onSubmit={(e) => addComment(e, post)} className="w-full flex">
                            <input 
                                type="text"
                                className="flex-1 text-sm outline-0"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => (setComment(e.target.value))}
                            />
                            <button disabled={comment.length === 0} className={`${comment.length === 0 ? 'text-insta-blue-light' : 'text-insta-blue'} ${'outline-0 bg-white font-semibold text-sm'}`}>
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            {posts ? 
            <>
                {posts}
                {hasMore?
                    <div className="w-full text-center pb-12 text-gray-500">loading...</div>:
                    <div className="w-full text-center pb-12 text-gray-500">You're all caught up.</div>}
            </> : 
            <div className="w-full text-center pb-12 text-gray-500">loading...</div>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        hasMore: state.post.hasMore,
        postsData: state.post.postData,
        userData: state.user.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addLikeToPost: (post, userData) => {dispatch(addLikeToPost(post, userData))},
        removeLikeFromPost: (post, userData) => {dispatch(removeLikeFromPost(post, userData))},
        dispatchPostsData: (posts, hasMore) => dispatch(addPostsData(posts, hasMore)),
        addCommentToPost: (postId, comment) => dispatch(addCommentToPost(postId, comment)),
        // dispatchMorePosts: (nextPage, postsData) => dispatch(dispatchMorePosts(nextPage, postsData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);