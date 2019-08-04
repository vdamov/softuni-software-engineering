export interface IVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    views: number;
    authorUsername: string;
    authorImageUrl: string;
    createdOn: Date;
    deletedOn: Date;
    categoryId: string;
    categoryName: string;
}
