import { FC, useContext, useState } from 'react';
import styles from './ModalCreateRepos.module.scss';
import { Context } from '../../index';
import { RouteNames } from '../../router';
import { useNavigate } from 'react-router-dom';


interface IModalCreateReposProps {
    closeWindow: () => void;
    updateHandle: () => void
}

const ModalCreateRepository: FC<IModalCreateReposProps> = ({closeWindow, updateHandle}) => {
    const [titleRepos, setTitleRepos] = useState('');
    const {store} = useContext(Context);
    const navigate = useNavigate();

    return (<div className={styles.createRep}>
        <h2 className={styles.pTitle}>Создание репозитория</h2>
        <div className={styles.wrapper}>
            <input
                className={styles.titleInput}
                placeholder='Введите название репозитория'
                type='text'
                value={titleRepos}
                onChange={e => {
                    setTitleRepos(e.target.value);
                }}
            />
            <button
                className={styles.createBtn}
                onClick={() => {
                    store.createRepos(titleRepos);
                    updateHandle();
                    closeWindow();
                }}
            >Создать репозиторий
            </button>
        </div>
    </div>)
}

export default ModalCreateRepository