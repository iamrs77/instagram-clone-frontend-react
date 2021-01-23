import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Index'
import Post from '../Post/Index'
import Stories from '../Stories/Index'
import Suggestions from './Suggestions'
import { connect } from "react-redux";
import axios from '../../utils/axios';
import GetHeaders from '../../utils/headers';
import { addPostsData } from '../../redux/actions/postActions'

function Home(props) {

    const [isOpenStory, setIsOpenStory] = useState(false);

    let [stories, setStories] = useState([])
    useEffect(() => {
        axios.get('api/v1/post/getAllStories', {headers: GetHeaders()}).then(res => {
            let storiesRaw = res.data
            let seenStories = []
            let unseenStories = []
            storiesRaw.map(story => {
                if(story.viewedBy.includes(props.userData.id)){
                    story = {
                        ...story,
                        seen: true
                    }
                    seenStories.push(story)
                }else{
                    story = {
                        ...story,
                        seen: false
                    }
                    unseenStories.push(story)
                }
            })
            storiesRaw = [...unseenStories, ...seenStories]
            setStories(storiesRaw);
            console.log(storiesRaw)
        }).catch(err => {
            console.log(err);
        })
    }, [isOpenStory])
    
    return (
        <div>
            <Navbar/>
            <div className="flex flex-row max-w-4.5xl mx-auto">
                <div className="max-w-xl w-full mx-auto lg:mx-0 flex flex-col">
                    <Stories stories={stories} isOpenStory={isOpenStory} setIsOpenStory={setIsOpenStory}/>
                    <Post/>
                </div>
                {/* <span className="hidden lg:block"> */}
                    <Suggestions userData={props.userData}/>
                {/* </span> */}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.user.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchPostsData: (posts) => dispatch(addPostsData(posts))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
