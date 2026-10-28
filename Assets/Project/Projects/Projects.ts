import { Project } from "../Project";
import { IData } from "../Data";
import { Media } from "../Media";

const DisableProjectMarker = "(!)";

const projectData = import.meta.glob(
    "./*/Data.ts",
    {
        eager: true,
        import: "default"
    }
) as Record<string, IData>;
const media = import.meta.glob(
    "./*/Media/**/*.{png,jpg,jpeg,webp,svg,mp4,webm}",
    {
        eager: true,
        query: "?url",
        import: "default"
    }
) as Record<string, string>;

export const Projects: Project[] = Object.entries(projectData)
    .filter(([path]) =>
        !GetProjectName(path).includes(DisableProjectMarker)
    )
    .map(([path, data]) => {
        const name = GetProjectName(path);

        return new Project(
            name,
            data,
            CreateMedia(name)
        );
    });

function GetProjectName(path: string): string {
    return path.split("/")[1];
}

function CreateMedia(name: string) : Media {
    return new Media(
        GetMedia(name, "Cover", IsImage),
        GetMedia(name, "Gameplay", IsVideo),
        GetScreens(name)
    );
}

function GetMedia(
    projectName: string,
    mediaName: string,
    validator: (path: string) => boolean
): string {
    const prefix = `./${projectName}/Media/${mediaName}.`;

    return Object.entries(media)
        .find(([path]) =>
            path.toLowerCase().startsWith(prefix.toLowerCase()) &&
            validator(path)
        )?.[1] ?? "";
}
function GetScreens(projectName: string): string[] {
    const prefix = `./${projectName}/Media/Screens/`;

    return Object.entries(media)
        .filter(([path]) =>
            path.startsWith(prefix) &&
            IsImage(path)
        )
        .sort(([pathA], [pathB]) =>
            pathA.localeCompare(pathB)
        )
        .map(([, url]) => url);
}

function IsImage(path: string): boolean {
    return /\.(png|jpg|jpeg|webp|svg)$/i.test(path);
}
function IsVideo(path: string): boolean {
    return /\.(mp4|webm)$/i.test(path);
}