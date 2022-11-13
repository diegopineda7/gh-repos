import { ErrorMessage, useField } from 'formik';

interface Props {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
}

export const CustomTextInput = (props: Props) => {
  const [field, meta] = useField(props);
  const { name, label, type = 'text', placeholder = '' } = props;

  return (
    <div className="text-input-container">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`text-input ${
          meta.error && meta.touched ? 'input-error' : ''
        }`}
        {...field}
      />
      <ErrorMessage name={name} component="span" />
    </div>
  );
};
