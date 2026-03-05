import type { AvailableLangs, File } from "../main";

export default function useMutualFunctions(
    lang: AvailableLangs,
    setLang: (lang: AvailableLangs) => void,
    files: File[],
    setFiles: (callback: (prev: File[]) => File[]) => void,
    fileSelectionStack: string[],
    setFileSelectionStack: (callback: (prev: string[]) => string[]) => void
) {
    function changeLang(newLang: AvailableLangs) {
        if (newLang === lang)
            return;

        setLang(newLang);

        setFiles(prevFiles => {
            prevFiles[0].name = newLang === "pt-br" ? "currículo.html" : "resume.html";
            return [ ...prevFiles ];
        });

		setFileSelectionStack(prevFileSelectionStack => {
			const index = prevFileSelectionStack.indexOf(lang === "pt-br" ? "currículo.html" : "resume.html");
			prevFileSelectionStack[index] = newLang === "pt-br" ? "currículo.html" : "resume.html";
			return [ ...prevFileSelectionStack ];
		});
    }

	function newFile(name: string) {
		if (
			name === "currículo"
			||
			name === "resume"
			||
			files.find(f => f.name === name) !== undefined
		)
			return;

		setFiles(prevFiles => {
			const newFile: File = {
				name: name,
				content: "",
				isOpen: true
			};

			return [ ...prevFiles, newFile ];
		});

		setFileSelectionStack(prevFileSelectionStack => [ ...prevFileSelectionStack, name ]);
	}

	function changeFileContent(content: string) {
		setFiles(prevFiles => {
			const selectedFile = prevFiles.find(f => f.name === fileSelectionStack.at(-1) as string) as File;

			selectedFile.content = content;

			return [ ...prevFiles ];
		});
	}

	function selectFile(fileName: string) {
		if (fileName === fileSelectionStack.at(-1))
			return;

		setFiles(prevFiles => {
			const file = prevFiles.find(f => f.name === fileName)!;

			file.isOpen = true;

			return [ ...prevFiles ];
		});

		setFileSelectionStack(prevFileSelectionStack => {
			const index = prevFileSelectionStack.indexOf(fileName);

			if (index !== -1)
				prevFileSelectionStack.splice(index, 1);

			prevFileSelectionStack.push(fileName);

			return [ ...prevFileSelectionStack ];
		});
	}

	function closeFile(fileName: string) {
		const fileIndex = files.findIndex(f => f.name === fileName);

		if (fileIndex === 0)
			return;

		setFiles(prevFiles => {
			prevFiles[fileIndex].isOpen = false;

			return [ ...prevFiles ];
		});

		setFileSelectionStack(prevFileSelectionStack => {
			const fileInStackIndex = prevFileSelectionStack.indexOf(fileName);

			prevFileSelectionStack.splice(fileInStackIndex, 1);

			return [ ...prevFileSelectionStack ];
		});
	}

	function removeFile(fileName: string) {
		const fileIndex = files.findIndex(f => f.name === fileName);

		if (fileIndex === 0)
			return;

		setFiles(prevFiles => {
			prevFiles.splice(fileIndex, 1);

			return [ ...prevFiles ];
		});

		setFileSelectionStack(prevFileSelectionStack => {
			const fileInStackIndex = prevFileSelectionStack.indexOf(fileName);

			prevFileSelectionStack.splice(fileInStackIndex, 1);

			return [ ...prevFileSelectionStack ];
		});
	}

    return [ changeLang, newFile, changeFileContent, selectFile, closeFile, removeFile ] as const;
}