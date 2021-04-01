import { Language } from "./language";

export class File {
    public Id: string;
    public FileName: string;
    public Name: string;
    public Url: string;
    public Language: Language;
    public Selected?: boolean = false;
}