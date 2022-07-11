import { RiderRoutes } from "./riderroutes";

export interface Rider{
    id: number;
    username: string;
    name: string;
    email: string;
    city: string;
    country: string;
    bio: string;
    imgUrl: string;
    createdAt: Date;
    updatedAt: Date;
    gender: string;
    FTP: string;
    rideTypes: string;
    routes: RiderRoutes[];
}

