import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import HomeIcon from "@material-ui/icons/Home";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProfileMenu from "../ProfileMenu/Index";
import { connect } from "react-redux";

const Navbar = ({userData}) => {

    let [isOpenMenu, setIsOpenMenu] = useState(false);

    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu)
    }

    return (
        <div className="h-13.5 border-b bg-white sticky top-0 z-10 mt-0">
            <div className="h-13.5 container max-w-4.5xl mx-auto flex flex-row px-2">
                <div className="my-auto flex-1 flex-shrink">
                    <Link to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                        alt="Instagram"
                        className="w-28 h-9.5 my-auto"
                    />
                    </Link>
                </div>
                <div className="w-0 sm:w-56 flex-shrink-0 flex">
                    <input
                        placeholder="&#128269; Search"
                        className="w-full bg-insta-gray  sm:border border-insta-border-gray my-auto h-7 text-xs rounded-sm text-center"
                    />
                </div>
                <div className="flex flex-row flex-1 flex-shrink-0">
                    <div className="my-auto pl-5 ml-auto flex-shrink-0">
                        <Link to="/">
                            <HomeIcon />
                        </Link>
                    </div>
                    <div className="my-auto pl-5 flex-shrink-0">
                        <MessageOutlinedIcon />
                    </div>
                    <div className="my-auto pl-5 flex-shrink-0">
                        <ExploreOutlinedIcon />
                    </div>
                    <div className="my-auto pl-5 flex-shrink-0">
                        <FavoriteBorderIcon />
                    </div>
                    <div className="my-auto  pl-5 flex-shrink-0 relative">
                        <div onClick={() => (setIsOpenMenu(!isOpenMenu))} className="h-5.5 w-5.5 border rounded-full border-insta-border-gray">
                            <img className="cursor-pointer rounded-full h-5.5 w-5.5 object-cover" src={userData?.displayPic} alt=""/>
                        </div>
                        {isOpenMenu ?
                        <div className="absolute -left-36 top-5">
                            <ProfileMenu toggleMenu={toggleMenu}/>
                        </div>
                        : ""}
                    </div> 
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.user.userData
    }
}

export default connect(mapStateToProps)(Navbar);
