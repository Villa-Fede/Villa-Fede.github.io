export class Media {
    public readonly Cover: string;
    public readonly Gameplay: string;
    public readonly Screens: readonly string[];

    constructor(
        cover: string,
        gameplay: string,
        screens: string[]
    ) {
        this.Cover = cover;
        this.Gameplay = gameplay;
        this.Screens = screens;
    }
}