import "./Panel.css";

import { Project } from "../Project";
import { Media } from "./Media/Media";
import { Summary } from "./Summary/Summary";
import { Content } from "./Content/Content";
import { Type } from "../Metadata";

export class Panel {
    public readonly Project: Project;
    public readonly Element: HTMLDialogElement;

    private _bodyOverflow: string = "";

    private _media!: Media;
    private _summary!: Summary; 
    private _content!: Content;

    constructor(project: Project) {
        this.Project = project;

        this._media = new Media(this.Project);
        this._summary = new Summary(this.Project);
        this._content = new Content(this.Project);

        this.Element = this.CreateElement();

        this.ConfigureEvents();
    }

    public Open(): void {
        if (this.Element.open)
            return;

        this._bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        this.Element.showModal();

        this._media.PlayCurrentVideo();
    }
    public Close(): void {
        this._media.StopCurrentVideo();
        this.Element.close();
    }

    private CreateElement(): HTMLDialogElement {
        const element = document.createElement("dialog");
        element.classList.add("project-panel");

        const container = document.createElement("div");
        container.classList.add("project-panel-container");
        element.appendChild(container);

        const header = this.CreateHeader();
        container.appendChild(header);

        const body = this.CreateBody();
        container.appendChild(body);

        return element;
    }

    //#region Header
    private CreateHeader(): HTMLDivElement {
        const header = document.createElement("div");
        header.classList.add("project-panel-header");

        const info = this.CreateInfo();
        header.appendChild(info);

        const close = this.CreateClose();
        header.appendChild(close);

        return header;
    }

    private CreateInfo(): HTMLDivElement {
        const info = document.createElement("div");
        info.classList.add("project-panel-header-info");

        const classification = this.CreateClassification();
        info.appendChild(classification);

        const name = document.createElement("h2");
        name.textContent = this.Project.Name;
        info.appendChild(name);

        return info;
    }
    private CreateClassification(): HTMLParagraphElement {
        const classification = document.createElement("p");
        classification.classList.add("project-panel-classification");

        const values: string[] = [];

        if (this.Project.Data.Type != Type.Project)
            values.push(this.Project.Data.Type);

        values.push(this.Project.Data.Authorship);

        classification.textContent = values.join(" · ");

        return classification;
    }
    private CreateClose(): HTMLButtonElement {
        const closeButton = document.createElement("button");
        closeButton.classList.add("project-panel-close");
        closeButton.type = "button";
        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Cerrar proyecto");

        closeButton.addEventListener("click", () => {
            this.Close();
        });

        return closeButton;
    }
    //#endregion

    private CreateBody(): HTMLDivElement {
        const body = document.createElement("div");
        body.classList.add("project-panel-body");

        const showcase = this.CreateShowcase();
        body.appendChild(showcase);

        const content = this._content.Element;
        body.appendChild(content);
        return body;
    }
    private CreateShowcase(): HTMLDivElement {
        const showcase = document.createElement("div");
        showcase.classList.add("project-panel-showcase");

        const media = this._media.Element;
        showcase.appendChild(media);

        const summary = this._summary.Element;
        showcase.appendChild(summary);

        return showcase;
    }

    private ConfigureEvents(): void {
        this.Element.addEventListener("click", (event: MouseEvent) => {
            if (event.target != this.Element)
                return;

            this.Close();
        });

        this.Element.addEventListener("close", () => {
            document.body.style.overflow = this._bodyOverflow;
        });
    }
}