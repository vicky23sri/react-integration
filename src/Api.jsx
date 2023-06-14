/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import myApi from './myApi';
import AsyncSelect from 'react-select/async';

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setValue] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);

  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = (values) => {
    setSelectedValues(values);
  };

  const fetchUsers = async () => {
    const result = await myApi.get('/users?page=1');
    const res = result.data.data;
    return res;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={selectedValues}
            getOptionLabel={(e) => e.first_name + ' ' + e.last_name}
            getOptionValue={(e) => e.id}
            loadOptions={fetchUsers}
            onInputChange={handleInputChange}
            onChange={handleChange}
            isMulti // Enable multiselect
          />
        </div>
        <div className="col-md-4"></div>
      </div>

      <div className="row userDetails">
        {selectedValues.map((selectedValue) => (
          <div key={selectedValue.id} className="col-md-6">
            <div className="img">
              <img src={selectedValue.avatar} className="img-rounded" alt="User Avatar" />
              <h1>{selectedValue.first_name}  {selectedValue.last_name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
