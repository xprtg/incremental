import React from 'react';

interface CustomButtonProps {
    onClick: () => void;
    label: string;
}

const Clicker: React.FC<CustomButtonProps> = ({ onClick, label }) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
            {label}
        </button>
    );
};

export default Clicker;
