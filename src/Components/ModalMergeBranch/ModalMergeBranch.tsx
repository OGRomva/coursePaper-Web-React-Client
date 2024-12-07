import React, { FC, useContext, useState } from 'react';
import styles from './ModalMergeBranch.module.scss';
import { Context } from '../../index';

interface IModalMergeBranchProps {
    closeWindow: () => void;
}
const ModalMergeBranch: FC<IModalMergeBranchProps> = ({closeWindow}) => {
    const {store} = useContext(Context);
    const brList = store.curBranches

    const [slaveBranch, setSlaveBranch] = useState(brList[0].branch_id);
    const [mainBranch, setMainBranch] = useState(brList[0].branch_id);
    const [textAreaValue, setTextAreaValue] = useState('');
    const [shouldDeleteBranch, setShouldDeleteBranch] = useState(false);

    return (
        <div className={styles.mergeWindow}>
            <div className={styles.mergeTitle}>
                <h2 className={styles.h2}>Слияние веток</h2>
                <hr className={styles.hr}/>
            </div>

            <div className={styles.comboBoxWrapper}>
                <div className={styles.comboBoxElement}>
                    <p className={styles.p}>В:</p>
                    <select
                        className={styles.comboBox}
                        defaultValue={mainBranch}
                        onChange={(e) => {
                            setMainBranch(+e.target.value)
                        }}
                    >
                        {brList.map((item) => {
                            return <option
                                className={styles.branchesOption}
                                value={item.branch_id}
                            >{item.title}</option>
                        })}
                    </select>
                </div>
                <div className={styles.comboBoxElement}>
                    <p className={styles.p}>Из:</p>
                    <select
                        className={styles.comboBox}
                        defaultValue={slaveBranch}
                        onChange={(e) => {
                            setSlaveBranch(+e.target.value)
                        }}
                    >
                        {brList.map((item) => {
                            return <option
                                className={styles.branchesOption}
                                value={item.branch_id}
                            >{item.title}</option>
                        })}
                    </select>
                </div>
            </div>
            <label className={styles.labelTextarea}>
                Комментарий для слияния
                <textarea className={styles.textarea} value={textAreaValue} onChange={(e) => {
                    setTextAreaValue(e.target.value);
                }}></textarea>
            </label>

            <div className={styles.confirmWrapper}>
                <button
                    className={styles.mergeBtn}
                    disabled={(mainBranch === slaveBranch)}
                    onClick={() => {
                        if (textAreaValue === '') {
                            alert('Заполните комментарий для слияния')
                        } else {
                            store.merge({
                                mainBranchId: mainBranch,
                                slaveBranchId: slaveBranch,
                                message: textAreaValue,
                                shouldDel: shouldDeleteBranch
                            })
                            closeWindow();
                        }
                    }}>Создать слияние веток
                </button>

                <label className={styles.label}>
                    <input type="checkbox" className={styles.checkBox} checked={shouldDeleteBranch} onChange={(e) => {
                        setShouldDeleteBranch(e.target.checked);
                    }} />
                    Удалить ветку {(store.curBranches.find((item) => {
                    return item.branch_id === slaveBranch;
                }))?.title} после слияния?
                </label>
            </div>
        </div>
    );
};

export default ModalMergeBranch;