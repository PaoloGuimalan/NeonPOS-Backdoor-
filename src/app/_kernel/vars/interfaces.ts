export interface GetOrdersParamsJwtPayload {
    userID: string;
    orderID: string;
}

export interface DeletePermissionParamsJwtPayload {
    userID: string;
    permissionID: string;
}

export interface DeleteProductParamsJwtPayload {
    userID: string;
    productID: string;
}

export interface RemoveUserParamsJwtPayload {
    userID: string;
    accountID: string;
}

export interface CreateCategoryParamsJwtPayload {
    categoryName: string,
    from: {
        accountID: string,
        userID: string,
        deviceID: string
    }
}

export interface TokenHeaderJwtPayload {
    userID: string;
    deviceID: string;
    connectionToken: string;
    setup: string;
    accountID: string;
}

export interface GenerateReportJwtPayload {
    userID: string;
    deviceID: string;
    datescope: string;
    timescope: string;
}