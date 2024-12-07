import React, { useContext, useEffect, useState } from 'react';
import styles from "./Repositories.module.scss"
import { Context } from '../../index';
import ReposListItem from '../ReposListItem/ReposListItem';
import ModalWindow from '../ModalWindow/ModalWindow';
import { observer } from 'mobx-react-lite';
import ModalCreateRepository from '../ModalCreateRepository/ModalCreateRepository';

const Repositories = () => {
    const {store} = useContext(Context)

    const [modalIsOpen, setModalIsOpen] = useState(false);
    let repList = store.repositoryLists;

    const updateRepositoryList = () => {
        store.findAllRepos().then(() => {
            repList = store.repositoryLists
        })
    }

    const handleClose = () => {
        setModalIsOpen(false)
    }

    useEffect(() => {
        store.findAllRepos().then(() => {
            repList = store.repositoryLists
        })
    }, [repList])

    return (
        <div className={styles.repos}>
            {modalIsOpen && <ModalWindow closeModal={handleClose}>
                <ModalCreateRepository closeWindow={handleClose} updateHandle={updateRepositoryList}/>
			</ModalWindow>}
            <div className={styles.title}>
                <h2 className={styles.h2}>Репозитории</h2>
                <button
                    className={styles.createRepBtn}
                    onClick={() => {
                        setModalIsOpen(true);
                    }}
                > Создать репозиторий </button>

            </div>

            <div className={styles.reposList}>{store.repositoryLists.map((item) => {
                return <ReposListItem {...item} updateHandle={updateRepositoryList}></ReposListItem>
            })}</div>

        </div>
    )
}

export default observer(Repositories);