import React, { useState } from 'react';
import "./App.css"; // Import CSS file for styling
import axios from 'axios';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const StoreHours = () => {
  const [storeHours, setStoreHours] = useState({
    Monday: { start: '', end: '', status: false },
    Tuesday: { start: '', end: '', status: false },
    Wednesday: { start: '', end: '', status: false },
    Thursday: { start: '', end: '', status: false },
    Friday: { start: '', end: '', status: false },
    Saturday: { start: '', end: '', status: false },
    Sunday: { start: '', end: '', status: false },
  });

  const [selectedOption, setSelectedOption] = useState('custom');

  const handleChange = (day, type, value) => {
    setStoreHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        [type]: value,
      },
    }));
  };

  const toggleStatus = (day) => {
    setStoreHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        status: !prevHours[day].status,
        start: '',
        end: '',
      },
    }));
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://your-laravel-api.com/store-hours', {
          storeHours: storeHours // Assuming your Laravel endpoint expects an object with a key 'storeHours'
        });
        console.log('Data saved successfully:', response.data);
        // Add any additional logic for success handling
      } catch (error) {
        console.error('Error saving data:', error);
        // Add error handling logic
      }
  };

  const selectTime = () => {
    const autoHours = {
      start: '12:00',
      end: '12:00',
      status: true,
    };
    const newStoreHours = {};
    daysOfWeek.forEach((day) => {
      newStoreHours[day] = { ...autoHours };
    });
    setStoreHours(newStoreHours);
  };

  const selectCustomAdd = () => {
    const customHours = {
      start: '',
      end: '',
      status: false,
    };
    const newStoreHours = {};
    daysOfWeek.forEach((day) => {
      newStoreHours[day] = { ...customHours };
    });
    setStoreHours(newStoreHours);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === 'auto') {
      selectTime();
    } else {
      selectCustomAdd();
    }
  };

  return (
    <>
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            name="selectOption"
            value="auto"
            checked={selectedOption === 'auto'}
            onChange={() => handleOptionChange('auto')}
          />
          Auto select Time
        </label>
        <label>
          <input
            type="radio"
            name="selectOption"
            value="custom"
            checked={selectedOption === 'custom'}
            onChange={() => handleOptionChange('custom')}
          />
          Custom select Time
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        {daysOfWeek.map((day) => (
          <div key={day} style={{ margin: '10px 0' }}>
            <label>{day}</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={storeHours[day].status} 
                onChange={() => toggleStatus(day)} 
              />
              <span className="slider round"></span>
            </label>
            <input
              type="time"
              value={storeHours[day].start}
              onChange={(e) => handleChange(day, 'start', e.target.value)}
              disabled={!storeHours[day].status}
              style={{ marginLeft: '10px' }}
            />
            <input
              type="time"
              value={storeHours[day].end}
              onChange={(e) => handleChange(day, 'end', e.target.value)}
              disabled={!storeHours[day].status}
              style={{ marginLeft: '10px' }}
            />
          </div>
          
        ))}
        <button type="submit">Save Store Hours</button>
      </form>
    </>
  );
};

export default StoreHours;
