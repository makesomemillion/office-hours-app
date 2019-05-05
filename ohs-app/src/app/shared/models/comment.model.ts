export interface CommentModel {
    _id: string;
    author: string;
    timestamp: Date;
    content: string;
    meeting: string; // temp - if you remove, remove from all places it's useds
}
