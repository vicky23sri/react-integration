/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Api.css'; // Import the CSS file for styling

const Autocomplete = () => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOptionDetails, setSelectedOptionDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/all.php');
                setOptions(response.data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchOptionDetails = async () => {
            if (selectedOptions.length > 0) {
                const selectedOption = selectedOptions[selectedOptions.length - 1];
                try {
                    const response = await axios.get(`http://localhost:3000/all-api.php?id=${selectedOption.id}`);
                    setSelectedOptionDetails(response.data);
                } catch (error) {
                    console.log('Error fetching option details:', error);
                }
            } else {
                setSelectedOptionDetails(null);
            }
        };
        fetchOptionDetails();
    }, [selectedOptions]);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setShowDropdown(query.length > 0);
    };

    const handleOptionClick = (option) => {
        const optionExists = selectedOptions.find((selectedOption) => selectedOption.id === option.id);
        if (!optionExists) {
            setSelectedOptions([...selectedOptions, option]);
        }
        setSearchQuery('');
        setShowDropdown(false);
    };

    const handleTagRemove = (optionId) => {
        setSelectedOptions(selectedOptions.filter((option) => option.id !== optionId));
    };

    const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    return (
        <div className="autocomplete-container">
            <div className="autocomplete-box">
                <div className="autocomplete-tags">
                    {selectedOptions.map((option) => (
                        <div key={option.id} className="autocomplete-tag">
                            {option.name}
                            <span className="autocomplete-tag-remove" onClick={() => handleTagRemove(option.id)}>
                                &times;
                            </span>
                        </div>
                    ))}
                </div>
                <div className="autocomplete-search-box">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="autocomplete-input"
                    />
                    {showDropdown && (
                        <ul className="autocomplete-dropdown">
                            {filteredOptions.map((option) => (
                                <li
                                    key={option.id}
                                    onClick={() => handleOptionClick(option)}
                                    className={selectedOptions.some((selectedOption) => selectedOption.id === option.id) ? 'active' : ''}
                                >
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Autocomplete;
