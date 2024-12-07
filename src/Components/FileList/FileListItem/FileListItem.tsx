import { IFileRep } from '../../../models/IFileRep';
import { FC, useContext } from 'react';
import styles from './FileListItem.module.scss';
import { Context } from '../../../index';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../../router';
interface IFileListItemProps {
    item: IFileRep;
}

const FileListItem: FC<IFileListItemProps> = ({item}) => {
    const {store} = useContext(Context);
    const navigation = useNavigate()
    return (<div
        className={styles.fileListItem}
        onClick={() => {
            store.getFile(item.fileRep_id, item.fileName).then(() => {
                navigation(RouteNames.FILE);
            })
        }}
    >
        {item.fileName}
    </div>)
}

export default FileListItem