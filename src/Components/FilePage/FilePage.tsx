import React, { useContext } from 'react';
import { Context } from '../../index';
import styles from './FilePage.module.scss'

const FilePage = () => {
    const {store} = useContext(Context);

    return (
        <div className={styles.filePage}>
            <div className={styles.filePageTitle}>
                <h2 className={styles.h2}>Файл {store.curFile.fileName}</h2>
                <hr className={styles.hr}/>
            </div>
            <div className={styles.textAreaContainer}>
                <textarea
                    disabled={true}
                    className={styles.textArea}
                >{store.curFile.data}</textarea>
            </div>
        </div>
    );
};

export default FilePage;