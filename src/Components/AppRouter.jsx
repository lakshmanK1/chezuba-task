import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import AllItems from "./Pages/AllItems";
import Dashboard from "./Pages/Dashboard";
import Login from "./Login";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/items" element={<RequireAuth><AllItems/></RequireAuth>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
    </Route>
));
