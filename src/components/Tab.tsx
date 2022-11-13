interface Props {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

export const Tab = ({ isActive, label, onClick }: Props) => {
  return (
    <div className={`tab ${isActive ? 'tab-active' : ''}`} onClick={onClick}>
      <label>{label}</label>
    </div>
  );
};
