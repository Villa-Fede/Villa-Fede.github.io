import "./Section.css";

export class Section {
    public readonly Title: string;
    public readonly Description: string;

    public Element!: HTMLElement;
    private _header!: HTMLDivElement;
    private _body!: HTMLDivElement;

    public get CreateNavButton(): Boolean {
        return true;
    }
    public get Header(): HTMLDivElement {
        return this._header;
    }
    public get Body(): HTMLDivElement {
        return this._body;
    }

    constructor(title: string, description: string) {
        this.Title = title;
        this.Description = description;
    }

    protected Initialize() {
        this.Element = this.CreateElement();
    }

    private CreateElement(): HTMLElement {
        const element = document.createElement("section");
        element.classList.add("section");
        element.id = this.Title;

        const container = document.createElement("div");
        container.classList.add("container");
        element.appendChild(container);

        this._header = this.CreateHeader();
        container.appendChild(this._header);

        this._body = this.CreateBody();
        container.appendChild(this._body);

        return element;
    }
    protected CreateHeader(): HTMLDivElement {
        var header = document.createElement("div");
        header.classList.add("section-header");

        var title = document.createElement("h2");
        title.textContent = this.Title;
        title.classList.add("section-title");

        var description = document.createElement("p");
        description.textContent = this.Description;
        description.classList.add("section-description");

        header.appendChild(title);
        header.appendChild(description);

        return header;
    }
    protected CreateBody(): HTMLDivElement {
        const body = document.createElement("div");
        body.classList.add("section-body");

        return body;
    }

    protected CreateCategory(header: HTMLElement | null = null, body: HTMLElement | null = null, footer: HTMLElement | null = null): HTMLDivElement {
        const category = document.createElement("div");
        category.classList.add("category");

        if (header != null)
            category.appendChild(header);

        if (body != null)
            category.appendChild(body);

        if (footer != null)
            category.appendChild(footer);

        return category;
    }
    protected CreateDivider(): HTMLDivElement {
        var divider = document.createElement("div");
        divider.classList.add("divider");

        return divider;
    }

    protected CreateCard(contents: HTMLElement[]): HTMLDivElement {
        const card = document.createElement("div");
        card.classList.add("card")

        for (const content of contents) {

            card.appendChild(content);
        }

        return card;
    }
}