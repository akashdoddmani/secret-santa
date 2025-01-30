import React, { useState } from "react";
import { readCSV, assignChildren, createCSV } from "./utils";
import { Gift, Loader, Trees } from "lucide-react";
import FileUploadButton from "./components/FileUploadButton";
import Button from "./components/Button";
import "./snowfall.css";

function App() {
  const [employeesFile, setEmployeesFile] = useState<File | null>(null);
  const [previousAssignmentsFile, setPreviousAssignmentsFile] =
    useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmployeesFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setEmployeesFile(event.target.files[0]);
    }
  };

  const handlePreviousAssignmentsFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setPreviousAssignmentsFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!employeesFile) {
      alert("Please upload the employees CSV file.");
      setIsLoading(false);
      return;
    }

    try {
      const employeesData = await readCSV(employeesFile);
      let previousAssignmentsData: any[] = [];

      if (previousAssignmentsFile) {
        previousAssignmentsData = await readCSV(previousAssignmentsFile, true);
      }

      const assignments = assignChildren(
        employeesData,
        previousAssignmentsData
      );
      const csvData = createCSV(assignments);
      downloadCSV(csvData);
    } catch (error) {
      console.error("Error processing files:", error);
      alert("An error occurred while processing the files.");
    }

    setIsLoading(false);
  };

  const downloadCSV = (csv: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Secret_Santa_GameResults_2024.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col md:items-center md:justify-center h-screen bg-[#BFDBFE] md:bg-[#1E3A8A]">
      <div className="snowflakes" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="snowflake">
            {i % 2 === 0 ? "❅" : "❆"}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center bg-[#BFDBFE] sm:border-1 border-[#3B82F6]  rounded-md p-6">
        <div className="flex flex-row gap-2 w-full items-center justify-center">
          <Trees className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-[#1E40AF]">
            Secret Santa Magic
          </h1>
        </div>
        <p className="text-sm text-[#1E40AF]">
          Spread joy with a festive gift exchange!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <FileUploadButton
            file={employeesFile}
            onChange={handleEmployeesFileChange}
            label="Upload Nice List (CSV)"
            id="employeesFile"
          />

          <FileUploadButton
            file={previousAssignmentsFile}
            onChange={handlePreviousAssignmentsFileChange}
            label="Don't want to get the same secret child as last year? Upload previous assignments (CSV)"
            id="previousAssignmentsFile"
          />

          <Button
            className="bg-red-600 hover:bg-red-700 mt-8 w-[80%] py-4 text-lg font-bold absolute bottom-0 rounded-none md:rounded-md md:rounded-md md:static"
            type="submit"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 text-white animate-spin" />
            ) : (
              <Gift className="w-4 h-4 text-white" />
            )}
            Assign Secret Santas
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
