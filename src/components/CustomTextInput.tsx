import { ErrorMessage, useField } from 'formik';

interface Props {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
}

export const CustomTextInput = (props: Props) => {
  const [field] = useField(props);
  const { name, label, type, placeholder } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        className="text-input"
        type={type || 'text'}
        placeholder={placeholder}
        {...field}
      />
      <ErrorMessage name={name} component="span" />
    </>
  );
};
