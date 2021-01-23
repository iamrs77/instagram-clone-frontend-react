import React from 'react'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { removeUserData } from '../../redux/actions/userActions';
import { removePostsData } from '../../redux/actions/postActions';

function ProfileMenu(props) {
    let logout = () => {
        let cookies = new Cookies();
        cookies.remove('jwt', {path: '/'});
        props.removeUserData()
        props.removePostsData()
        props.history.push('/signin')
    }

    return (
        <div className="w-56 mt-4 bg-white shadow-custom rounded-lg relative">
            <div className="rotated-square w-4 h-4 transform rotate-45 border-l-2 border-t-2 bg-white absolute -top-2 right-10"></div>
            <div className="menu relative z-20">
                <ul>
                    <Link to={`/profile/${props.userData?.username}`}><li className="p-2 flex items-center text-sm cursor-pointer hover:bg-gray-50" onClick={props.toggleMenu}><PersonOutlineOutlinedIcon className="mr-2"/>Profile</li></Link>
                    <li className="p-2 flex items-center text-sm cursor-pointer hover:bg-gray-50"><BookmarkBorderIcon className="mr-2"/>Saved</li>
                    <li className="p-2 flex items-center text-sm cursor-pointer hover:bg-gray-50"><SettingsIcon className="mr-2"/>Settings</li>
                    <li className="p-2 flex items-center text-sm cursor-pointer hover:bg-gray-50"><CachedOutlinedIcon className="mr-2"/>Switch Accounts</li>
                    <li className="p-2 pl-3 border-t border-gray-300 text-sm cursor-pointer hover:bg-gray-50" onClick={logout}>Log Out</li>
                </ul>
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
        removeUserData: () => {dispatch(removeUserData())},
        removePostsData: () => {dispatch(removePostsData())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileMenu))
