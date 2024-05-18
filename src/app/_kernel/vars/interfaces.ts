export interface GetOrdersParamsJwtPayload {
    userID: string;
    orderID: string;
}

export interface DeletePermissionParamsJwtPayload {
    userID: string;
    permissionID: string;
}

export interface RemoveUserParamsJwtPayload {
    userID: string;
    accountID: string;
}