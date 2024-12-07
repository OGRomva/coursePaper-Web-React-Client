import React, { FC, useContext } from 'react';
import { Context } from '../../index';
import styles from "./ReposListItem.module.scss"
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../router';
interface IReposListItemProps {
    repos_id: number;
    title: string;
    updateHandle: () => void;
}

const ReposListItem: FC<IReposListItemProps> = ({title, repos_id, updateHandle}) => {
    const {store} = useContext(Context);
    const navigate = useNavigate()

    return (<div className={styles.reposListItem}>
        <div className={styles.wrapper}>
            <p className={styles.titleListItem}>{title}</p>
            <div className={styles.btnWrap}>
                <button className={styles.btn} onClick={() => {
                    store.findByPk(repos_id).then(() => {
                        navigate(RouteNames.FILES, {replace: true})
                    });
                }}> Открыть
                </button>

                <button className={styles.btn} onClick={() => {
                    store.remove(repos_id).then(() => {
                        updateHandle();
                    })
                }}> Удалить
                </button>
            </div>
        </div>
        <hr className={styles.br}/>
    </div>);
}

export default ReposListItem