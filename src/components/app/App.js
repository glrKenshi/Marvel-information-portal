import { lazy, Suspense } from "react";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

// import {MainPage, ComicsPage, SingleComicPage, ErrorPage} from '../pages'

const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'))
const ErrorPage = lazy(() => import('../pages/ErrorPage'))

const App = () => {

    return (
         
        <Router>
            <div className="app">
                <AppHeader/>
                <Suspense fallback={<span>loading...</span>}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="/*" element={<ErrorPage/>}/>
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}

export default App;