import "./Summary.css";
import { Project } from "../../Project";

type OverflowElements = {
    List: HTMLElement;
    Overflow: HTMLElement;
    Button: HTMLButtonElement;
    Dropdown: HTMLElement;
};

export class Summary {
    public readonly Element: HTMLDivElement;

    private readonly _project: Project;

    constructor(project: Project) {
        this._project = project;

        this.Element = this.CreateElement();

        requestAnimationFrame(
            () => this.SetupOverflows()
        );
    }

    private CreateElement(): HTMLDivElement {
        const summary = document.createElement("div");
        summary.classList.add("project-panel-summary");

        const cover = this.CreateCover();
        summary.appendChild(cover);

        const resume = this.CreateResume();
        summary.appendChild(resume);

        const topics = this.CreateTopics();
        summary.appendChild(topics);

        const links = this.CreateLinks();

        if (links != null)
            summary.appendChild(links);

        return summary;
    }

    private CreateCover(): HTMLImageElement {
        const cover = document.createElement("img");

        cover.classList.add("project-panel-cover");
        cover.src = this._project.Media.Cover;
        cover.alt = `Portada de ${this._project.Name}`;

        return cover;
    }

    private CreateResume(): HTMLParagraphElement {
        const resume = document.createElement("p");

        resume.classList.add("project-panel-resume");
        resume.textContent = this._project.Data.Resume;

        return resume;
    }

    private CreateTopics(): HTMLDivElement {
        const container = document.createElement("div");
        container.classList.add(
            "project-panel-topics-container"
        );

        const topics = document.createElement("ul");
        topics.classList.add("project-panel-topics");

        for (const topic of this._project.Data.Topics) {
            const item = document.createElement("li");

            item.classList.add("project-panel-topic");
            item.textContent = topic;

            topics.appendChild(item);
        }

        const overflow = this.CreateOverflow();

        container.appendChild(topics);
        container.appendChild(overflow);

        return container;
    }

    private CreateLinks(): HTMLDivElement | null {
        if (this._project.Data.Links.length == 0)
            return null;

        const container = document.createElement("div");
        container.classList.add(
            "project-panel-links-container"
        );

        const links = document.createElement("div");
        links.classList.add("project-panel-links");

        for (const projectLink of this._project.Data.Links) {
            const link = document.createElement("a");

            link.classList.add("project-panel-link");
            link.href = projectLink.Url;
            link.textContent = projectLink.Label;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            links.appendChild(link);
        }

        const overflow = this.CreateOverflow();

        container.appendChild(links);
        container.appendChild(overflow);

        return container;
    }

    private CreateOverflow(): HTMLDivElement {
        const overflow = document.createElement("div");

        overflow.classList.add(
            "project-panel-overflow"
        );

        overflow.hidden = true;

        const button = document.createElement("button");

        button.classList.add(
            "project-panel-overflow-button"
        );

        button.type = "button";
        button.setAttribute(
            "aria-label",
            "Mostrar más"
        );
        button.setAttribute(
            "aria-expanded",
            "false"
        );

        const dropdown = document.createElement("div");

        dropdown.classList.add(
            "project-panel-overflow-dropdown"
        );

        overflow.appendChild(button);
        overflow.appendChild(dropdown);

        return overflow;
    }

    //#region Overflow
    private SetupOverflows(): void {
        const containers = Array.from(
            this.Element.querySelectorAll<HTMLElement>(
                ".project-panel-topics-container, " +
                ".project-panel-links-container"
            )
        );

        for (const container of containers)
            this.SetupOverflow(container);
    }

    private SetupOverflow(container: HTMLElement): void {
        const elements = this.GetOverflowElements(container);

        if (elements == null)
            return;

        const items = Array.from(elements.List.children) as HTMLElement[];

        let closeTimeout: number | undefined;


        const Open = (): void => {
            window.clearTimeout(closeTimeout);

            if (
                elements.Dropdown.childElementCount == 0
            )
                return;

            this.SetOverflowOpen(
                elements,
                true
            );

            this.PositionDropdown(
                container,
                elements.Dropdown
            );
        };


        const Close = (): void => {
            this.SetOverflowOpen(
                elements,
                false
            );
        };


        const Toggle = (): void => {
            const isOpen =
                elements.Overflow.classList.contains(
                    "open"
                );

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


        document.addEventListener(
            "pointerdown",
            event => {
                const target =
                    event.target as Node;

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


        window.addEventListener(
            "scroll",
            () => {
                this.UpdateDropdownPosition(
                    container,
                    elements
                );
            },
            true
        );

        window.addEventListener(
            "resize",
            () => {
                this.UpdateDropdownPosition(
                    container,
                    elements
                );
            }
        );


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
                ".project-panel-overflow"
            );

        const button =
            container.querySelector<HTMLButtonElement>(
                ".project-panel-overflow-button"
            );

        const dropdown =
            container.querySelector<HTMLElement>(
                ".project-panel-overflow-dropdown"
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
        this.SetOverflowOpen(
            elements,
            false
        );

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


        /*
         * Si no entran, mostramos el botón.
         * Esto reduce el ancho disponible de la lista.
         */
        elements.Overflow.hidden = false;


        /*
         * Movemos elementos desde el final
         * hasta que todo lo visible entre.
         */
        while (
            elements.List.scrollWidth >
            elements.List.clientWidth + 1
        ) {
            const item =
                elements.List.lastElementChild;

            if (item == null)
                break;

            elements.Dropdown.insertBefore(
                item,
                elements.Dropdown.firstChild
            );
        }


        if (
            elements.Dropdown.childElementCount == 0
        )
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

    private PositionDropdown(
        container: HTMLElement,
        dropdown: HTMLElement
    ): void {
        const summaryRect =
            this.Element.getBoundingClientRect();

        const containerRect =
            container.getBoundingClientRect();

        const width =
            summaryRect.width * 0.9;

        const left =
            summaryRect.left +
            (summaryRect.width - width) / 2;

        dropdown.style.left =
            `${left}px`;

        dropdown.style.top =
            "auto";

        dropdown.style.bottom =
            `${window.innerHeight - containerRect.top}px`;

        dropdown.style.width =
            `${width}px`;
    }

    private UpdateDropdownPosition(
        container: HTMLElement,
        elements: OverflowElements
    ): void {
        if (
            !elements.Overflow.classList.contains(
                "open"
            )
        )
            return;

        this.PositionDropdown(
            container,
            elements.Dropdown
        );
    }

    // #endregion
}