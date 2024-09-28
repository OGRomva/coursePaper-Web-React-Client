import React from 'react';
import Authorization from '../Components/Authorization/Authorization';
import Repositories from '../Components/Repositories/Repositories';

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean
}

export enum RouteNames {
    AUTH='/auth',
    REPOS='/repos',
    BRANCHES='/repos/branches',
    FILES='/repos/branches/commit/files',
    FILE='/repos/commit/file',
    MERGE='/branches/merge',
}

export const routes: IRoute[] = [
    {
        path: RouteNames.AUTH,
        component: Authorization,
        exact: true
    },
    {
        path: RouteNames.REPOS,
        component: Repositories,
        exact: true
    }
]