import { IBranches } from './IBranches';

export interface IRepositoryList {
    repos_id: number;
    title: string;
    branches: IBranches[]
}