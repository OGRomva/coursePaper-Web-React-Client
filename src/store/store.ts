import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';
import { IRepositoryList } from '../models/IRepositoryList';

export default class Store {

    user = {} as IUser;
    isAuth = false;
    repository: IRepositoryList[] = [];


    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setRepository(value: IRepositoryList[]) {
        this.repository = value;
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(username: string, password: string) {
        try {
            const res = await AuthService.login(username, password);
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('rToken', res.data.refreshToken)
            console.log(res);
            this.setAuth(true)
            this.setUser(res.data.user)
        } catch (e) {
            console.log(e);
        }
    }

    async registration(username: string, password: string) {
        try {
            const res = await AuthService.registration(username, password);
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('rToken', res.data.refreshToken)
            console.log(res);
            this.setAuth(true)
            this.setUser(res.data.user)
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            const res = await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('rToken');
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('rToken')}`
                }
            });

            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            localStorage.setItem('rToken', response.data.refreshToken)

            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e);
        }
    }
}