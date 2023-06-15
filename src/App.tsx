import React, { useState, useRef } from 'react';
import { MdDensityMedium } from 'react-icons/md';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import './App.css';

function App() {
  const [items, setItems] = useState([
    {
      title: 'Profile Summary',
      description: 'A concise overview highlighting key skills, qualifications, and experience.',
    },
    {
      title: 'Academic and Cocurricular Achievements',
      description: 'Highlights awards and achievements in academics and cocurricular activities.',
    },
    {
      title: 'Summer Internship Experience',
      description: 'Provides details about your internships during the summer period.',
    },
    {
      title: 'Work Experience',
      description: 'Outlines your previous work experiences, including job positions, responsibilities, and accomplishments.',
    },
    {
      title: 'Projects',
      description: 'Highlights significant projects you have completed, showcasing your skills.',
    },
    {
      title: 'Certifications',
      description: 'Includes information about certifications or professional qualifications you have obtained.',
    },
    {
      title: 'Leadership Positions',
      description: 'Describes your leadership roles or positions held, highlighting your responsibilities.',
    },
    {
      title: 'Extracurricular',
      description: 'Includes involvement in extracurricular activities, such as clubs, sports, volunteer work, or community engagement.',
    },
    {
      title: 'Education',
      description: 'Provides details about your educational background, including degrees and institutions.',
    },
  ]);

  const [selectedSection, setSelectedSection] = useState(null);
  const [editedItems, setEditedItems] = useState([...items]);
  const [editingItemIndex, setEditingItemIndex] = useState(-1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);


  const handleSort = () => {
    let _items = [...items];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    _items.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItems(_items);
    setEditedItems(_items);
  };

  const handleSectionClick = (index) => {
    setSelectedSection(index === selectedSection ? null : index);
  };

  const handleEditButtonClick = (index) => {
    setEditingItemIndex(index);
    setIsEditMode(true);
  };

  const handleSaveButtonClick = () => {
    if (hasUnsavedChanges) {
      const newItems = [...items];
      newItems[editingItemIndex] = editedItems[editingItemIndex];
      setItems(newItems);
      setIsEditMode(false);
      setEditingItemIndex(-1);
      setHasUnsavedChanges(false);
    }
  };

  const handleEditItemTitle = (index, value) => {
    const newItems = [...editedItems];
    newItems[index].title = value;
    setEditedItems(newItems);
    setHasUnsavedChanges(true);
  };

  return (
    <div className="App">
   
      <div className="list-container-1"></div>
      <div className="list-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`list-item `}
            draggable
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <MdDensityMedium
            />
            <IoInformationCircleOutline
              className="info-icon"
              onClick={() => handleSectionClick(index)}
            />
            {isEditMode && editingItemIndex === index ? (
              <input
                type="text"
                className="text-input"
                value={editedItems[index].title}
              />
            ) : (
              <p className="item-title-style">{item.title}</p>
            )}
            {selectedSection === index && (
              <p className="section-description">{item.description}</p>
            )}
            {isEditMode && editingItemIndex === index ? (
              <button
                onClick={handleSaveButtonClick}
                className={`edit-save-button ${hasUnsavedChanges ? 'unsaved-changes' : ''}`}
                disabled={!hasUnsavedChanges}
              >
                Save
              </button>
            ) : (
              <MdOutlineModeEditOutline
                onClick={() => handleEditButtonClick(index)}
                className="edit-icon"
              />
            )}
            
            <label className="switch">
                  <input
                    type="checkbox"
                  />
                  <span className="slider round"></span>
                </label>
          </div>
        ))}
      </div>
      {(
        <button className="save-next-button">
          Save and Next
        </button>
      )}
    </div>
  );
}

export default App;