import React from 'react';
import './TodoComponent.css';

interface CheckmarkProps {
  isChecked: boolean;
}

const Checkmark: React.FC<CheckmarkProps> = ({ isChecked }) => (
  <svg
    viewBox="0 0 24 24"
    className={`checkmark ${isChecked ? 'isChecked' : ''}`}
  >
    <circle className="circle" cx="12" cy="12" r="10" />
    <polyline className="tick" points="6,12 10,16 18,8" />
  </svg>
);

export default Checkmark;
