import { Language } from "./language";

export class Snippet {
    public Id: String;
    public Title: String;
    public Repository: String;
    public User: String;
    public Desc?: String;
    public Languages: Language[] = [];
}