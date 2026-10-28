import "./Content.css";
import { Project } from "../../Project";

export class Content {
    public readonly Element: HTMLDivElement;

    private readonly _project: Project;

    constructor(project: Project) {
        this._project = project;

        this.Element = this.CreateElement();
    }

    private CreateElement(): HTMLDivElement {
        const content = document.createElement("div");
        content.classList.add("project-panel-content");

        const technologies = this.CreateTechnologies();
        content.appendChild(technologies);

        if (this._project.Data.About.length > 0) {
            const about = this.CreateAbout();
            content.appendChild(about);
        }

        if (this._project.Data.Work.length > 0) {
            const work = this.CreateWork();
            content.appendChild(work);
        }

        return content;
    }

    private CreateTechnologies(): HTMLElement {
        const section = document.createElement("section");
        section.classList.add("project-panel-technologies");

        const title = document.createElement("h3");
        title.textContent = "Tecnologías";

        section.appendChild(title);

        const list = document.createElement("ul");

        for (const technology of this._project.Data.Technologies) {
            const item = document.createElement("li");
            item.textContent = technology;

            list.appendChild(item);
        }

        section.appendChild(list);

        return section;
    }
    private CreateAbout(): HTMLElement {
        const section = document.createElement("section");
        section.classList.add("project-panel-about");

        const title = document.createElement("h3");
        title.textContent = "Sobre el proyecto";

        section.appendChild(title);

        const paragraphs = this._project.Data.About
            .trim()
            .split(/\n\s*\n/);

        for (const text of paragraphs) {
            const paragraph = document.createElement("p");

            paragraph.textContent = text
                .replace(/\s+/g, " ")
                .trim();

            section.appendChild(paragraph);
        }

        return section;
    }
    private CreateWork(): HTMLElement {
        const section = document.createElement("section");
        section.classList.add("project-panel-work");

        const title = document.createElement("h3");
        title.textContent = "Mi trabajo";

        section.appendChild(title);

        const list = document.createElement("ul");

        for (const work of this._project.Data.Work) {
            const item = document.createElement("li");
            item.textContent = work;

            list.appendChild(item);
        }

        section.appendChild(list);

        return section;
    }
}