import React from 'react';

interface AddButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
  variant?: 'filled' | 'outline';
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, disabled, label, variant = 'filled' }) => {
  const baseClasses = 'px-3 py-2 rounded text-sm font-medium transition-colors';
  const filledClasses = 'bg-primary-orange text-primary-white hover:bg-orange-600 disabled:opacity-50';
  const outlineClasses = 'bg-transparent border border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-primary-white disabled:opacity-50';

  const classes = `${baseClasses} ${variant === 'filled' ? filledClasses : outlineClasses}`;

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {label}
    </button>
  );
};

export default AddButton;
