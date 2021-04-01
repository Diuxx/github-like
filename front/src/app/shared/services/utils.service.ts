import { Injectable } from "@angular/core";
import { TreeNode } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class Utils {

    /**
     * Get snippet id (param -2) in url
     * @param url url to check
     * @returns snippet id
     */
    public getUrlSnippetId(url: string): string {
        return url.split("/").slice(-2).reverse().pop();
    }

    /**
     * Get urr last param
     * @param url url to check
     * @returns last url param
     */
    public getUrlLastParam(url: string): string {
        return url.split("/").slice(-1).pop();
    }
    
    /**
     * Find file by id in tree node
     * @param tree treeNode array
     * @param attribute attribute to check
     * @param val value to check
     * @returns null if not found or founded treeNode
     */
    public findDataInTreeNode(tree: TreeNode[], attribute: string, val: any): TreeNode {
        for(let i = 0; i < tree.length; i++) {
            console.log('attribute', tree[i]?.data[attribute], val)
            if (tree[i]?.data[attribute] == val) {
                return tree[i];
            } else {
                if ((tree[i]?.children?.length ?? 0) > 0) {
                    return this.findDataInTreeNode(tree[i]?.children, attribute, val);
                }
            }
        }
        return null;
    }
}