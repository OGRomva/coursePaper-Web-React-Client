import React, { FC, useContext, useEffect } from 'react';
import styles from './Header.module.scss'
import { Context } from '../../index';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../router';

interface IHeaderProps {

}

const Header: FC<IHeaderProps> = () => {
    const {store} = useContext(Context)
    const username = store.user.username;

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
            console.log(`currents page location is ${location}`);
        }, [location])

    if (store.isAuth) {
        return <header className={styles.header}>
            <p className={styles.headerUsernameP}> Добро пожаловать {username} </p>
            <div className={styles.btnWrapper}>
                <button className={styles.button} onClick={() => {
                    navigate(RouteNames.REPOS, {replace: true})
                }}> Репозитории</button>
                <button className={styles.button} onClick={() => store.logout()}> Выйти </button>
            </div>
        </header>;
    }

    return <header className={styles.header}>
        <p className={styles.headerUsernameP}> Добро пожаловать гость, пожалуйста, авторизуйтесь</p>
    </header>
}

export default Header;