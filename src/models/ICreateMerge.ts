export interface ICreateMerge {
    mainBranchId: number;
    slaveBranchId: number;
    message: string;
    shouldDel: boolean;
}