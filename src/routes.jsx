import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import Dashboard from "./Owner/Dashboard";
import Write from "./pages/write/Write";
import HomeLayout from "./pages/homepage/HomeLayout";
import Settings from "./pages/settings/Settings";
import SinglePost from "./components/singlePost/SinglePost";
import Posts from "./components/posts/Posts";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>  
        
        <Route path="/" element={<Login/>}/>
        <Route path="buyer/" element={<Dashboard/>}>
            <Route path="getpost" element={<Posts/>}/>
        </Route> 
        <Route path="seller/" element={<HomeLayout/>}>
           <Route path="" element={<Homepage/>} />
           <Route path="post/:id" element={<SinglePost/>} />
           <Route path="write" element={<Write/>} />
           <Route path="settings" element={<Settings /> } />
        </Route>

        </>
       
    ))

 export default router;   