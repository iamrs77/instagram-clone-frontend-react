import InstagramIcon from '@material-ui/icons/Instagram';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import VolumeDownRoundedIcon from '@material-ui/icons/VolumeDownRounded';
import { useEffect, useState } from 'react';

function Story({closeStory, story, nextImage, prevImage}) {

    const[progress, setProgress] = useState(0)

    useEffect(() => {
        if(progress===100){
            setProgress(0)
            return 
        }
        setTimeout(() => {
            setProgress(progress+1)
            // console.log(progress)
        }, 30)
    }, [progress]);

    return (
        <div className="w-screen h-screen bg-insta-story z-10 fixed top-0 left-0">
            <div className="text-white relative mx-auto my-1 md:my-6 h-full w-full xs:h-9.5/10 xs:w-storyWidth ">
                <div className="flex w-full h-full">
                    <img className="object-cover w-full rounded-lg" src={story.image} alt=""/>
                </div>
                <div className="absolute top-2/4 left-2 xs:-left-12 cursor-pointer" onClick={prevImage}>
                    <ChevronLeftIcon className="text-black bg-insta-gray rounded-full"/>
                </div>
                <div className="absolute top-2/4 right-2 xs:-right-12 cursor-pointer rounded-full" onClick={nextImage}>
                    <ChevronRightIcon className="text-black bg-insta-gray rounded-full"/>
                </div>
                <div className="absolute bottom-5 w-full pl-5 pr-5">
                    <div className="pr-2 pl-2 pt-1 pb-1 border  rounded-full border-white">
                        <input className="w-full p-1 outline-0 text-white bg-transparent placeholder-white" type="text" placeholder={`Reply to ${story.userId?.username}`}/>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full p-5">
                    <div className="h-0.5 w-full bg-gray-400 mb-4">
                        <div style={{width: `${progress}%`}} className="bg-white h-0.5"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <img src={story.userId?.displayPic} alt="user profile" className="w-9 h-9 rounded-full" />
                            <div className="ml-2 text-sm">{story.userId?.username}</div>
                            {/* <div className="ml-2 text-sm opacity-50">9h</div> */}
                        </div>
                        <div className="flex items-center">
                            <PlayArrowRoundedIcon/>
                            <VolumeDownRoundedIcon />
                            <MoreHorizRoundedIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className="cursor-pointer absolute top-0 left-0 xs:top-4 xs:left-4 text-white z-20">
                <InstagramIcon className="text-white"/>
            </div>
            <div className="cursor-pointer absolute top-0 right-0 xs:top-4 xs:right-4 text-white z-20" onClick={closeStory}>
                <CloseIcon/>
            </div>
        </div>
    )
}

export default Story;
