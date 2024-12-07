import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import styles from './Repos.module.scss';
import ModalWindow from '../ModalWindow/ModalWindow';
import FileList from '../FileList/FileList';
import ModalCreateBranch from '../ModalCreateBranch/ModalCreateBranch';
import ModalMergeBranch from '../ModalMergeBranch/ModalMergeBranch';
import ModalCreateCommit from '../ModalCreateCommit/ModalCreateCommit';

const Repos = () => {
    const {store} = useContext(Context);
    const branches = store.curBranches;
    const [comboBoxValue, setComboBoxValue] = useState(store.mainBranch.branch_id);
    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
    const [modalMergeIsOpen, setModalMergeIsOpen] = useState(false);
    const [modalCreateCommitIsOpen, setModalCreateCommit] = useState(false);

    const handleModalCreateClose = () => {
        setModalCreateIsOpen(false)
    }

    const handleModalMergeClose = () => {
        setModalMergeIsOpen(false)
    }

    const handleModalCreateCommitClose = () => {
        setModalCreateCommit(false)
    }

    const filesUpload = (files: File[], message: string) => {
        store.uploadFiles(files, {
            message: message,
            branch_id: comboBoxValue,
            creator_id: store.user.user_id
        }).then(() => {
            store.getLastFilesFromBranch(comboBoxValue)
        })
    }


    useEffect(() => {
        store.findAllBranches().then(() => {
            store.getLastFilesFromBranch(comboBoxValue)
        })
    }, [comboBoxValue])

    return (<div className={styles.repos}>
        {modalCreateIsOpen && <ModalWindow closeModal={handleModalCreateClose}>
            <ModalCreateBranch closeWindow={handleModalCreateClose}/>
        </ModalWindow>}
        {modalMergeIsOpen && <ModalWindow closeModal={handleModalMergeClose}>
            <ModalMergeBranch closeWindow={handleModalMergeClose}/>
		</ModalWindow>}
        {modalCreateCommitIsOpen && <ModalWindow closeModal={handleModalCreateCommitClose}>
            <ModalCreateCommit closeWindow={handleModalCreateCommitClose} onFilesUploaded={filesUpload}/>
        </ModalWindow>}


        <div className={styles.titleWrapper}>
            <h2 className={styles.reposTitle}>Репозиторий: {store.currentRepos.title}</h2>
            <hr className={styles.hr}/>
            <div className={styles.branchTitle}>
                <select className={styles.branchesComboBox} onChange={(e) => {setComboBoxValue(+e.target.value);}} defaultValue={comboBoxValue}>
                    {branches.map((item) => {
                        return <option className={styles.branchesOption} value={item.branch_id}>{item.title}</option>
                    })}
                </select>

                <div className={styles.buttonBox}>
                    <button className={styles.btnCreateBranch} onClick={() => {setModalCreateIsOpen(true);}}
                    >Создать ветку</button>

                    <button className={styles.btnCreateBranch}
                            disabled={branches.find((branch) => branch.branch_id === comboBoxValue)?.isMaster}
                            onClick={() => {
                                store.removeBranchById(comboBoxValue);
                            }}
                    >Удалить ветку</button>

                    <button className={styles.btnCreateBranch}
                        onClick={() => {
                            setModalMergeIsOpen(true);
                        }}
                    >Соединить ветки</button>

                    <button className={styles.btnCreateBranch} onClick={() => {
                        store.downloadLatestFilesZip(comboBoxValue);
                    }}>Скачать файлы текущей ветки</button>

                    <button className={styles.btnCreateBranch} onClick={() => {
                        setModalCreateCommit(true)
                        }}>Добавить коммит</button>
                </div>
            </div>
        </div>

        <div className={styles.files}>
            <FileList files={store.curFileList} />
        </div>
    </div>)
}

export default observer(Repos);