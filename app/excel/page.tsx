"use client"

import React, { useState } from 'react';
import Papa from 'papaparse';

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
  const [csvData, setCsvData] = useState<CSVRow[]>([]);

  // Handler for uploading and parsing CSV
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // results.data is an array of objects keyed by header
        // For safety, transform to match our CSVRow type
        const parsedData = (results.data as any[]).map((row) => {
          return {
            artwork_id: row.artwork_id || '',
            date: row.date || '',
            country: row.country || '',
            city: row.city || '',
            location: row.location || '',
            address: row.address || '',
            tool: row.tool || '',
            original_source: row.original_source || '',
            tag: row.tag || '',
          };
        });
        setCsvData(parsedData);
      },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Uploader</h1>
      
      {/* Upload Input */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

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
                <tr key={index} className="hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-2 border">{row.artwork_id}</td>
                  <td className="px-4 py-2 border">{row.date}</td>
                  <td className="px-4 py-2 border">{row.country}</td>
                  <td className="px-4 py-2 border">{row.city}</td>
                  <td className="px-4 py-2 border">{row.location}</td>
                  <td className="px-4 py-2 border">{row.address}</td>
                  <td className="px-4 py-2 border">{row.tool}</td>
                  <td className="px-4 py-2 border">{row.original_source}</td>
                  <td className="px-4 py-2 border">{row.tag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CSVDisplay;

// export default function Excel() {
//   return (
//     <div>
      
//     </div>
//   )
// }