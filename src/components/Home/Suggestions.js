import React from 'react'

function Suggestions({userData}) {
    return (
        <div className="hidden lg:block lg:h-84 lg:w-72  sticky max-w-xs right-0 top-20 lg:ml-7">
            <div className="w-full h-24 flex flex-row">
                <div className="h-14 w-14 my-auto">
                    <img src={userData?.displayPic} alt="display pic" className="h-14 w-14 rounded-full object-cover"/>
                </div>
                <div className="flex-1 h-16 my-auto flex flex-col justify-center pl-3">
                    <div className="text-xs font-bold text-insta-black">{userData?.username}</div>
                    <div className="text-sm text-insta-text-gray">{`${userData?.firstName} ${userData?.lastName}`}</div>
                </div>
                <div className="w-max my-auto text-xs font-bold text-insta-blue cursor-pointer">Switch</div>
            </div>
            <div className="w-full flex flex-row pb-2">
                <div className="text-sm font-semibold text-insta-text-gray flex-1">Suggestions For You</div>
                <div className="text-sm font-semibold text-insta-black w-max">See All</div>
            </div>
            <div className="w-full h-14 flex flex-row">
                <div className="h-10 w-10 my-auto rounded-full bg-insta-blue border border-insta-border-gray"></div>
                <div className="flex-1 h-10 my-auto flex flex-col justify-center pl-3">
                    <div className="text-sm font-bold text-insta-black">Random User</div>
                    <div className="text-xs text-insta-text-gray">New to Instagram</div>
                </div>
                <div className="w-max my-auto text-xs font-bold text-insta-blue">Follow</div>
            </div>
            <div className="w-full h-14 flex flex-row">
                <div className="h-10 w-10 my-auto rounded-full bg-insta-yellow border border-insta-border-gray"></div>
                <div className="flex-1 h-10 my-auto flex flex-col justify-center pl-3">
                    <div className="text-sm font-bold text-insta-black">Random User</div>
                    <div className="text-xs text-insta-text-gray">New to Instagram</div>
                </div>
                <div className="w-max my-auto text-xs font-bold text-insta-blue">Follow</div>
            </div>
            <div className="w-full h-14 flex flex-row">
                <div className="h-10 w-10 my-auto rounded-full bg-insta-redheart border border-insta-border-gray"></div>
                <div className="flex-1 h-10 my-auto flex flex-col justify-center pl-3">
                    <div className="text-sm font-bold text-insta-black">Random User</div>
                    <div className="text-xs text-insta-text-gray">New to Instagram</div>
                </div>
                <div className="w-max my-auto text-xs font-bold text-insta-blue">Follow</div>
            </div>
            <div className="w-full h-14 flex flex-row">
                <div className="h-10 w-10 my-auto rounded-full bg-insta-blue border border-insta-border-gray"></div>
                <div className="flex-1 h-10 my-auto flex flex-col justify-center pl-3">
                    <div className="text-sm font-bold text-insta-black">Random User</div>
                    <div className="text-xs text-insta-text-gray">New to Instagram</div>
                </div>
                <div className="w-max my-auto text-xs font-bold text-insta-blue">Follow</div>
            </div>
        </div>
    )
}

export default Suggestions
