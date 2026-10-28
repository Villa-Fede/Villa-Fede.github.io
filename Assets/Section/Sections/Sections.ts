import { Section } from "../Section";
import { Hero } from "./Hero/Hero";
import { Projects } from "./Projects/Projects";
import { Type } from "../../Project/Metadata";
import { Profile } from "./Perfil/Profile";
import { Contact } from "./Contact/Contact";

const contact = new Contact();
const profile = new Profile();
const technicalDevelopment = new Projects(
    "Desarrollo técnico",
    "Sistemas, herramientas y demostraciones técnicas orientadas al desarrollo de videojuegos.",
    [Type.System, Type.Tool, Type.Demo]
);
const projects = new Projects(
    "Proyectos",
    "Trabajos desarrollados de forma individual y colaborativa.",
    [Type.Project]
);
const hero = new Hero(contact);

export const Sections: Section[] = [
    hero,
    projects,
    technicalDevelopment,
    profile,
    contact,
];