import { ICommit } from './ICommit';

export interface IBranches {
    branch_id: number;
    title: string;
    isMaster: boolean;
    repos_id: number;
    commits?: ICommit[];
}