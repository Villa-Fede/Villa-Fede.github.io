import "./Media.css";
import { Project } from "../../Project";

export class Media {
    public readonly Element: HTMLDivElement;

    private readonly _project: Project;

    private _selectedMediaIndex: number = 0;

    private _viewer: HTMLDivElement | null = null;
    private _thumbnails: HTMLButtonElement[] = [];

    constructor(project: Project) {
        this._project = project;

        this.Element = this.CreateElement();
    }

    private CreateElement(): HTMLDivElement {
        const media = document.createElement("div");
        media.classList.add("project-panel-media");

        const viewer = this.CreateViewer();
        media.appendChild(viewer);

        const thumbnails = this.CreateThumbnails();
        media.appendChild(thumbnails);

        this.SelectMedia(0);

        return media;
    }

    private CreateViewer(): HTMLDivElement {
        const viewer = document.createElement("div");
        viewer.classList.add("project-panel-viewer");

        this._viewer = viewer;

        const previous = this.CreateNavigationButton(-1);
        viewer.appendChild(previous);

        const next = this.CreateNavigationButton(1);
        viewer.appendChild(next);

        return viewer;
    }

    private CreateNavigationButton(direction: number): HTMLButtonElement {
        const button = document.createElement("button");

        button.type = "button";
        button.classList.add("project-panel-navigation");

        let directionText = "next";

        if (direction < 0)
            directionText = "previous";

        button.classList.add(directionText);
        button.setAttribute("aria-label", directionText);

        button.addEventListener("click", () => {
            this.SelectMedia(
                this._selectedMediaIndex + direction
            );
        });

        return button;
    }

    private CreateThumbnails(): HTMLDivElement {
        const thumbnails = document.createElement("div");
        thumbnails.classList.add(
            "project-panel-thumbnails"
        );

        if (this._project.Media.Gameplay.length > 0) {
            const gameplay = this.CreateThumbnailVideo();
            thumbnails.appendChild(gameplay);
        }

        for (const screen of this._project.Media.Screens) {
            const thumbnail =
                this.CreateThumbnailScreen(screen);

            thumbnails.appendChild(thumbnail);
        }

        return thumbnails;
    }
    private CreateThumbnail(ariaLabel: string): HTMLButtonElement {
        const thumbnail = document.createElement("button");

        thumbnail.type = "button";
        thumbnail.classList.add(
            "project-panel-thumbnail"
        );
        thumbnail.setAttribute(
            "aria-label",
            ariaLabel
        );

        const index = this._thumbnails.length;

        thumbnail.addEventListener("click", () => {
            this.SelectMedia(index);
        });

        this._thumbnails.push(thumbnail);

        return thumbnail;
    }
    private CreateThumbnailVideo(): HTMLButtonElement {
        const thumbnail = this.CreateThumbnail(
            `Gameplay de ${this._project.Name}`
        );

        const video = document.createElement("video");

        video.src = this._project.Media.Gameplay;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";

        video.addEventListener("loadeddata", () => {
            video.currentTime = 1;
        });

        thumbnail.appendChild(video);

        const icon = document.createElement("span");
        thumbnail.appendChild(icon);

        return thumbnail;
    }
    private CreateThumbnailScreen(source: string): HTMLButtonElement {
        const thumbnail = this.CreateThumbnail(
            `Captura de ${this._project.Name}`
        );

        const image = document.createElement("img");

        image.src = source;
        image.alt = `Captura de ${this._project.Name}`;

        thumbnail.appendChild(image);

        return thumbnail;
    }

    private SelectMedia(index: number) {
        if (this._thumbnails.length == 0)
            return;

        if (index < 0)
            index = this._thumbnails.length - 1;

        if (index >= this._thumbnails.length)
            index = 0;

        this._selectedMediaIndex = index;

        for (const thumbnail of this._thumbnails)
            thumbnail.classList.remove("selected");

        const selected = this._thumbnails[index];

        selected.classList.add("selected");

        selected.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });

        this.UpdateViewer();
    }
    private UpdateViewer() {
        if (this._viewer == null)
            return;

        const current = this._viewer.querySelector(
            ".project-panel-viewer-content"
        );

        if (current instanceof HTMLVideoElement)
            current.pause();

        current?.remove();

        let content:
            HTMLImageElement |
            HTMLVideoElement;

        if (
            this._project.Media.Gameplay.length > 0 &&
            this._selectedMediaIndex == 0
        ) {
            const video =
                document.createElement("video");

            video.src =
                this._project.Media.Gameplay;

            video.controls = true;
            video.playsInline = true;
            video.preload = "metadata";
            video.muted = true;

            content = video;
        }
        else {
            const image =
                document.createElement("img");

            let screenIndex =
                this._selectedMediaIndex;

            if (
                this._project.Media.Gameplay.length > 0
            )
                screenIndex--;

            image.src =
                this._project.Media.Screens[
                screenIndex
                ];

            image.alt =
                `Captura de ${this._project.Name}`;

            content = image;
        }

        content.classList.add(
            "project-panel-viewer-content"
        );

        this._viewer.prepend(content);

        if (content instanceof HTMLVideoElement) {
            content.play().catch(() => {
                // El navegador bloqueó la reproducción automática.
            });
        }
    }

    public PlayCurrentVideo() {
        const video = this.Element.querySelector(
            ".project-panel-viewer-content"
        );

        if (!(video instanceof HTMLVideoElement))
            return;

        video.play().catch(() => {
            console.warn(
                "El navegador bloqueó la reproducción automática del video."
            );
        });
    }
    public StopCurrentVideo() {
        const video = this.Element.querySelector(
            ".project-panel-viewer-content"
        );

        if (!(video instanceof HTMLVideoElement))
            return;

        video.pause();
        video.currentTime = 0;
    }
}