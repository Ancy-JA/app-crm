// types.ts
import { BaseRecord } from "@refinedev/core";

export interface BoxWine {
    _id: string;
    name: string;
    box_count: number;
}

export interface UserDetails {
    name?: string;
    house?: string;
    email?: string;
    country?: string;
    zipcode?: string;
    city?: string;
    phone?: string;
    password?: string;
}
export interface Field {
    label: string;
    name: keyof UserDetails; // Ensures `name` matches keys of `User` type
    value: string;
}
export interface PdfRecord extends BaseRecord {
    pdfData: string; // Base64 string representing the PDF
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
export interface ModalViewProps {
    selectedBox: Box | null;
    closeModal: () => void;
    isVisible: boolean;
}

export interface GetBoxHistoryAdminResponse {
    getBoxHistoryAdmin: {
        total: number;
        boxes: Box[];
        response:string;
    };
}
