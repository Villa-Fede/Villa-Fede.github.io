declare const PortfolioVersion: string;

export class Utilities {
    static get PortfolioVersion(): string {
        return PortfolioVersion;
    }

    static GetFileName(url: string): string {
        var fileName = new URL(url).pathname.split("/").pop()!;
        return fileName.substring(0, fileName.lastIndexOf("."));
    }
}