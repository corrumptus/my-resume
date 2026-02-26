import type { File } from "../../main";

export default function PrimarySideBar({
    files,
    selectedFile,
    selectFile
}: {
    files: File[],
    selectedFile: File,
    selectFile: (fileName: string) => void
}) {
    return <aside>
        <header>Lucas Lazarini</header>
        <ul>
            {files.map(f =>
                <li
                    key={f.name}
                    onClick={() => selectFile(f.name)}
                    className={selectedFile.name === f.name ? "selected" : ""}
                >
                    {f.name}
                </li>
            )}
        </ul>
    </aside>;
}