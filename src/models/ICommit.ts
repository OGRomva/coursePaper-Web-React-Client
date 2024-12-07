import { IFileRep } from './IFileRep';

export interface ICommit {
    commit_id: number;
    branch_id: number;
    creator_id: number;
    message: string;
    files: IFileRep[];
}