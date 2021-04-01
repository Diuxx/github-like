import { Language } from "./language";
import { SnippetUser } from "./snippetUser";
import { File } from "./file";

export class Snippet {
    public Id?: string;
    public Title: string;
    public Desc: string;
    public Repository?: string;
    public User?: SnippetUser;
    public Files?: File[] = [];
    public Languages?: Language[] = [];
    public selected?: boolean = false;
}