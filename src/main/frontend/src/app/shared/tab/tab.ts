/**
 * Represents a tab with a label, link, disabled state and tooltip.
 *
 * @class Tab
 */
export class Tab {
    label: string
    link: string
    disabled: boolean
    tooltip: string

    /**
     * Creates an instance of a Tab.
     * 
     * @param {string} label - The display label for the tab. Defaults to empty string.
     * @param {string} link - The route or URL that the tab links to. Defaults to empty string.
     * @param {string} disabled - The disabled state of the button. Defaults to false.
     * @param {string} tooltip - The tooltip for the button. Defaults to empty string and no tooltip.
     */
    constructor(label: string = "", link: string = "", disabled: boolean = false, tooltip: string = "") {
        this.label = label;
        this.link = link;
        this.disabled = disabled;
        this.tooltip = tooltip;
    }
}