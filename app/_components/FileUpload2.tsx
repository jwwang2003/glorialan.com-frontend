import React from "react";
import Button from "./UI/Button";

interface UploadInputProps {
  /**
   * Handler for when a file is uploaded.
   * The event contains the FileList in event.target.files
   */
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Name (or array of names) of the selected file(s).
   * If `multiple` is true, this can be a string array.
   * Otherwise a single string is used.
   */
  selectedFile?: string | string[];

  /**
   * One or more file type(s) the user can select.
   * Accepts a comma-separated string (".csv,.txt") or an array of strings.
   */
  accept?: string | string[];

  /**
   * Allows multiple file uploads if true.
   */
  multiple?: boolean;
}

export const UploadInput: React.FC<UploadInputProps> = ({
  handleFileUpload,
  selectedFile = "",
  accept = ".csv",
  multiple = false,
}) => {
  // Normalize `accept` to a comma-separated string if it’s an array.
  const acceptString = Array.isArray(accept) ? accept.join(",") : accept;

  // Normalize `selectedFile` to a string if it’s an array.
  const selectedFileLabel = Array.isArray(selectedFile)
    ? selectedFile.join(", ")
    : selectedFile;

  return (
    <div className="flex flex-row items-center">
      <input
        type="file"
        id="custom-input"
        onChange={handleFileUpload}
        accept={acceptString}
        multiple={multiple}
        hidden
      />
      <label
          htmlFor="custom-input"
          className=""
        >
          <Button className="pointer-events-none">Choose File</Button> 
      </label>
      
      
      <span className="ml-4 text-sm text-slate-500">{selectedFileLabel}</span>
    </div>
  );
};
