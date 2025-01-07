"use client"

import React, { useState } from 'react';
import FileUpload from '../_components/FlieUpload';
import axios from "axios";

// import axios from 'axios';

export default function Dashboard() {
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    axios({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      data: formData,
      url: "/imageupload", // route name
      baseURL: "http://localhost:8000/experimental", //local url
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
      },
      encType: "multipart/form-data",
    }).then(res => {
      console.log(res.data)
    })

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