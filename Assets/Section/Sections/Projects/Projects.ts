import "./Projects.css";

import { Section } from "../../Section";
import { Projects as AllProjects } from "../../../Project/Projects/Projects";
import { Type } from "../../../Project/Metadata";

export class Projects extends Section {

    public readonly Types: readonly Type[];

    constructor(title: string, description: string, types: Type[])
    {
        super(title, description);
        this.Types = types;
        this.Initialize();
    }

    protected override CreateBody(): HTMLDivElement {
        const body = super.CreateBody();
        body.classList.add("projects");

        for (const project of AllProjects) {

            if (!this.Types.includes(project.Data.Type)) continue;

            body.appendChild(project.Element);
        }

        return body;
    }
}