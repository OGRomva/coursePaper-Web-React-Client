import { IBranches } from '../IBranches';

export interface ReposResponse {
    rep_id: number;
    title: string;
    owner_id: number;
    branches: IBranches[]
}