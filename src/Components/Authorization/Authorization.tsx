import { FC, useContext, useState } from 'react';
import styles from './Authorization.module.scss';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';

interface IAuthorizationProps {

}

const Authorization: FC<IAuthorizationProps> = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { store } = useContext(Context);

    return <div className={styles.authorization}>
        <h2>Авторизация</h2>
        <div className={styles.inputWrapper}>
            <input
                className={styles.input}
                type="text"
                placeholder="username"
                onChange={e => setUsername(e.target.value)}
                value={username}
            />

            <input
                className={styles.input}
                type="password"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
        </div>

        <div className={styles.btnWrapper}>
            <button
                className={styles.button}
                onClick={() => store.login(username, password)}>
                Логин
            </button>
            <button
                className={styles.button}
                onClick={() => store.registration(username, password)}>
                Регистрация
            </button>
        </div>
    </div>;
};

export default observer(Authorization);