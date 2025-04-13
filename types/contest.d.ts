
export interface ContestResult {
    name: string;
    email: string;
    phone_number: number;
    DOB: string;
    address: Array<any>;
    school: string;
}


export interface Contest {
    _id: number;
    result: Array<ContestResult>;
    date: string;
    created_at: string;
    updated_at: string;
}