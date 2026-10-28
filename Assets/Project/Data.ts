import { Type, Authorship, Topic, Technology } from "./Metadata";

export class Data implements IData {

    public readonly Type: Type;
    public readonly Authorship: Authorship;

    public readonly Resume: string;
    public readonly About: string;

    public readonly Topics: readonly Topic[];
    public readonly Work: readonly string[];

    public readonly Technologies: readonly Technology[];

    public readonly Links: readonly ILink[];

    constructor(data: IData) {

        this.Type = data.Type ?? Type.Project;
        this.Authorship = data.Authorship ?? Authorship.Solo;
        this.Resume = data.Resume;
        this.About = data.About;
        this.Topics = data.Topics;
        this.Work = data.Work;
        this.Technologies = data.Technologies;
        this.Links = data.Links ?? [];
    }
}

export interface IData {
    readonly Type?: Type;
    readonly Authorship?: Authorship;

    readonly Resume: string;
    readonly About: string;

    readonly Topics: readonly Topic[];
    readonly Work: readonly string[];

    readonly Technologies: readonly Technology[];

    readonly Links?: readonly ILink[];
}

export interface ILink {
    readonly Label: string;
    readonly Url: string;
}