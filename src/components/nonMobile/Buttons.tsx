export default function Buttons({
    lang
}: {
    lang: "pt-br" | "en"
}) {
    return <nav>
        <button title={lang === "pt-br" ? "Arquivos" : "Files"}>
            <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/files.svg" alt="a file(paper with the top right corner folded) on the top of other file" />
        </button>
        <button title={lang === "pt-br" ? "Converse comigo" : "Chat with me"}>
            <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/copilot.svg" alt="the copilot logo" />
        </button>
        <button title={lang === "pt-br" ? "Baixar currículo" : "Download resume" }>
            <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/download.svg" alt="a arrow pointing to the bottom" />
        </button>
        <button title={lang === "pt-br" ? "Configurações" : "Settings"}>
            <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/settings-gear.svg" alt="a gear" />
        </button>
    </nav>;
}