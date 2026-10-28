import "./Profile.css";

import { Section } from "../../Section";

class ProfileEntry {

    public readonly Name: string;
    public readonly Subtitle: string;
    public readonly Duration: string;
    public readonly Resume: string;

    constructor(
        name: string,
        subtitle: string,
        startDate: Date,
        endDate: Date | null,
        resume: string
    ) {
        this.Name = name;
        this.Subtitle = subtitle;

        var endDateText = "Actualidad";

        if (endDate != null) {
            endDateText = endDate.toLocaleDateString("es-AR", {
                month: "short",
                year: "numeric"
            });
        }

        this.Duration = `${startDate.toLocaleDateString("es-AR", {
            month: "short",
            year: "numeric"
        })} - ${endDateText}`;

        this.Resume = resume;
    }
}

export class Profile extends Section {

    private static readonly s_aboutMeText: string =`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer vitae lorem sit amet lorem tincidunt aliquam.
        Pellentesque habitant morbi tristique senectus et netus.`;

    private static readonly s_experience: ProfileEntry[] = [
        new ProfileEntry(
            "Escuela Da Vinci",
            "Ayudante de cátedra",
            new Date(2026, 7),
            null,
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer vitae lorem sit amet lorem tincidunt aliquam.`
        )
    ];

    private static readonly s_education: ProfileEntry[] = [
        new ProfileEntry(
            "Escuela Da Vinci",
            "Diseño y Programación de Videojuegos",
            new Date(2016, 2),
            new Date(2022, 11),
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer vitae lorem sit amet lorem tincidunt aliquam.`
        ),

        new ProfileEntry(
            "San Judas Tadeo",
            "Técnico Informático",
            new Date(2023, 2),
            new Date(2025, 11),
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer vitae lorem sit amet lorem tincidunt aliquam.`
        )
    ];

    private static readonly s_technologies: string[] = [
        "Unity",
        "C#",
        "Unreal Engine",
        "Git",
        "UI Toolkit"
    ];

    constructor() {
        super("Perfil", 
        "Un poco sobre mí, mi experiencia, mis estudios y las herramientas que utilizo.");
        this.Initialize();
    }

    protected override CreateBody(): HTMLDivElement {

        const body = super.CreateBody();
        body.classList.add("profile");

        const aboutMe = this.CreateAboutMe();
        body.appendChild(aboutMe);

        const experience = this.CreateHistoryCard(
            "Experiencia",
            Profile.s_experience
        );
        body.appendChild(experience);

        const education = this.CreateHistoryCard(
            "Educación",
            Profile.s_education
        );
        body.appendChild(education);

        const skills = this.CreateSkillsCard();
        body.appendChild(skills);

        return body;
    }

    protected CreateAboutMe(): HTMLElement {

        const text = document.createElement("p");
        text.textContent = Profile.s_aboutMeText;
        text.classList.add("profile-about-text");

        const links = this.CreateProfileLinks();

        const card = this.CreateCard([
            text
        ]);
        card.classList.add("profile-about");

        return card;
    }
    protected CreateProfileLinks(): HTMLDivElement {

        const container = document.createElement("div");
        container.classList.add("profile-links");

        const cv = this.CreateProfileLink(
            "Descargar CV",
            "#"
        );
        container.appendChild(cv);

        const github = this.CreateProfileLink(
            "GitHub",
            "#"
        );
        container.appendChild(github);

        const linkedin = this.CreateProfileLink(
            "LinkedIn",
            "#"
        );
        container.appendChild(linkedin);

        return container;
    }
    protected CreateProfileLink(
        text: string,
        url: string
    ): HTMLAnchorElement {

        const link = document.createElement("a");
        link.textContent = text;
        link.href = url;
        link.classList.add("profile-link");

        return link;
    }

    protected CreateHistoryCard(
        title: string,
        entries: ProfileEntry[]
    ): HTMLElement {

        //Tittle
        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        titleElement.classList.add("profile-history-title");

        //Divider
        const divider = this.CreateDivider();

        //Content
        const content = document.createElement("div");
        content.classList.add("profile-history-content");
        entries.forEach((entry, index) => {

            const entryElement = this.CreateHistoryEntry(entry);
            content.appendChild(entryElement);


            const isLastEntry = index === entries.length - 1;

            if (!isLastEntry) {

                const contentDivider = this.CreateDivider();
                content.appendChild(contentDivider);
            }
        });

        //Card
        const card = this.CreateCard([
            titleElement,
            divider,
            content
        ]);
        card.classList.add("profile-history-card");

        return card;
    }
    protected CreateHistoryEntry(
        entry: ProfileEntry
    ): HTMLElement {

        //Header
        const header = document.createElement("div");
        header.classList.add("profile-history-header");

        const name = document.createElement("strong");
        name.textContent = entry.Name;
        name.classList.add("profile-history-name");
        header.appendChild(name);

        const duration = document.createElement("p");
        duration.textContent = entry.Duration;
        duration.classList.add("profile-history-duration");
        header.appendChild(duration);

        //Body
        const body = document.createElement("div");

        const subtitle = document.createElement("p");
        subtitle.textContent = entry.Subtitle;
        subtitle.classList.add("profile-history-subtitle");
        body.appendChild(subtitle);

        const resume = document.createElement("p");
        resume.textContent = entry.Resume;
        resume.classList.add("profile-history-resume");
        body.appendChild(resume);

        //Category
        const category = this.CreateCategory(
            header,
            body
        );
        category.classList.add("profile-history-entry");

        return category;
    }

    protected CreateSkillsCard(): HTMLElement {
        //Technologies
        const technologies = this.CreateSkillsSection(
            "Tecnologías",
            Profile.s_technologies
        );

        //Card
        const card = this.CreateCard([
            technologies
        ]);
        card.classList.add("profile-skills-card");

        return card;
    }
    protected CreateSkillsSection(
        title: string,
        skills: string[]
    ): HTMLElement {

        const container = document.createElement("div");
        container.classList.add("profile-skills-section");

        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        titleElement.classList.add("profile-skills-title");
        container.appendChild(titleElement);

        const list = document.createElement("div");
        list.classList.add("profile-skill-list");
        skills.forEach((skill) => {

            const element = document.createElement("span");

            element.textContent = skill;
            element.classList.add("profile-skill");

            list.appendChild(element);
        });
        container.appendChild(list);

        return container;
    }
}