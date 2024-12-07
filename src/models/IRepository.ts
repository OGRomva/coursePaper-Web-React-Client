import { IBranches } from './IBranches';

export interface IRepository {
    repos_id: number;
    title: string;
    branches: IBranches[]
}