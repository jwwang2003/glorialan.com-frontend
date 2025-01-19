"use client";

import React, { useState } from "react";
import Papa from "papaparse";

import { UploadInput } from "@/components/FileUpload2";
import toast from "react-hot-toast";
import Button from "@/components/UI/Button";

type CSVRow = {
  artwork_id: string;
  date: string;
  country: string;
  city: string;
  location: string;
  address: string;
  tool: string;
  original_source: string;
  tag: string;
};

const CSVDisplay: React.FC = () => {
  const [csvState, setCsvState] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [selectedFile, setSelectedFile] = useState("No file chosen");

  // Handler for uploading and parsing CSV
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // results.data is an array of objects keyed by header
        // For safety, transform to match our CSVRow type
        setCsvState(true);
        // toast.error(results.errors[0].message)
        const parsedData = (results.data as any[]).map((row) => {
          return {
            artwork_id: row.artwork_id || "",
            date: row.date || "",
            country: row.country || "",
            city: row.city || "",
            location: row.location || "",
            address: row.address || "",
            tool: row.tool || "",
            original_source: row.original_source || "",
            tag: row.tag || "",
          };
        });
        setCsvData(parsedData);
      },
      error: (error, file) => {
        // Handle error while parsing the file
        setCsvState(false);
        toast.error(error.message);
        if(error.cause)
          toast.error(JSON.stringify(error.cause));
      },
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ingest Station</h1>

      <div className="flex flex-col lg:flex-row-reverse gap-2">
        <div className="w-full lg:w-1/3 flex flex-col gap-2">
          <div className="p-4 bg-white flex flex-col gap-2">
            <h1 className="text-xl font-bold">Select a datasheet</h1>
            {/* Upload Input */}
            <UploadInput
              handleFileUpload={handleFileUpload}
              selectedFile={selectedFile}
              accept={[".csv", ".txt"]}
              // multiple={true}
            />
          </div>
          
          {csvState && (
            <div className="p-4 bg-white flex flex-col gap-2">
              <h1 className="text-xl font-bold">Datasheet Stats</h1>
              <p>{csvData.length + " " + "entires"}</p>
              {/* <ProgressButton /> */}
              <Button theme="green" state="finished">
                Select files
              </Button>
            </div>
          )}

          <Button disabled theme="green">
            Upload
          </Button>
        </div>

        <div className="grow overflow-x-scroll">
          {/* Table */}
          {csvData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-white text-black">
                    <th className="px-4 py-2 border">Artwork ID</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Country</th>
                    <th className="px-4 py-2 border">City</th>
                    <th className="px-4 py-2 border">Location</th>
                    <th className="px-4 py-2 border">Address</th>
                    <th className="px-4 py-2 border">Tool</th>
                    <th className="px-4 py-2 border">Original Source</th>
                    <th className="px-4 py-2 border">Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-2 border">{row.artwork_id}</td>
                      <td className="px-4 py-2 border">{row.date}</td>
                      <td className="px-4 py-2 border">{row.country}</td>
                      <td className="px-4 py-2 border">{row.city}</td>
                      <td className="px-4 py-2 border">{row.location}</td>
                      <td className="px-4 py-2 border">{row.address}</td>
                      <td className="px-4 py-2 border">{row.tool}</td>
                      <td className="px-4 py-2 border">
                        {row.original_source}
                      </td>
                      <td className="px-4 py-2 border">{row.tag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVDisplay;