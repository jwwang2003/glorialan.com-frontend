"use client";

import { useRef, ChangeEvent, useState } from "react";

export default function FileUpload({ accept }: { accept: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [openManager, setOpenManager] = useState<boolean>(false);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.target.files instanceof FileList) {
      const files = event.target.files;
      const temp: File[] = [];
      for (var i = 0; i < files.length; ++i) {
        temp.push(files[i]);
        
      }
      setSelectedFiles([...files, ...selectedFiles]);
    }
  };

  const handleClear = () => {
    setSelectedFiles([]);
  };

  const handleRemove = (idx: number) => {
    const newArray = [
      ...selectedFiles.slice(0, idx), // Elements before the one to delete
      ...selectedFiles.slice(idx + 1) // Elements after the one to delete
    ];
    setSelectedFiles(newArray);
  };

  return (
    <>
      <button
        onClick={() => {
          selectedFiles.length > 0
            ? setOpenManager(!openManager)
            : ref!.current!.click();
        }}
      >
        <input
          type="file"
          multiple
          ref={ref}
          name="file-uploader" 
          id="file-uploader"
          accept={accept}
          style={{ display: "none" }}
          onChange={onChangeFile}
          // bug fix, input event does not fire for duplicate inputs
          onClick={(event) => event.currentTarget.value = ""}
        ></input>
        {selectedFiles.length > 0
          ? `Selected ${selectedFiles.length} file(s)`
          : "Open File(s)"}
      </button>
      {/* Floating window */}
      {openManager ? (
        <div className="absolute w-full h-full p-4 top-0 left-0 z-10 bg-opacity-80 bg-white flex flex-col gap-4 overflow-auto">
          <div className="flex gap-1">
            <button
              onClick={() => {
                setOpenManager(false);
              }}
            >
              {"Close"}
            </button>
            <button className="ml-auto" onClick={handleClear}>
              {"Clear"}
            </button>
            <button className="" onClick={() => ref!.current!.click()}>
              {"Add File(s)"}
            </button>
          </div>
          <div>
            {selectedFiles.map((file, index, array) => (
              <div
                key={`${index}-` + file.name}
                className="flex flex-col bg-black text-white gap-2"
              >
                <div className="flex items-center p-2 gap-2">
                  <p>{index}</p><p>{file.name}</p>
                  <button className="ml-auto" onClick={() => handleRemove(index)}>X</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : false}
    </>
  );
}
