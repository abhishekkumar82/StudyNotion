import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  useEffect(() => {
    // If editing a course, populate the chips with the course's tags
    if (editCourse) {
      setChips(course?.tag || []);
    }

    // Register the input field with React Hook Form
    register(name, {
      required: true,
      validate: (value) => Array.isArray(value) && value.length > 0,
    });

    return () => {
      // Cleanup to prevent memory leaks
      setValue(name, []); // Reset the value when unmounted
    };
  }, [editCourse, course, name, register, setValue]);

  useEffect(() => {
    // Update the form value whenever the chips array changes
    if (getValues(name) !== chips) {
      setValue(name, chips);
    }
  }, [chips, name, setValue, getValues]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips((prevChips) => [...prevChips, chipValue]);
        event.target.value = '';
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    setChips((prevChips) => prevChips.filter((_, index) => index !== chipIndex));
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
