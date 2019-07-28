export interface IVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    views: number;
    authorId: string;
    authorUsername: string;
    authorImageUrl: string;
    createdOn: Date;
    categoryId: string;
    categoryName: string;
}
