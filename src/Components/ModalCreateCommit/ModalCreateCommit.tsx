import React, { FC, useState } from 'react';
import styles from './ModalCreateCommit.module.scss';

interface IModalCreateCommitProps {
    closeWindow: () => void;
    onFilesUploaded: (files: File[], message: string) => void;
}

const ModalCreateCommit: FC<IModalCreateCommitProps> = ({closeWindow, onFilesUploaded}) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [textAreaValue, setTextAreaValue] = useState('');

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragActive(false);
        const files = Array.from(event.dataTransfer.files);
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let files: File[] = []

        if (event.target.files !== null) {
            for (let i = 0; i < event.target.files.length; i++) {
                files.push(event.target.files[i])
            }
            setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        }
    };

    return (
        <div className={styles.modalCreateCommit}>
            <div className={styles.createCommitTitle}>
                <h2 className={styles.h2}>Создание репозитория</h2>
            </div>

            <div className={dragActive ? styles.onDragged : styles.noDragged}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    multiple
                    onChange={e => handleFileInput(e)}
                    className={styles.inputFiles}
                />
                <p className={styles.p}>Drag and drop files here or click to upload</p>
                <ul className={styles.addedFilesList}>
                    {uploadedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>

            <textarea className={styles.textArea}
                      placeholder='Введите комментарий для коммита'
                      value={textAreaValue}
                      onChange={(e) => {
                          setTextAreaValue(e.target.value);
                      }}
            />

            <button className={styles.createCommit}
                    disabled={
                        (textAreaValue === '') || (uploadedFiles.length == 0)
                    }
                    onClick={() => {
                        onFilesUploaded(uploadedFiles, textAreaValue);
                    }}
            >Создать коммит</button>
        </div>
    );
};

export default ModalCreateCommit;