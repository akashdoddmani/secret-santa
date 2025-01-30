import { Upload, RotateCcw } from "lucide-react";
import React from "react";
import Button from "./Button";

const FileUploadButton = ({
  file,
  onChange,
  label,
  id,
}: {
  file: File | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
}) => {
  return (
    <div className="bg-white rounded-md p-2 flex flex-col items-center justify-center mt-4 w-[80%]">
      <label
        className="text-sm font-medium text-[#1E40AF] text-center mb-2"
        htmlFor={id}
      >
        {label}
      </label>

      <Button
        onClick={() => {
          document.getElementById(id)?.click();
        }}
        className="bg-[#1E40AF] hover:bg-[#1E40AF]/80"
      >
        {file ? file.name : "Choose File"}
        {file ? (
          <RotateCcw className="w-4 h-4 text-white" />
        ) : (
          <Upload className="w-4 h-4 text-white" />
        )}
      </Button>

      <input
        className="hidden"
        type="file"
        id={id}
        accept=".csv"
        onChange={onChange}
      />
    </div>
  );
};

export default FileUploadButton;
