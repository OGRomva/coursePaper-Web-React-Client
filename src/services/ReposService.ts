import $api from '../http';
import { ReposResponse } from '../models/response/ReposResponse';
import { IBranches } from '../models/IBranches';
import { IFileRep } from '../models/IFileRep';
import { ICreateMerge } from '../models/ICreateMerge';

export default class ReposService {
    static async findAllRepos() {
        return $api.get<ReposResponse[]>('/repositories/find-all');
    }

    static async create(title: string) {
        return $api.post<ReposResponse>('/repositories/create', {title})
    }

    static async remove(repos_id: number) {
        return $api.delete(`/repositories/${repos_id}`)
    }

    static async downloadLatest(branch_id: number) {
        const data = await $api.get(`/repositories/${branch_id}/download/latest`, { responseType: 'blob'})
        return data.data;
    }

    static async getFileFromLatestCommit(file_id: number) {
        const data = await $api.get(`/repositories/get-file/${file_id}`);
        return data.data;
    }

    static async getFilesFromLatestCommit(branch_id: number) {
        return $api.get<IFileRep[]>(`/repositories/get-file-list/${branch_id}/latest`);
    }

    static async findByPk(repos_id: number) {
        return $api.get<ReposResponse>(`/repositories/${repos_id}`);
    }

    static async findAllBranches(repos_id: number) {
        return $api.get<IBranches[]>(`/branch/${repos_id}/find-all`);
    }

    static async removeBranch(branch_id: number) {
        return $api.delete(`/branch/${branch_id}/delete`)
    }

    static async createBranch(title: string, repos_id: number) {
        return $api.post('/branch/create', {
            title: title,
            repos_id: repos_id,
            isMaster: false
        })
    }

    static async mergeBranches(dto: ICreateMerge) {
        return $api.post('branch/merge', dto)
    }
}