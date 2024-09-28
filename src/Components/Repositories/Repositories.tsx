import {FC} from "react";
import styles from "./Repositories.module.scss"
import { useLocation, useNavigate } from 'react-router-dom';
interface IReposProps {

}

const Repositories: FC<IReposProps> = () => {
    const location = useLocation()
    const navigation = useNavigate();

    return (
        <div className={styles.repos}>
            <div className={styles.title}>
                <p className={styles.p}>Репозитории</p>
                <button className={styles.createRepBtn}> Создать репозиторий </button>
            </div>

        </div>
    )
}

export default Repositories;