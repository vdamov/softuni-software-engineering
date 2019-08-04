import {IVideo} from './video.interface';

export interface IUser {
    id: string;
    username: string;
    imageUrl: string;
    email: string;
    password: string;
    createdOn: Date;
    deletedOn: Date;
    videosCount: number;
    ratingsCount: number;
    commentsCount: number;
    likesCount: number;
    totalViews: number;
    uploads: IVideo[];
    liked: IVideo[];
}
