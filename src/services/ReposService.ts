import $api from '../http';
import { ReposResponse } from '../models/response/ReposResponse';

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
        return $api.get(`/repositories/${branch_id}/latest`)
    }

    static async getFileFromLatestCommit(file_id: number) {
        return $api.get(`/repositories/get-file/${file_id}`)
    }
}