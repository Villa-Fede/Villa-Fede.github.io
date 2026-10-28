import "./Hero.css";

import { Section } from "../../Section";
import { Projects } from "../../../Project/Projects/Projects";
import { Sections } from "../Sections";
import { Contact } from "../Contact/Contact";

export class Hero extends Section {

    private readonly _contact: Section;

    private static readonly GameplayDuration: number = 7000;
    private static readonly TransitionDuration: number = 1200;

    private _gameplayVideos: HTMLVideoElement[] = [];
    private _gameplayIndex: number = 0;

    public override get CreateNavButton(): boolean {
        return false;
    }

    constructor(contact: Section) {
        super("Hero", "");

        this._contact = contact;

        this.Initialize();
        this.Element.classList.add("hero");
    }

    protected override CreateHeader(): HTMLDivElement {
        const header = document.createElement("div");
        header.classList.add("hero-header");

        const technology = document.createElement("p");
        technology.classList.add("hero-technology");
        technology.textContent = "Unity · C#";
        header.appendChild(technology);

        const title = document.createElement("h1");
        title.classList.add("hero-title");
        header.appendChild(title);

        const game = document.createElement("span");
        game.textContent = "Game";
        title.appendChild(game);

        const programmer = document.createElement("span");
        programmer.classList.add("hero-highlight");
        programmer.textContent = "Programmer";
        title.appendChild(programmer);

        const specialization = document.createElement("p");
        specialization.classList.add("hero-specialization");
        specialization.textContent = "Gameplay · Tools · Systems";
        header.appendChild(specialization);

        const description = document.createElement("p");
        description.classList.add("hero-description");
        description.textContent =
            "Desarrollo sistemas de gameplay, IA y herramientas para videojuegos.";
        header.appendChild(description);

        const contactLink = document.createElement("a");
        contactLink.classList.add("hero-link");
        contactLink.href = `#${this._contact.Title}`;
        contactLink.textContent = this._contact.Title;
        header.appendChild(contactLink);

        return header;
    }

    protected override CreateBody(): HTMLDivElement {
        const body = super.CreateBody();
        body.classList.add("hero-body");

        const gameplay = this.CreateGameplay();

        body.appendChild(gameplay);

        return body;
    }
    private CreateGameplay(): HTMLDivElement {
        const gameplay = document.createElement("div");
        gameplay.classList.add("hero-gameplay");

        for (const project of Projects) {

            if (!project.Media.Gameplay)
                continue;

            const video = this.CreateGameplayVideo(
                project.Media.Gameplay
            );

            gameplay.appendChild(video);
            this._gameplayVideos.push(video);
        }

        this.InitializeGameplay();

        return gameplay;
    }
    private CreateGameplayVideo(source: string): HTMLVideoElement {
        const video = document.createElement("video");

        video.classList.add("hero-gameplay-video");

        video.src = source;

        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        video.preload = "metadata";
        video.controls = false;

        video.tabIndex = -1;

        video.setAttribute("aria-hidden", "true");

        return video;
    }

    private InitializeGameplay(): void {
        if (this._gameplayVideos.length == 0)
            return;

        const firstVideo = this._gameplayVideos[0];

        firstVideo.classList.add("active");

        firstVideo.play().catch(() => {
        });

        if (this._gameplayVideos.length > 1)
            this.StartGameplayCycle();
    }
    private StartGameplayCycle(): void {
        window.setInterval(() => {
            this.ShowNextGameplay();
        }, Hero.GameplayDuration);
    }
    private ShowNextGameplay(): void {
        const currentVideo =
            this._gameplayVideos[this._gameplayIndex];

        this._gameplayIndex++;

        if (this._gameplayIndex >= this._gameplayVideos.length)
            this._gameplayIndex = 0;

        const nextVideo =
            this._gameplayVideos[this._gameplayIndex];

        nextVideo.currentTime = 0;

        nextVideo.play().catch(() => {
        });

        nextVideo.classList.add("active");
        currentVideo.classList.remove("active");

        window.setTimeout(() => {
            currentVideo.pause();
        }, Hero.TransitionDuration);
    }
}