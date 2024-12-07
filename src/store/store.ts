import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';
import { IRepository } from '../models/IRepository';
import ReposService from '../services/ReposService';
import { IBranches } from '../models/IBranches';
import { IFileRep } from '../models/IFileRep';
import { ICreateMerge } from '../models/ICreateMerge';
import { IFileData } from '../models/IFIleData';
import { ICreateCommit } from '../models/ICreateCommit';
import DownloadService from '../services/DownloadService';

export default class Store {

    user = {} as IUser;
    isAuth = false;
    repositoryLists: IRepository[] = [];
    currentRepos = {} as IRepository;
    curBranches: IBranches[] = [];
    mainBranch: IBranches = {} as IBranches;
    curFileList: IFileRep[] = [];
    curFile: IFileData = {} as IFileData;


    constructor() {
        makeAutoObservable(this);
    }

    setCurFile(value: IFileData) {
        this.curFile = value;
    }

    setCurFileList(value: IFileRep[]) {
        this.curFileList = value;
    }

    setMainBranch(value: IBranches) {
        this.mainBranch = value;
    }

    setCurBranches(value: IBranches[]) {
        this.curBranches = value;
    }

    setCurrentRepos(value: IRepository) {
        this.currentRepos = value;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setRepository(value: IRepository[]) {
        this.repositoryLists = value;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(username: string, password: string) {
        try {
            const res = await AuthService.login(username, password);
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('rToken', res.data.refreshToken);

            this.setAuth(true);
            this.setUser(res.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(username: string, password: string) {
        try {
            const res = await AuthService.registration(username, password);
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('rToken', res.data.refreshToken);

            this.setAuth(true);
            this.setUser(res.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('rToken');
            this.setAuth(false);
            this.setUser({} as IUser);
            this.setRepository([]);
            this.setCurFileList([]);
            this.setCurrentRepos({} as IRepository);
            this.setCurBranches([]);
            this.setMainBranch({} as IBranches);
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('rToken')}`,
                },
            });

            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('rToken', response.data.refreshToken);

            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async findAllRepos() {
        try {
            const res = await ReposService.findAllRepos();
            this.setRepository(res.data.map((item) => {
                return {
                    branches: item.branches,
                    repos_id: item.repos_id,
                    title: item.title,
                };
            }));
            this.setMainBranch({} as IBranches);
            this.setCurBranches([]);
            this.setCurFileList([]);
        } catch (e) {
            console.log(e);
        }
    }

    async findByPk(repos_id: number) {
        try {
            const res = await ReposService.findByPk(repos_id);
            this.setCurrentRepos(res.data);
            await this.findAllBranches();
        } catch (e) {
            console.log(e);
        }
    }

    async remove(repos_id: number) {
        try {
            await ReposService.remove(repos_id);
        } catch (e) {
            console.log(e);
        }
    }

    async createRepos(title: string) {
        try {
            await ReposService.create(title);
        } catch (e) {
            console.log(e);
        }
    }

    async findAllBranches() {
        try {
            const res = await ReposService.findAllBranches(this.currentRepos.repos_id);
            this.setCurBranches(res.data);
            await this.findMainBranch();
        } catch (e) {
            console.log(e);
        }
    }

    async findMainBranch() {
        try {
            const mainBranch = this.curBranches.find((branch) => {
                return branch.isMaster;
            });
            if (mainBranch) {
                this.setMainBranch(mainBranch);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getLastFilesFromBranch(branch_id: number) {
        try {
            const res = await ReposService.getFilesFromLatestCommit(branch_id);
            this.setCurFileList(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    async removeBranchById(branch_id: number) {
        try {
            await ReposService.removeBranch(branch_id);
            await this.findAllBranches();
        } catch (e) {
            console.log(e);
        }
    }

    async createBranch(title: string) {
        try {
            await ReposService.createBranch(title, this.currentRepos.repos_id);
            await this.findAllBranches();
        } catch (e) {
            console.log(e);
        }
    }

    async merge(dto: ICreateMerge) {
        try {
            await ReposService.mergeBranches(dto);
            await this.findAllBranches();
            await this.getLastFilesFromBranch(dto.mainBranchId);
        } catch (e) {
            console.log(e);
        }
    }

    async downloadLatestFilesZip(branch_id: number) {
        try {
            const res = await ReposService.downloadLatest(branch_id);
            const href = URL.createObjectURL(res);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${branch_id}.zip`)
            document.body.appendChild(link);
            link.click();
            document.removeChild(link);
            URL.revokeObjectURL(href);
        } catch (e) {
            console.log(e);
        }
    }

    async getFile(file_id: number, fileName: string) {
        try {
            const file = await ReposService.getFileFromLatestCommit(file_id);
            this.setCurFile({
                data: file,
                fileName: fileName
            });
        } catch (e) {
            console.log(e);
        }
    }

    async uploadFiles(files: File[], dto: ICreateCommit) {
        try {
            const formData = new FormData()

            for (const file of files) {
                formData.append('files', file)
            }

            formData.append('dto', JSON.stringify(dto));

            console.log(formData.getAll('files'));

            const res = await DownloadService.uploadFiles(formData)
        } catch (e) {
            console.log(e);
        }
    }
}