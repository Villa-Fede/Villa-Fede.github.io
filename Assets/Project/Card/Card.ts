import "./Card.css";

import { Project } from "../Project";
import { Type } from "../Metadata";

type OverflowElements = {
    List: HTMLElement;
    Overflow: HTMLElement;
    Button: HTMLButtonElement;
    Dropdown: HTMLElement;
};

export class Card {
    public readonly Project: Project;

    public readonly Element: HTMLElement;
    private _preview!: HTMLDivElement;
    private _body!: HTMLDivElement;

    constructor(project: Project) {
        this.Project = project;
        this.Element = this.CreateElement();

        requestAnimationFrame(
            () => this.SetupOverflow()
        );
    }

    private CreateElement(): HTMLElement {
        const element = document.createElement("article");
        element.classList.add("card", "project-card");

        this._preview = this.CreatePreview();
        element.appendChild(this._preview);

        this.ConfigurePreview(element);

        this._body = this.CreateBody();
        element.appendChild(this._body);

        return element;
    }

    private CreatePreview(): HTMLDivElement {
        const preview = document.createElement("div");
        preview.classList.add("project-card-preview");

        const image = document.createElement("img");
        image.src = this.Project.Media.Cover;
        image.alt = `Portada de ${this.Project.Name}`;

        preview.appendChild(image);

        if (this.Project.Media.Gameplay.length == 0)
            return preview;

        const video = document.createElement("video");

        video.src = this.Project.Media.Gameplay;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "metadata";

        preview.appendChild(video);
        preview.classList.add("has-gameplay");

        return preview;
    }

    private ConfigurePreview(element: HTMLElement): void {
        const video = this._preview.querySelector("video");

        if (video != null) {
            element.addEventListener("mouseenter", () => {
                video.currentTime = 0;

                video.play().catch((error: DOMException) => {
                    if (error.name != "AbortError")
                        console.error(error);
                });
            });

            element.addEventListener("mouseleave", () => {
                video.pause();
            });
        }

        element.addEventListener("click", () => {
            this.Project.Panel.Open();
        });
    }

    private CreateBody(): HTMLDivElement {
        const body = document.createElement("div");
        body.classList.add("project-card-body");

        const classification = this.CreateClassification();
        body.appendChild(classification);

        const name = document.createElement("h3");
        name.textContent = this.Project.Name;
        body.appendChild(name);

        const technologies = this.CreateTechnologies();
        body.appendChild(technologies);

        const resume = document.createElement("p");
        resume.classList.add("project-card-resume");
        resume.textContent = this.Project.Data.Resume;
        body.appendChild(resume);

        const topics = this.CreateTopics();
        body.appendChild(topics);

        return body;
    }

    private CreateClassification(): HTMLParagraphElement {
        const classification = document.createElement("p");
        classification.classList.add("project-card-classification");

        const values: string[] = [
            this.Project.Data.Authorship
        ];

        if (this.Project.Data.Type != Type.Project)
            values.push(this.Project.Data.Type);

        classification.textContent = values.join(" · ");

        return classification;
    }

    private CreateTechnologies(): HTMLParagraphElement {
        const technologies = document.createElement("p");
        technologies.classList.add("project-card-technologies");

        technologies.textContent = this.Project.Data.Technologies.join(" · ");

        return technologies;
    }

    private CreateTopics(): HTMLDivElement {
        const container = document.createElement("div");
        container.classList.add("project-card-topics-container");

        const topics = document.createElement("ul");
        topics.classList.add(
            "project-card-topics",
            "project-card-topics-list"
        );

        for (const topic of this.Project.Data.Topics) {
            const item = document.createElement("li");
            item.classList.add("project-card-topic");
            item.textContent = topic;

            topics.appendChild(item);
        }

        const overflow = this.CreateOverflow();

        container.appendChild(topics);
        container.appendChild(overflow);

        return container;
    }

    private CreateOverflow(): HTMLDivElement {
        const overflow = document.createElement("div");
        overflow.classList.add("project-card-overflow");
        overflow.hidden = true;

        const button = document.createElement("button");
        button.classList.add("project-card-overflow-button");
        button.type = "button";
        button.setAttribute("aria-label", "Mostrar más");
        button.setAttribute("aria-expanded", "false");

        const dropdown = document.createElement("div");
        dropdown.classList.add("project-card-overflow-dropdown");

        overflow.appendChild(button);
        overflow.appendChild(dropdown);

        return overflow;
    }

    //#region Overflow

    private SetupOverflow() {
        const container =
            this.Element.querySelector<HTMLElement>(
                ".project-card-topics-container"
            );

        if (container == null)
            return;

        const elements = this.GetOverflowElements(container);

        if (elements == null)
            return;

        const items = Array.from(
            elements.List.children
        ) as HTMLElement[];

        let closeTimeout: number | undefined;

        const Open = (): void => {
            window.clearTimeout(closeTimeout);

            if (elements.Dropdown.childElementCount == 0)
                return;

            this.SetOverflowOpen(elements, true);
            this.SizeDropdown(elements.Dropdown);
        };

        const Close = (): void => {
            this.SetOverflowOpen(elements, false);
        };

        const Toggle = (): void => {
            const isOpen =
                elements.Overflow.classList.contains("open");

            if (isOpen) {
                Close();
                return;
            }

            Open();
        };

        const ScheduleClose = (): void => {
            window.clearTimeout(closeTimeout);

            closeTimeout = window.setTimeout(
                Close,
                100
            );
        };

        const CancelClose = (): void => {
            window.clearTimeout(closeTimeout);
        };

        let buttonPointerType = "";

        elements.Overflow.addEventListener(
            "pointerenter",
            event => {
                if (event.pointerType != "mouse")
                    return;

                CancelClose();
                Open();
            }
        );

        elements.Overflow.addEventListener(
            "pointerleave",
            event => {
                if (event.pointerType != "mouse")
                    return;

                ScheduleClose();
            }
        );

        elements.Dropdown.addEventListener(
            "pointerenter",
            event => {
                if (event.pointerType != "mouse")
                    return;

                CancelClose();
            }
        );

        elements.Dropdown.addEventListener(
            "pointerleave",
            event => {
                if (event.pointerType != "mouse")
                    return;

                ScheduleClose();
            }
        );

        elements.Button.addEventListener(
            "pointerdown",
            event => {
                buttonPointerType = event.pointerType;
            }
        );

        elements.Button.addEventListener(
            "click",
            event => {
                event.stopPropagation();

                if (buttonPointerType == "mouse") {
                    Open();
                    buttonPointerType = "";
                    return;
                }

                Toggle();
                buttonPointerType = "";
            }
        );

        elements.Dropdown.addEventListener(
            "click",
            event => event.stopPropagation()
        );

        document.addEventListener(
            "pointerdown",
            event => {
                const target = event.target as Node;

                if (
                    elements.Overflow.contains(target) ||
                    elements.Dropdown.contains(target)
                )
                    return;

                Close();
            }
        );

        const observer = new ResizeObserver(
            () => {
                this.UpdateOverflow(
                    container,
                    elements,
                    items
                );
            }
        );

        observer.observe(container);

        this.UpdateOverflow(
            container,
            elements,
            items
        );
    }

    private GetOverflowElements(
        container: HTMLElement
    ): OverflowElements | null {
        const list =
            container.firstElementChild as HTMLElement | null;

        const overflow =
            container.querySelector<HTMLElement>(
                ".project-card-overflow"
            );

        const button =
            container.querySelector<HTMLButtonElement>(
                ".project-card-overflow-button"
            );

        const dropdown =
            container.querySelector<HTMLElement>(
                ".project-card-overflow-dropdown"
            );

        if (
            list == null ||
            overflow == null ||
            button == null ||
            dropdown == null
        )
            return null;

        return {
            List: list,
            Overflow: overflow,
            Button: button,
            Dropdown: dropdown
        };
    }

    private UpdateOverflow(
        container: HTMLElement,
        elements: OverflowElements,
        items: HTMLElement[]
    ): void {
        this.SetOverflowOpen(elements, false);

        for (const item of items)
            elements.List.appendChild(item);

        elements.Overflow.hidden = true;

        if (container.clientWidth == 0)
            return;

        if (
            elements.List.scrollWidth <=
            elements.List.clientWidth + 1
        )
            return;

        elements.Overflow.hidden = false;

        while (
            elements.List.scrollWidth >
            elements.List.clientWidth + 1
        ) {
            const item = elements.List.lastElementChild;

            if (item == null)
                break;

            elements.Dropdown.insertBefore(
                item,
                elements.Dropdown.firstChild
            );
        }

        if (elements.Dropdown.childElementCount == 0)
            elements.Overflow.hidden = true;
    }

    private SetOverflowOpen(
        elements: OverflowElements,
        open: boolean
    ): void {
        elements.Overflow.classList.toggle(
            "open",
            open
        );

        elements.Button.setAttribute(
            "aria-expanded",
            open.toString()
        );
    }

    private SizeDropdown(
        dropdown: HTMLElement
    ): void {
        const cardRect =
            this.Element.getBoundingClientRect();

        const overflowRect =
            dropdown.parentElement!.getBoundingClientRect();

        const width =
            cardRect.width * 0.9;

        const left =
            cardRect.left +
            (cardRect.width - width) / 2 -
            overflowRect.left;

        dropdown.style.width =
            `${width}px`;

        dropdown.style.right =
            "auto";

        dropdown.style.left =
            `${left}px`;
    }

    //#endregion
}
