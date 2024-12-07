import { FC, useContext, useState } from 'react';
import styles from './ModalCreateBranch.module.scss';
import { Context } from '../../index';


interface IModalCreateBranchProps {
    closeWindow: () => void
}

const ModalCreateBranch: FC<IModalCreateBranchProps> = ({closeWindow}) => {
    const [titleBranch, setTitleBranch] = useState('');
    const {store} = useContext(Context);

    return (<div className={styles.createBranch}>
        <h2 className={styles.pTitle}>Создание ветки</h2>
        <div className={styles.wrapper}>
            <input
                className={styles.titleInput}
                placeholder='Введите название ветки'
                type='text'
                value={titleBranch}
                onChange={e => {
                    setTitleBranch(e.target.value);
                }}
            />
            <button
                className={styles.createBtn}
                onClick={() => {
                    store.createBranch(titleBranch);
                    closeWindow();
                }}
            >Создать ветку
            </button>
        </div>
    </div>)
}

export default ModalCreateBranch