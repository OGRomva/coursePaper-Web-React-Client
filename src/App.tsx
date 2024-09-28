import React, { useContext, useEffect } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import Authorization from './Components/Authorization/Authorization';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import Repositories from './Components/Repositories/Repositories';
import { Route, Routes } from 'react-router-dom';
import { RouteNames, routes } from './router';

function App() {

    const {store} = useContext(Context)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
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
                    <Route path={RouteNames.REPOS} element={<Repositories/>}/>
                </Routes>
            </Layout>
        </div>
    );
}

export default observer(App);
