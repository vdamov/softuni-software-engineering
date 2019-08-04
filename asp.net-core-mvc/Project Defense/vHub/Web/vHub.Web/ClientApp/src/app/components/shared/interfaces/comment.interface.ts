export interface IComment {
    id: string;
    content: string;
    createdOn: Date;
    deletedOn: Date;
    authorUsername: string;
    authorImageUrl: string;
    videoTitle: string;
}
