import React, {useEffect, useState} from 'react'
import jwtDecode from "jwt-decode";
import {useHistory, useParams} from "react-router-dom";
import Cookies from 'universal-cookie';
import SettingsIcon from '@material-ui/icons/Settings';
import storyImg1 from '../../assets/profile_images/Screenshot 2021-01-04 at 3.20.14 PM.png'
import storyImg2 from '../../assets/profile_images/Screenshot 2021-01-04 at 3.20.29 PM.png'
import LiveTvIcon from '@material-ui/icons/LiveTv';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import Footer from '../Footer/Index';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useRef } from 'react';
import Navbar from '../Navbar/Index';
import { connect } from 'react-redux';
import axios from '../../utils/axios';
import GetHeaders from '../../utils/headers';
import { addUserData } from '../../redux/actions/userActions';

function Profile({userData, dispatchUserData}) {
    const cookies = new Cookies();
    const history = useHistory()

    const[file, setFile] = useState(null)
    const[dpFile, setDpFile] = useState(null)
    const[dpUrl, setDpUrl] = useState("")
    const[fileURL, setFileURL] = useState("")
    const [storyFile, setStoryFile] = useState(null)
    const [storyFileURL, setStoryFileURL] = useState("")
    const[uploadError, setUploadError] = useState("")
    const[uploadSuccessful, setUploadSuccessful] = useState(false)
    const[profileDetails, setProfileDetails] = useState(null)
    const[updateDetails, setUpdateDetails] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        bio: ''
    })
    const[updateDetailsSuccess, setUpdateDetailsSuccess] = useState(false)
    const[updateDetailsError, setUpdateDetailsError] = useState('')
    const[updatePassword, setUpdatePassword] = useState({
        old: "",
        new1: "",
        new2: ""
    })
    const[passwordError, setPasswordError] = useState("")
    const[passwordSuccess, setPasswordSuccess] = useState(false)
    const [caption, setCaption] = useState("")

    const [uploadScreen, setUploadScreen] = useState(false)
    const [storyUploadScreen, setStoryUploadScreen] = useState(false)
    const [editScreen, setEditScreen] = useState(false)
    const [changeDPScreen, setChangeDPScreen] = useState(false)
    const [dpChanged, setDpChanged] = useState(false)
    const [dpError, setDpError] = useState('')
    const [storyUploadSuccessful, setStoryUploadSuccessful] = useState(false)
    const [storyUploadError, setStoryUploadError] = useState(false)


    const[tab, setTab] = useState('edit-profile')

    const {username} = useParams()

    useEffect(() => {
        axios.get(`api/v1/user/getUserData/${username}`, {headers: GetHeaders()})
            .then(res => res.data)
            .then(data => {
                setProfileDetails(data)
                setUpdateDetails({
                    firstName: data.firstName+" "+data.lastName,
                    lastName: '',
                    username: data.username,
                    email: data.email,
                    bio: data.bio||''
                })
            })
            .catch(err => {
                console.log(err);
            })   
    }, [username, uploadSuccessful, dpChanged, storyUploadSuccessful])

    let ref = useRef(null);
    let scrollRight = () => {
        ref.current.scrollLeft += 250;
    }

    let scrollLeft = (e) => {
        ref.current.scrollLeft -= 250;
    }

    const processFileInput = (e) => {
        console.log(e.target.files[0])
        if(e.target.files&&e.target.files[0]){
            setFile(e.target.files[0])
            setFileURL(URL.createObjectURL(e.target.files[0]))
        }
    }

    const processDpInput = (e) => {
        if(e.target.files&&e.target.files[0]){
            setDpFile(e.target.files[0])
            setDpUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const processStoryFileInput = (e) => {
        if(e.target.files&&e.target.files[0]){
            setStoryFile(e.target.files[0])
            setStoryFileURL(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleDpUpload = async () => {
        const url = 'api/v1/user/changeDisplayPic'
        const formData = new FormData()
        formData.append('image', dpFile)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `Bearer ${cookies.get('jwt')}`
            }
        }
        axios.post(url, formData, config)
        .then(resp => {
            if(resp.status!==200){
                setDpError('Something went wrong.')
            }else{
                setDpChanged(true)
                const newUserData = {
                    ...userData,
                    displayPic : resp.data.displayPic
                }
                dispatchUserData(newUserData)
                setTimeout(() => {
                    setDpFile(null)
                    setDpUrl("")
                    setChangeDPScreen(false)
                    setDpChanged(false)
                }, 1500)
            }
        })
    }

    const handleUpload = async () => {
        const url = 'api/v1/post/add'
        const formData = new FormData()
        formData.append('image', file)
        formData.append('caption', caption)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `Bearer ${cookies.get('jwt')}`
            }
        }
        axios.post(url, formData, config)
            .then(resp => {
                if(resp.status!==200){
                    setUploadError("Something went wrong.")
                }else{
                    postUploadSuccessful()
                }
            })
    }

    const storyHandleUpload = async () => {
        const url = 'api/v1/post/addStory'
        const formData = new FormData()
        formData.append('image', storyFile)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `Bearer ${cookies.get('jwt')}`
            }
        }
        axios.post(url, formData, config)
            .then(resp => {
                if(resp.status!==200){
                    setStoryUploadError("Story couldn't be uploaded.")
                }else{
                    afterStoryUploadSuccessful()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const afterStoryUploadSuccessful = () => {
        setStoryUploadSuccessful(true)
        setTimeout(() => {
            setStoryFile(null)
            setStoryFileURL("")
            setStoryUploadScreen(false)
            setStoryUploadSuccessful(false)
        }, 1500)
    }

    const postUploadSuccessful = () => {
        setUploadSuccessful(true)
        setTimeout(() => {
            setFile(null)
            setFileURL("")
            setCaption("")
            setUploadScreen(false)
            setUploadSuccessful(false)
        }, 1500);
    }

    const removePhotoHandler = () => {
        setFileURL("")
        setFile(null)
    }

    const removeDpPhotoHandler = () => {
        setDpUrl("")
        setDpFile(null)
    }

    const removeStoryPhotoHandler = () => {
        setStoryFileURL("")
        setStoryFile(null)
    }

    const changePasswordHandler = () => {
        if(updatePassword.old===""||updatePassword.new1===""||updatePassword.new2===""){
            setPasswordError('Fill all the text boxes.')
            return
        }
        if(updatePassword.new1!==updatePassword.new2){
            setPasswordError('Passwords did not match.')
            return
        }
        setPasswordError("")
        axios.post('api/v1/user/changePassword', {
            currentPassword: updatePassword.old,
            newPassword: updatePassword.new1
        }, {headers: GetHeaders()})
        .then(resp => resp.data)
        .then(data => {
            cookies.set('jwt', data.accessToken, {path: '/', maxAge: 24*60*60})
            let user = jwtDecode(data.accessToken)
            dispatchUserData(user)
            setPasswordSuccess(true)
            setUpdatePassword({old: "", new1: "", new2: ""})
            setTimeout(() => {
                setPasswordSuccess(false)
            }, 1500)
        })
        .catch(err => {
            setPasswordError('Wrong current password.')
        })
    }

    const updateDetailsHandler = () => {
        if(updateDetails.username===""||updateDetails.name===""||updateDetails.email===""){
            setUpdateDetailsError('You left some important columns unfilled.')
            return
        }
        axios.post('/api/v1/user/updateUserDetails', {newDetails: updateDetails}, {headers: GetHeaders()})
        .then(resp => resp.data)
        .then(data => {
            cookies.set('jwt', data.accessToken, {path: '/', maxAge: 24*60*60})
            let user = jwtDecode(data.accessToken)
            dispatchUserData(user)
            setProfileDetails(data.user)
            setUpdateDetailsError('')
            setUpdateDetailsSuccess(true)
            setTimeout(() => {
                setUpdateDetailsSuccess(false)
            }, 1500);
            history.push(`/profile/${data.user.username}`)
        })
        .catch(err => {
            setUpdateDetailsError('Username/email already taken.')
        })
    }

    let myPostsList = null;
    if(profileDetails?.posts){
        myPostsList = profileDetails.posts.slice(0).map(post => {
            return (
                <div key={post.image} className="h-100 bg-red-100 flex justify-items-center">
                    <img className="w-72" src={post.image} alt=""/>
                </div>
            )
        })
    }

    return (
        <>
        <Navbar/>
        <div className="flex flex-col w-full max-w-4xl md:p-8 mx-auto mt-4">

            {/* header */}
            <div className="header flex flex-row items-start mb-11">
                <img src={profileDetails?.displayPic} className="rounded-full w-20 h-20 md:w-36 md:h-36 ml-6 mr-6 md:ml-16 md:mr-16 object-cover" alt=""/>
                <section className="flex flex-col ml-6 content-center mt-2 md:mt-0 w-11/12 md:w-full">
                    <div className="flex flex-col md:flex-row items-start md:items-center mb-5">
                        <div className="flex flex-row">
                            <h2 className="order-1  text-2xl">{profileDetails?.username}</h2>
                            {username===userData.username&&<div className="ml-6 order-2 md:order-3">
                                <SettingsIcon/>
                            </div>}
                        </div>
                        {username===userData.username&&
                        <>
                            <button className="order-3 md:order-2 mt-2 md:mt-0 border border-gray-200 pl-4 pr-4 pt-1 pb-1 pt md:ml-4 w-11/12 md:w-32 text-sm rounded-md" onClick={() =>setEditScreen(!editScreen)}>Edit Profile</button>
                            <button className="order-4 md:order-3 mt-2 md:mt-0 border border-gray-200 pl-4 pr-4 pt-1 pb-1 pt md:ml-4 w-11/12 md:w-32 text-sm rounded-md" onClick={() =>setUploadScreen(!uploadScreen)}>Add New Post</button>
                            <button className="order-4 md:order-3 mt-2 md:mt-0 border border-gray-200 pl-4 pr-4 pt-1 pb-1 pt md:ml-4 w-11/12 md:w-32 text-sm rounded-md" onClick={() =>setStoryUploadScreen(!storyUploadScreen)}>Add Story</button>                        
                        </>}
                    </div>

                    <div className="flex mb-5">
                        <div className="mr-5 md:mr-10 text-gray-700"><span className="text-black">18</span> posts</div>
                        <div className="mr-5 md:mr-10 text-gray-700"><span className="text-black">146</span> followers</div>
                        <div className="mr-5 md:mr-10 text-gray-700"><span className="text-black">97</span> following</div>
                    </div>
                    <div className="flex flex-col font-bold">
                        <div className="font-extrabold">{`${profileDetails?.firstName} ${profileDetails?.lastName}`}</div>
                        <span className="text-gray-500">{profileDetails?.bio}</span>
                    </div>
                </section>
            </div>

            {/* stories */}
            <div className="relative overflow-hidden" >
                <div className="stories flex flex-row mb-11 overflow-x-scroll" ref={ref}>
                    <div className="text-center ml-4 md:ml-8">
                        <div className="border-2 border-gray-300 rounded-full mb-2">
                            <img src={storyImg1} className="w-14 md:w-20 rounded-full border-2 md:border-4 border-white" alt="story img"/>
                        </div>
                        <div className="w-14 md:w-20 overflow-hidden whitespace-nowrap overflow-ellipsis">beach</div>
                    </div>
                    <div className=" text-center ml-4 md:ml-8">
                        <div className="border-2 border-gray-300 rounded-full mb-2">
                            <img src={storyImg2} className="w-14 md:w-20 rounded-full border-2 md:border-4 border-white" alt="story img"/>
                        </div>
                        <div className="w-14 md:w-20 overflow-hidden whitespace-nowrap overflow-ellipsis">mountains</div>
                    </div>
                </div>
                <div className="absolute top-1/4 scroll__button">
                    <button onClick={scrollLeft} className="text-white bg-black rounded-full bg-opacity-50 outline-0"><KeyboardArrowLeftIcon /></button>
                </div>
                <div className="absolute top-1/4 right-5 scroll__button">
                    <button onClick={scrollRight} className="text-white bg-black rounded-full bg-opacity-50 outline-0"><KeyboardArrowRightIcon /></button>
                </div>
            </div>

            {/* profile menu */}
            <div className="border-t-2 flex justify-evenly md:block text-center border-gray-200">
                <a href="#link" className="md:mr-14 border-t-2 inline-block border-black -mt-0.1 p-3 text-sm">
                    <ListAltOutlinedIcon className="text-3xl md:text-2xl"/>
                    <span className="ml-2 hidden md:inline-block">POSTS</span>
                </a>
                <a href="#link" className="md:mr-14 items-center inline-block -mt-1 p-3 text-sm">
                    <LiveTvIcon className="text-3xl md:text-2xl"/>
                    <span className="ml-2 hidden md:inline-block">IGTV</span>
                </a>
                <a href="#link" className="md:mr-14 inline-block -mt-1 p-3 text-sm">
                    <BookmarkBorderIcon className="text-3xl md:text-2xl"/>
                    <span className="ml-2 hidden md:inline-block">SAVED</span>
                </a>
                <a href="#link" className="md:mr-14 inline-block -mt-1 p-3 text-sm">
                    <AssignmentIndOutlinedIcon className="text-3xl md:text-2xl"/>
                    <span className="ml-2 hidden md:inline-block">TAGGED</span>
                </a>
            </div>

            {/* posts */}
            {myPostsList?.length > 0 ? 
                <div className="posts__container grid gap-1 md:gap-5 grid-cols-3 mt-2">
                    {myPostsList }
                </div>
                : 
                <div className="text-center">No Posts</div>
            }
            <Footer/>

            {/* image upload */}
            {uploadScreen&&
                <div onClick={() => setUploadScreen(false)} className="glass flex bg-black bg-opacity-20 w-full h-full fixed top-0 left-0 z-10 p-0 m-0">
                    <div className="bg-insta-gray w-96 p-10 mx-auto my-auto rounded-xl relative" onClick={(e) => e.stopPropagation()}>
                        <button className="text-gray-400 hover:text-red-500 text-xl absolute top-1.5 right-1.5 px-2" onClick={() => setUploadScreen(false)}><i className="fas fa-times"></i></button>
                        {uploadSuccessful?<div className="w-full bg-green-100 my-1 py-2 text-center rounded-lg text-green-500">
                            Post Successfully Uploaded!
                        </div>:
                        <><h1 className="font-yellowtail text-3xl absolute -top-10 left-0 text-insta-gray">add new post</h1>
                        {fileURL&&<>
                            <img src={fileURL} alt="Preview" onClick={() => document.getElementById("imageInput").click()} className="w-full rounded-lg mb-1"/>
                            <button className="my-1 bg-insta-gray hover:bg-red-100 text-insta-redheart w-full p-2 rounded-lg text-sm font-bold" onClick={removePhotoHandler}>REMOVE PHOTO</button>
                        </>}
                        <label htmlFor="Uploadimage" className="bg-red-300">
                            <input type="file" accept=".jpg,.jpeg,.png" id="imageInput" className=" hidden" onChange={e => processFileInput(e)}/>
                            {!file&&<button className={` ${file?"bg-gray-500":"bg-insta-black"} my-1 text-insta-gray py-3 w-full text-sm rounded-lg`} onClick={() => document.getElementById("imageInput").click()}>{file?"Photo Selected":"Select Photo"}</button>}
                        </label>
                        <input type="text" className="my-1 bg-gray-200 p-3 text-gray-700 w-full rounded-lg text-sm" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption"/>
                        {uploadError&&<div className="w-full bg-red-100 my-1 py-2 text-center rounded-lg text-red-500">
                            {uploadError}
                        </div>}
                        <button disabled={!file} className={`my-1 ${file?"bg-insta-redheart hover:bg-red-400":"bg-gray-300"} text-insta-gray w-full p-2 rounded-lg text-sm font-bold`} onClick={handleUpload}>UPLOAD POST</button>
                        </>}
                    </div>
                </div>
            }
            {editScreen&&
                <div onClick={() => setEditScreen(false)} className="glass flex bg-black bg-opacity-20 w-full h-full fixed top-0 left-0 z-10 p-0 m-0">
                    <div className="bg-insta-gray p-10 mx-auto mt-32 h-90  rounded-xl relative" onClick={(e) => e.stopPropagation()}>
                        <button className="text-gray-400 hover:text-red-500 text-xl absolute top-1.5 right-1.5 px-2" onClick={() => setEditScreen(false)}><i className="fas fa-times"></i></button>
                        <div className="flex flex-row h-full">
                            <div className="h-100 border-r border-insta-border-gray w-36">
                                <button className={`text-sm w-full p-2 px-4 text-left text-gray-500 hover:text-gray-800 hover:bg-insta-gray ${tab==='edit-profile'&&"border-l-2 border-insta-black"} focus:outline-none`} onClick={() => {setTab("edit-profile")}}>Edit Profile</button>
                                <button className={`text-sm w-full p-2 px-4 text-left text-gray-500 hover:text-gray-800 hover:bg-insta-gray ${tab==='change-pass'&&"border-l-2 border-insta-black"} focus:outline-none`} onClick={()=> {setTab("change-pass")}}>Change Password</button>
                            </div>
                            {tab==='edit-profile'&&
                            <div className="pl-4 flex flex-row">
                                <div className="w-28  flex flex-col">
                                    <div className="bg-red-500 w-12 h-12 ml-auto rounded-full">
                                        <img src={profileDetails?.displayPic} alt="dp" className="rounded-full h-full w-full border"/>
                                    </div>
                                    <div className="ml-auto pt-2 font-bold">
                                        Name
                                    </div>
                                    <div className="ml-auto pt-2 font-bold">
                                        Username
                                    </div>
                                    <div className="ml-auto pt-2 font-bold">
                                        Email
                                    </div>
                                    <div className="ml-auto pt-2 font-bold">
                                        Bio
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className=" w-full ml-4 h-12">
                                        <b>{updateDetails?.username}</b><br/>
                                        <button className="text-insta-blue text-sm p-0 focus:outline-none" onClick={() => setChangeDPScreen(!changeDPScreen)}>Change Profile Photo</button>
                                    </div>
                                    <div className="w-full ml-4 pt-2">
                                        <input type="text" className="w-full bg-transparent border-insta-border-gray border px-1.5 rounded-sm text-sm" value={updateDetails?.firstName} onChange={e => setUpdateDetails({...updateDetails, firstName: e.target.value, lastName: ""})}/>
                                    </div>
                                    <div className="w-full ml-4 pt-2">
                                        <input type="text" className="w-full bg-transparent border-insta-border-gray border px-1.5 rounded-sm text-sm" value={updateDetails?.username} onChange={e => setUpdateDetails({...updateDetails, username: e.target.value})}/>
                                    </div>
                                    <div className="w-full ml-4 pt-2">
                                        <input type="text" className="w-full bg-transparent border-insta-border-gray border px-1.5 rounded-sm text-sm" value={updateDetails?.email} onChange={e => setUpdateDetails({...updateDetails, email: e.target.value})}/>
                                    </div>
                                    <div className="w-full ml-4 pt-2">
                                        <textarea type="text" className="w-full bg-transparent border-insta-border-gray border px-1.5 rounded-sm text-sm" value={updateDetails?.bio} onChange={e => setUpdateDetails({...updateDetails, bio: e.target.value})}/>
                                    </div>
                                    {updateDetailsError&&<div className="absolute right-2 bottom-14 rounded-md p-2 border border-red-400 text-red-400 bg-red-100">
                                        {updateDetailsError}
                                    </div>}
                                    {updateDetailsSuccess&&<div className="absolute right-2 bottom-14 rounded-md p-2 border border-green-400 text-green-400 bg-green-100">
                                        User details updated successfully.
                                    </div>}
                                    <button className="bg-insta-blue hover:bg-insta-blue-light p-2 text-white text-sm rounded-md mt-auto ml-auto absolute right-2 bottom-2" onClick={updateDetailsHandler}>UPDATE DETAILS</button>
                                </div>
                            </div>}
                            {tab==='change-pass'&&
                            <div className="pl-4 flex flex-row">
                                <div className="w-28  flex flex-col">
                                    <div className="bg-red-500 w-12 h-12 ml-auto rounded-full">
                                        <img src={profileDetails?.displayPic} alt="dp" className="rounded-full h-full w-full border"/>
                                    </div>
                                    <div className="ml-auto pt-2 font-bold">
                                        Old Password
                                    </div>
                                    <div className="ml-auto pt-2 font-bold">
                                        New Password
                                    </div>
                                    <div className="ml-auto pt-2 font-bold text-right">
                                        Confirm New Password
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="w-full ml-4 h-12 flex row">
                                        <div className="my-auto">{profileDetails?.username}</div><br/>
                                    </div>
                                    <div className="w-full ml-4 pt-2">
                                        <input type="Password" className="w-full bg-transparent border-insta-border-gray border px-1.5 rounded-sm text-sm" value={updatePassword?.old} onChange={(e)=> setUpdatePassword({...updatePassword, old: e.target.value})}/>
                                    </div>
                                    <div className="w-full ml-4 pt-2">
                                        <input type="Password" className="w-full bg-transparent border-insta-border-gray border px-1.5 rounded-sm text-sm" value={updatePassword?.new1} onChange={(e)=> setUpdatePassword({...updatePassword, new1: e.target.value})}/>
                                    </div>
                                    <div className="w-full ml-4 pt-2">
                                        <input type="Password" className="w-full bg-transparent border-insta-border-gray border px-1.5 rounded-sm text-sm" value={updatePassword?.new2} onChange={(e)=> setUpdatePassword({...updatePassword, new2: e.target.value})}/>
                                    </div>
                                    {passwordError&&<div className="absolute right-2 bottom-14 rounded-md p-2 border border-red-400 text-red-400 bg-red-100">
                                        {passwordError}
                                    </div>}
                                    {passwordSuccess&&<div className="absolute right-2 bottom-14 rounded-md p-2 border border-green-400 text-green-400 bg-green-100">
                                        Password changed successfully.
                                    </div>}
                                    <button className="bg-insta-blue hover:bg-insta-blue-light p-2 text-white text-sm rounded-md mt-auto ml-auto absolute right-2 bottom-2" onClick={changePasswordHandler}>CHANGE PASSWORD</button>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            }
            {changeDPScreen&&
                <div onClick={() => setChangeDPScreen(false)} className="glass flex bg-black bg-opacity-20 w-full h-full fixed top-0 left-0 p-0 m-0 z-50">
                    <div className="bg-insta-gray w-96 p-10 mx-auto my-auto rounded-xl relative" onClick={(e) => e.stopPropagation()}>
                        <button className="text-gray-400 hover:text-red-500 text-xl absolute top-1.5 right-1.5 px-2" onClick={() => setChangeDPScreen(false)}><i className="fas fa-times"></i></button>
                        {dpChanged?<div className="w-full bg-green-100 my-1 py-2 text-center rounded-lg text-green-500">
                            Profile Pic Updated!
                        </div>:
                        <><h1 className="font-yellowtail text-3xl absolute -top-10 left-0 text-insta-gray">update profile picture</h1>
                        {dpUrl&&<>
                            <img src={dpUrl} alt="Preview" onClick={() => document.getElementById("dpInput").click()} className="w-full rounded-lg mb-1"/>
                            <button className="my-1 bg-insta-gray hover:bg-red-100 text-insta-redheart w-full p-2 rounded-lg text-sm font-bold" onClick={removeDpPhotoHandler}>REMOVE PHOTO</button>
                        </>}
                        <label htmlFor="ProfileUploadImage" className="bg-red-300">
                            <input type="file" accept=".jpg,.jpeg,.png" id="dpInput" className=" hidden" onChange={e => processDpInput(e)}/>
                            {!dpFile&&<button className={` ${dpFile?"bg-gray-500":"bg-insta-black"} my-1 text-insta-gray py-3 w-full text-sm rounded-lg`} onClick={() => document.getElementById("dpInput").click()}>{dpFile?"Photo Selected":"Select Photo"}</button>}
                        </label>
                        {dpError&&<div className="w-full bg-red-100 my-1 py-2 text-center rounded-lg text-red-500">
                            {dpError}
                        </div>}
                        <button disabled={!dpFile} className={`my-1 ${dpFile?"bg-insta-redheart hover:bg-red-400":"bg-gray-300"} text-insta-gray w-full p-2 rounded-lg text-sm font-bold`} onClick={handleDpUpload}>UPLOAD PHOTO</button>
                        <button className={`my-1 bg-red-100 hover:bg-red-400 hover:text-white text-insta-redheart w-full p-2 rounded-lg text-sm font-bold`} onClick={handleDpUpload}>REMOVE PROFILE PICTURE</button>

                        </>}
                    </div>
                </div>
                }
                {storyUploadScreen&&
                            <div onClick={() => setStoryUploadScreen(false)} className="glass flex bg-black bg-opacity-20 w-full h-full fixed top-0 left-0 z-30 p-0 m-0">
                                <div className="bg-insta-gray w-96 p-10 mx-auto my-auto rounded-xl relative" onClick={(e) => e.stopPropagation()}>
                                    <button className="text-gray-400 hover:text-red-500 text-xl absolute top-1.5 right-1.5 px-2" onClick={() => setStoryUploadScreen(false)}><i className="fas fa-times"></i></button>
                                    {storyUploadSuccessful?<div className="w-full bg-green-100 my-1 py-2 text-center rounded-lg text-green-500">
                                        Story Successfully Uploaded!
                                    </div>:
                                    <><h1 className="font-yellowtail text-3xl absolute -top-10 left-0 text-insta-gray">add new story</h1>
                                    {storyFileURL&&<>
                                        <img src={storyFileURL} alt="Preview" onClick={() => document.getElementById("storyImageInput").click()} className="w-full rounded-lg mb-1"/>
                                        <button className="my-1 bg-insta-gray hover:bg-red-100 text-insta-redheart w-full p-2 rounded-lg text-sm font-bold" onClick={removeStoryPhotoHandler}>REMOVE PHOTO</button>
                                    </>}
                                    <label htmlFor="Uploadimage" className="bg-red-300">
                                        <input type="file" accept=".jpg,.jpeg,.png" id="storyImageInput" className=" hidden" onChange={e => processStoryFileInput(e)}/>
                                        {!storyFile&&<button className={` ${storyFile?"bg-gray-500":"bg-insta-black"} my-1 text-insta-gray py-3 w-full text-sm rounded-lg`} onClick={() => document.getElementById("storyImageInput").click()}>{storyFile?"Photo Selected":"Select Photo"}</button>}
                                    </label>
                                    {storyUploadError&&<div className="w-full bg-red-100 my-1 py-2 text-center rounded-lg text-red-500">
                                        {storyUploadError}
                                    </div>}
                                    <button disabled={!storyFile} className={`my-1 ${storyFile?"bg-insta-redheart hover:bg-red-400":"bg-gray-300"} text-insta-gray w-full p-2 rounded-lg text-sm font-bold`} onClick={storyHandleUpload}>UPLOAD STORY</button>
                                    </>}
                                </div>
                            </div>
                        }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.user.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUserData: (user) => {dispatch(addUserData(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
