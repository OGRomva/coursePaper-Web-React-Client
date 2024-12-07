import { FC } from 'react';
import { IFileRep } from '../../models/IFileRep';
import styles from './FileList.module.scss';
import FileListItem from './FileListItem/FileListItem';

interface IFileListProps {
    files: IFileRep[];
}

const FileList: FC<IFileListProps> = ({ files }) => {
    return (
        <div className={styles.fileList}> {
            files?.map((item) => {
                return <FileListItem item={item}></FileListItem>;
            })}
        </div>
    );
};

export default FileList;