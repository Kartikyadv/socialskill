import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const formRef = useRef(null);

  const handleAddPostClick = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', postContent);
    if (postImage) {
      formData.append('image', postImage);
    }
    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created:', response.data);
      setPostContent('');
      setPostImage(null);
      setImagePreview(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsFormVisible(false);
    }
  };

  useEffect(() => {
    if (isFormVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormVisible]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <button
        onClick={handleAddPostClick}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition duration-300"
      >
        Add Post
      </button>
      {isFormVisible && (
        <div ref={formRef} className="mt-6 p-4 bg-white rounded shadow-lg w-full relative">
          <button
            onClick={() => setIsFormVisible(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <form onSubmit={handleFormSubmit}>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Write your post here..."
              className="w-full h-32 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4"
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Selected" className="w-full h-auto rounded" />
              </div>
            )}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition duration-300"
            >
              Submit Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
