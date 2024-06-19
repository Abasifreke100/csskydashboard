interface CheckboxProps {
    id: string; // Unique identifier for the row
    isChecked: boolean; // Whether the checkbox is checked
    onChange: (id: string, isChecked: boolean) => void; // Handler for checkbox change
  }
  
 export  const Checkbox: React.FC<CheckboxProps> = ({ id, isChecked, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(id, event.target.checked);
    };
  
    return <input type="checkbox" className="cursor-pointer outline-none" checked={isChecked} onChange={handleChange} />;
  };
  