import { IBranches } from '../IBranches';

export interface ReposResponse {
    repos_id: number;
    title: string;
    owner_id: number;
    branches: IBranches[]
}