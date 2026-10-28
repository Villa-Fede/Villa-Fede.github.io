import { IData } from "../../Data";
import { Authorship, Technology, Topic } from "../../Metadata";

export default {
    Authorship: Authorship.Collaboration,

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
        Topic.Combat,
        Topic.GameAI,
        Topic.Gameplay,
        Topic.Multiplayer,
        Topic.Grid,
        Topic.Gameplay,
        Topic.Multiplayer,
        Topic.Grid
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
    ]
} satisfies IData;