import { Data, IData } from "./Data";
import { Media } from "./Media";
import { Card } from "./Card/Card";
import { Panel } from "./Panel/Panel";

export class Project {
    public readonly Name: string;

    public readonly Data: Data;
    public readonly Media: Media;

    public readonly Element: HTMLElement;
    public readonly Card: Card;
    public readonly Panel: Panel;

    constructor(
        name: string,
        data: IData,
        media: Media
    ) {
        this.Name = name;

        this.Data = new Data(data);

        this.Media = media;

        this.Card = new Card(this);
        this.Panel = new Panel(this);
        this.Element = this.CreateElement();
    }

    private CreateElement(): HTMLElement
    {
        const element = document.createElement("div");
        element.id = this.Name;

        element.appendChild(this.Card.Element);
        element.appendChild(this.Panel.Element);
        
        return element;
    }
}