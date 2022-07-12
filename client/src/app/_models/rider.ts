import { RiderRoutes } from "./riderroutes";

export interface Rider{
    id: number;
    userName: string;
    name: string;
    email: string;
    city: string;
    country: string;
    bio: string;
    imgUrl: string;
    createdAt: Date;
    updatedAt: Date;
    gender: string;
    ftp: string;
    age: number;
    rideTypes: string;
    routes: RiderRoutes[];
}

