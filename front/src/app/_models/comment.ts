import { User } from "./user";

export class Comment {
    public Id?: string;
    public UserId?: string;
    public Content: string;
    public User: any;
    public CreatedAt?: Date;
    public UpdatedAt?: Date;
}