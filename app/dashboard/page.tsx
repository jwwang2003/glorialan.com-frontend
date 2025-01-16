"use client"

import React, { useState } from 'react';
import FileUpload from '../_components/FlieUpload';
import { apiRequest } from '@/_lib/api';

export default function Dashboard() {
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    const file = event.target.files[0];

    let uploadedBytes = 0;
    const chunkSize = 1024 * 50; // 50 KB chunk size

    // Create a ReadableStream to manually read and enqueue file slices
    const stream = new ReadableStream({
      async pull(controller) {
        // If we've already read the entire file, close the stream
        if (uploadedBytes >= file.size) {
          controller.close();
          return;
        }

        // Read the next slice
        const slice = file.slice(uploadedBytes, uploadedBytes + chunkSize);
        const arrayBuffer = await slice.arrayBuffer();
        const chunk = new Uint8Array(arrayBuffer);

        // Update the number of uploaded bytes
        uploadedBytes += chunk.length;

        // Calculate and update the current upload percentage
        const percentCompleted = Math.round((uploadedBytes / file.size) * 100);
        setUploadPercentage(percentCompleted);
        console.log('Uploaded bytes:', uploadedBytes, `(${percentCompleted}%)`);

        // Enqueue the chunk to the stream
        controller.enqueue(chunk);
      },
    });

    // Perform the fetch request with the stream as the body
    try {
      // const response = await apiRequest<{name: string }>(
      //   '/experimental/imageupload',
      //   {
      //     headers: {
      //       // "Content-Type": "multipart/form-data",
      //       "Content-Type": "application/octet-stream"
      //     },
      //     method: "POST",
      //     duplex: "half",
      //     body: stream,
      //     withCredentials: true
      //   }
      // );

      const response = await fetch('http://backend:8000/experimental/imageupload', {
        method: 'POST',
        body: stream,
        // Usually 'duplex: "half"' is the correct setting in browsers that support streaming
        // duplex: 'half',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      console.log('Server Response:', response);

    } catch (error) {
      console.error('Error while uploading:', error);
    }
  };

  return (
    <div>
      <p>Upload progress: {uploadPercentage}%</p>
      <FileUpload accept="image/jpeg, image/png" handler={handleImageUpload} />
    </div>
  );
}