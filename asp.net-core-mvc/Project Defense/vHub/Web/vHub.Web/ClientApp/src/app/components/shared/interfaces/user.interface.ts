import {IVideo} from './video.interface';

export interface IUser {
    id: string;
    username: string;
    imageUrl: string;
    email: string;
    password: string;
    createdOn: Date;
    uploadedCount: number;
    likesCount: number;
    totalViews: number;
    uploads: IVideo[];
    liked: IVideo[];
}
