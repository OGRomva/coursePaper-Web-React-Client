import { FC, PropsWithChildren} from 'react';
import styles from './ModalWindow.module.scss';

interface IModalWindowProps {
    closeModal: () => void
}

const ModalWindows: FC<PropsWithChildren<IModalWindowProps>> = ({closeModal, children}) => {
    return (
        <div className={styles.modalBackground}>
            <div className={styles.interactiveBack} onClick={closeModal}>

            </div>
            <div className={styles.modalWindow}>
                {children}
            </div>
        </div>
    );
}

export default ModalWindows