import css from "./SearchBox.module.css"; 

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  function updateSearchQuery(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <input
      className={css.input}  
      type="text"
      placeholder="Search notes"
      value={value}          
      onChange={updateSearchQuery} 
    />
  );
}
