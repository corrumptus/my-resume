import type { File } from "../../main"
import themes from "../../utils/themes"

export default function PrimarySideBar({
    files,
    selectedFile,
    selectFile,
    theme
}: {
    files: File[],
    selectedFile: File,
    selectFile: (fileName: string) => void,
    theme: keyof typeof themes
}) {
    return <aside>
        <div className="folder">Lucas Lazarini</div>
        <ul>
            {files.map(f =>
                <li
                    key={f.name}
                    onClick={() => selectFile(f.name)}
                    style={{
                        backgroundColor: selectedFile.name === f.name ?
                            themes[theme].folderSelectedFileBgColor
                            :
                            ""
                    }}
                >
                    {f.name}
                </li>
            )}
        </ul>
    </aside>;
}