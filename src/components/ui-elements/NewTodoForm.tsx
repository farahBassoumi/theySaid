import React from 'react';
import { useTranslation } from 'react-i18next';

interface NewTodoFormProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({ value, onChange, onAdd }) => {
  const { t } = useTranslation();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={t('Add a new todo')}
        className="border p-2 mr-2"
      />
      <button onClick={onAdd} className="bg-blue-500 text-white p-2 rounded">
        {t('Add')}
      </button>
    </div>
  );
};

export default NewTodoForm;
