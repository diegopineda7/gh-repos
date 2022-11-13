interface Props {
  value: string;
  placeholder?: string;
  onChange: (name: string) => void;
  onClear: () => void;
}

export const SearchInput = ({
  value,
  placeholder = '',
  onChange,
  onClear,
}: Props) => {
  return (
    <div className="search-container">
      <input
        value={value}
        placeholder={placeholder}
        onChange={(val) => onChange(val.target.value)}
        className={'text-input search-input'}
      />
      {value && <p onClick={onClear}>X</p>}
    </div>
  );
};
