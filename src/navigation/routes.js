import Signin from '../components/Signin/Index';
import Profile from '../components/Profile/Index';
import Home from '../components/Home/Index';

let routes = [
    {
        key: 1,
        path: "/signin",
        components: [<Signin />],
    },
    {
        key: 2,
        path: "/profile/:username",
        components: [<Profile />],
    },
    {
        key: 3,
        path: "/",
        components: [<Home />],
    },

]

export default routes;