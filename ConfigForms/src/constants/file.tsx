// import axios from "axios";
// import type { ChangeEvent } from "react";

// // Create FormData and append
// const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//   const formData = new FormData();
//   formData.append("photo", e.target.files[0]);
  
//   // Optional: append other fields
//   formData.append("name", "example");
  
//   try {
//     const response = await axios.post("/api/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error("Upload failed:", error);
//   }
// };
