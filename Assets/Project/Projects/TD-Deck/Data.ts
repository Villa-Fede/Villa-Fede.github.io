import { IData } from "../../Data";
import { Technology, Topic } from "../../Metadata";

export default {
    Resume: `Arcade de tanques para dos jugadores en local, 
    centrado en capturar zonas estratégicas y sumar puntos.
    Disparos, power-ups y aliados controlados por IA acompañan
    cada partida.`,

    About: `lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum

    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum `,

    Topics: [
        Topic.Multiplayer,
        Topic.GameAI,
        Topic.Pathfinding
    ],

    Work: [
        "lorem ipsum lorem ipsum ",
        "lorem ipsum lorem ipsum ",
        "lorem ipsum lorem ipsum ",
        "lorem ipsum lorem ipsum ",
        "lorem ipsum lorem ipsum "
    ],

    Technologies: [
        Technology.Unity,
        Technology.CSharp
    ],

    Links: [
        {
            Label: "Itchio",
            Url: "https://itch.io/"
        },

        {
            Label: "GitHub",
            Url: "https://github.com/"
        },

        {
            Label: "Steam",
            Url: "https://store.steampowered.com/?l=spanish"
        }
    ]

} satisfies IData;