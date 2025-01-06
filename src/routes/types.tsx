// types.ts
export interface BoxWine {
    _id: string;
    name: string;
    box_count: number;
}

export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    phone: string;
    house: string;
    city: string;
    country: string;
    zipcode: string;
}

export interface Box {
    _id: string;
    user: UserDetails;
    created_at: string;
    delivery_date: string;
    status: string;
    box_type: string;
    box_wines: BoxWine[];
}

export interface GetBoxHistoryAdminResponse {
    getBoxHistoryAdmin: {
        total: number;
        boxes: Box[];
        response:string;
    };
}
