"use client"

import React, { useState } from 'react';
import FileUpload from '../_components/FlieUpload';
import { apiRequest } from '@/lib/api';

// import axios from 'axios';

export default function Dashboard() {
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    
    const result = await apiRequest<{name: string }>(
      '/experimental/imageupload',
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent!.total!)
          console.log(percentCompleted)
        },
        data: formData,
        withCredentials: true
      }
    );

    console.log(result);

    try {
      // const response = await axios.post('/api/enhance-image', formData);
      // Handle the enhanced image response here
      // console.log('Enhanced image:', response.data);
      // Update state or display the enhanced image
    } catch (error) {
      console.error('Error enhancing image:', error);
    }
  };

  return (
    <div>
      <FileUpload accept="image/jpeg, image/png" handler={handleImageUpload}/>
    </div>
  )
}