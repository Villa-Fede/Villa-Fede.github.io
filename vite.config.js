import { defineConfig } from "vite";

const now = new Date();

const PortfolioVersion = [
    String(now.getFullYear()).slice(-2),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
].join(".");

export default defineConfig({
    root: "Assets/Index",

    build: {
        outDir: "../../dist",
        emptyOutDir: true
    },

    define: {
        PortfolioVersion: JSON.stringify(`v${PortfolioVersion}`)
    }
});