import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prev } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await axios.post(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers",
          {
            inputs: form.prompt
          },
          {
            headers: {
              Authorization: 'Bearer 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',
              'Content-Type': 'application/json'
            },
            responseType: 'blob'
          }
        );

        const imageBlob = response.data;
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
          const base64data = reader.result;
          setForm({ ...form, photo: base64data });
        };
      } catch (err) {
        alert(err.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Posted Successfully!!..');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details!');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 id='Create' className='font-semibold text-[#b6c2ff] text-[42px] uppercase '>Create</h1>
        <p className='mt-2 text-[#dcefff] text-[14px] max-w-[500px]'> Create imaginative and visually stunning images through AI and share them with the community. </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5 text-gray-100'>
          <FormField 
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="Mohd. Farzan"
            value={form.name}
            handleChange={handleChange}
          />
          
          <FormField 
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Dracula walking down the street of New York City in the 1920s, black and white photography"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-2/4 p-3 h-2/4 flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img
                src={Prev}
                alt="preview"
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-sky-600 text-medium rounded-md w-full px-5 py-2.5 hover:bg-gradient-to-r from-blue-700 to-red-500"
          >
            {generatingImg ? 'Generating...' : 'GENERATE'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#dcefff] text-[14px]'>Once you have created an image share it with others in the community</p>
          <button 
            type='submit'
            className='mt-3 text-white bg-[#796efc] font-medium rounded-md text-sm w-full px-5 py-2.5 text-center hover:bg-green-700' >
            {loading ? 'Sharing...' : 'Share With the community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
