/**
 * Represents a tab with a label and a link.
 *
 * @class Tab
 */
export class Tab {
    label: string = "";
    link: string = '';

     /**
     * Creates an instance of a Tab.
     * 
     * @param {string} label - The display label for the tab.
     * @param {string} link - The route or URL that the tab links to.
     */
    constructor(label: string = "", link: string = "") {
        this.label = label;
        this.link = link;
    }
}
