// import React, { useContext, useEffect, useRef, useState } from 'react';
// import './Photos.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDebounce } from '../../../../../utils/hooks/useDebounce';
// import { AuthContext } from '../../../../../utils/context/AuthToken';
// import axios from 'axios';
  
// function Form({ data, state, setState }) {
//   const { auth } = useContext(AuthContext);
//   let { tmdbId, movieId } = useParams();

//   const [selectedData, setSelectedData] = useState(data);
//   const [file, setFile] = useState(null); // Use state to manage the file
//   const fileRef = useRef();
//   const descriptionRef = useRef();
//   const urlRef = useRef();
//   const [isError, setIsError] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');

//   useEffect(() => {
//     setSelectedData({ ...selectedData, movieId: movieId });
//   }, [movieId]);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateFields = () => {
//     const isUrlValid = validateField(urlRef, "URL");
//     const isDescriptionValid = validateField(descriptionRef, "Description");

//     return isUrlValid && isDescriptionValid;
//   };

//   const validateField = (fieldRef, fieldName) => {
//     if (!fieldRef.current.value.trim()) {
//       fieldRef.current.style.border = '2px solid red';
//       setTimeout(() => {
//         fieldRef.current.style.border = '1px solid #ccc';
//       }, 2000);
//       console.log(`${fieldName} cannot be empty.`);
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateFields()) {
//       return; // Stop if validation fails
//     }

//     const formData = new FormData();
//     formData.append('movieId', movieId);
//     formData.append('description', selectedData.description);
//     formData.append('url', selectedData.url);

//     if (file) {
//       formData.append('image', file); // Append file if it exists
//     }

//     try {
//       const response = await axios({
//         method: 'post',
//         url: '/admin/photos',
//         data: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${auth.accessToken}`,
//         },
//       });

//       console.log(response.data); // Check if the API returns the correct result
//       setIsError(false);
//       setAlertMessage('Photo added successfully!');
//       setTimeout(() => {
//         setAlertMessage('');
//         setState('base');
//       }, 2000);
//     } catch (error) {
//       console.log("Error Adding Photo:", error.response?.data?.errors[0] || error.message);
//       setIsError(true);
//       setAlertMessage(error.response?.data?.errors[0] || 'Error adding photo.');
//       setTimeout(() => setAlertMessage(''), 2000);
//     }
//   };

//   return (
//     <div className='photo-form-container'>
//       <input
//         className='photo-url'
//         value={selectedData.url || ''}
//         name='url'
//         onChange={handleOnChange}
//         ref={urlRef}
//       />
//       <textarea
//         className='photo-description'
//         value={selectedData.description || ''}
//         name='description'
//         onChange={handleOnChange}
//         ref={descriptionRef}
//       />
//       <input
//         type='file'
//         ref={fileRef}
//         onChange={(e) => setFile(e.target.files[0])}
//         className='input-file'
//       />
//       <button className='submit-btn' onClick={handleSubmit}>
//         Submit
//       </button>
//       {alertMessage && <div className={`alert ${isError ? 'error' : 'success'}`}>{alertMessage}</div>}
//     </div>
//   );
// }

// export default Form;
