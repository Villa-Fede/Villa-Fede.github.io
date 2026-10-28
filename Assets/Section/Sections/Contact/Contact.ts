import "./Contact.css";

import { Section } from "../../Section";

export class Contact extends Section {

    private static readonly s_email = "federiconicolasvillarruel@gmail.com";
    private static readonly s_phone = "+5491133822494";

    private static readonly s_linkedIn =
        "https://www.linkedin.com/in/tu-perfil";

    private static readonly s_gitHub =
        "https://github.com/tu-usuario";

    constructor() {
        super("Contacto", "");
        this.Initialize();
    }

    protected override CreateHeader(): HTMLDivElement {
        return document.createElement("div");
    }

    protected override CreateBody(): HTMLDivElement {
        const body = super.CreateBody();

        body.classList.add("contact");

        const content = document.createElement("div");
        content.classList.add("contact-content");

        const title = document.createElement("h3");
        title.textContent = "¿Trabajamos juntos?";

        const paragraph = document.createElement("p");
        paragraph.textContent =
            "Si tenés una propuesta o proyecto en mente, podés contactarme por cualquiera de estos medios.";

        const links = this.CreateLinks();
        const information = this.CreateInformation();

        content.append(
            title,
            paragraph,
            links,
            information
        );

        body.append(content);

        return body;
    }

    private CreateLinks(): HTMLDivElement {
        const links = document.createElement("div");
        links.classList.add("contact-links");

        links.append(
            this.CreateLink(
                "Email",
                `mailto:${Contact.s_email}`,
                true
            ),
            this.CreateLink(
                "WhatsApp",
                `https://wa.me/${Contact.GetWhatsAppPhone()}`
            ),
            this.CreateLink(
                "LinkedIn",
                Contact.s_linkedIn
            ),
            this.CreateLink(
                "GitHub",
                Contact.s_gitHub
            )
        );

        return links;
    }

    private CreateInformation(): HTMLDivElement {
        const information = document.createElement("div");
        information.classList.add("contact-information");

        information.append(
            this.CreateInformationLink(
                Contact.s_email,
                `mailto:${Contact.s_email}`
            ),
            this.CreateInformationLink(
                Contact.GetPhoneDisplay(),
                `tel:${Contact.s_phone}`
            )
        );

        return information;
    }

    private CreateLink(
        text: string,
        url: string,
        primary: boolean = false
    ): HTMLAnchorElement {
        const link = document.createElement("a");

        link.textContent = text;
        link.href = url;

        if (primary) {
            link.classList.add("primary");
        }

        if (url.startsWith("http")) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }

        return link;
    }

    private CreateInformationLink(
        text: string,
        url: string
    ): HTMLAnchorElement {
        const link = document.createElement("a");

        link.textContent = text;
        link.href = url;

        return link;
    }

    private static GetPhoneDisplay(): string {
        return Contact.s_phone.replace(
            /(\+54)(9)(11)(\d{4})(\d{4})/,
            "$1 $2 $3 $4-$5"
        );
    }

    private static GetWhatsAppPhone(): string {
        return Contact.s_phone.replace(/\D/g, "");
    }
}