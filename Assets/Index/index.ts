import { Utilities } from "../Utilities";
import { Sections } from "../Section/Sections/Sections";
import { Section } from "../Section/Section";
import { Hero } from "../Section/Sections/Hero/Hero";

//#region Header
const header = document.querySelector<HTMLElement>("header");
const headerButton = document.querySelector<HTMLButtonElement>(".header-nav-button");
const headerNavLinks = document.querySelector<HTMLDivElement>(".header-nav-links");

if (!header || !headerButton || !headerNavLinks)
    throw new ReferenceError("Header elements not found");

//Header
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (header === null) {
        return;
    }

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add("hidden");
    }
    else {
        header.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
});

// Name
const hero = Sections.find(section => section instanceof Hero);
const headerName = document.querySelector<HTMLAnchorElement>(".header-nav-name");
if (hero !== undefined && headerName !== null) {
    headerName.href = `#${hero.Title}`;
}

// Button
headerButton.addEventListener("click", () => {
    const isOpen = headerNavLinks.classList.toggle("open");
    headerButton.setAttribute("menu_expanded", String(isOpen));
});

// NavLinks
const CloseMenu = (): void => {
    headerNavLinks.classList.remove("open");
    headerButton.setAttribute("menu_expanded", "false");
};

const CreateSectionLink = (section: Section): void => {

    if (!section.CreateNavButton) return;

    const link = document.createElement("a");
    link.href = `#${section.Title}`;
    link.textContent = section.Title;
    link.addEventListener("click", CloseMenu);
    headerNavLinks.appendChild(link);
};

Sections.forEach(CreateSectionLink);

// #endregion

//#region Sections

const main = document.querySelector<HTMLElement>("main");

if (!main) throw new ReferenceError("Main element not found");

Sections.forEach(section => {
    if (section.Element != null)
        main.appendChild(section.Element);
});
// #endregion

//#region Footer
const footerVersion = document.querySelector<HTMLElement>(".footer-version");

if (!footerVersion) throw new ReferenceError("Footer version element not found");

footerVersion.textContent = Utilities.PortfolioVersion;
// #endregion