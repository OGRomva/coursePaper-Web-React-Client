import React, {FC} from "react";
import styles from './Footer.module.scss'

interface IFooterProps {

}

const Footer: FC<IFooterProps> = () => {
    return <footer className={styles.footer}>
        <p className={styles.footerText}>Никакие права не защищены 2024</p>
    </footer>
}

export default Footer;