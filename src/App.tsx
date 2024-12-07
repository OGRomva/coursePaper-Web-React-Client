import React, { useContext, useEffect } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import Authorization from './Components/Authorization/Authorization';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import Repositories from './Components/Repositories/Repositories';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RouteNames } from './router';
import Repos from './Components/Reposiroty/Repos';
import FilePage from './Components/FilePage/FilePage';

function App() {

    const {store} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate(

    );
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
            if (store.isAuth) {
                navigate(RouteNames.REPOSLIST, {replace: true})
            }
        }
    }, [])

    if (!store.isAuth) {
        return <div className="App">
            <Layout>
                <Authorization />
            </Layout>
        </div>;
    }

    return (
        <div className="App">
            <Layout>
                <Routes>
                    <Route path={RouteNames.AUTH} element={<Authorization/>}/>
                    <Route path={RouteNames.REPOSLIST} element={<Repositories/>}/>
                    <Route path={RouteNames.FILES} element={<Repos/>}/>
                    <Route path={RouteNames.FILE} element={<FilePage/>}/>
                </Routes>
            </Layout>
        </div>
    );
}

export default observer(App);
