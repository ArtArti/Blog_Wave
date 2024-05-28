import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import Dashboard from "./Buyer/Dashboard";
import Write from "./pages/write/Write";
import HomeLayout from "./pages/homepage/HomeLayout";
import Settings from "./pages/settings/Settings";
import SinglePost from "./components/singlePost/SinglePost";
import Posts from "./components/posts/Posts";
import Verify from "./pages/login/Verify";
import Posts2 from "./components/posts/Posts2";
import Logout from "./pages/login/Logout";
// import Registration from "./pages/Register/Register";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>  
        
        {/* <Route path="/" element={<Login/>}/> */}
        <Route path="/" element={<Verify/>}/>
        <Route path="/register" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="buyer/" element={<Dashboard/>}>
            <Route path="getpost" element={<Posts/>}/>
        </Route> 
        <Route path="seller/" element={<HomeLayout/>}>
           <Route path="" element={<Homepage/>} />
           <Route path=":sellerId/posts" element={<Posts/>} />
           <Route path="post/:id" element={<SinglePost/>} />
           <Route path="write" element={<Write/>} />
           <Route path="settings" element={<Settings /> } />
        </Route>
       
        </>
       
    ))

 export default router;   
