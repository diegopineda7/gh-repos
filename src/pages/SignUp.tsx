import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Components
import { CustomTextInput } from '../components';

// Hooks
import useLocalStorage from '../hooks/useLocalStorage';

export const SignUpPage = () => {
  const { userError, registerUser } = useLocalStorage();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Debe de tener 15 caracteres o menos')
      .required('Requerido'),
    lastName: Yup.string()
      .max(15, 'Debe de tener 15 caracteres o menos')
      .required('Requerido'),
    username: Yup.string()
      .max(15, 'Debe de tener 15 caracteres o menos')
      .required('Requerido'),
    password: Yup.string().required('Reqiuerido'),
  });

  return (
    <div>
      <h1>Sign Up</h1>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          password: '',
        }}
        onSubmit={registerUser}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty }) => (
          <Form>
            <CustomTextInput
              label="First name"
              name="firstName"
              placeholder="Fernando"
            />
            <CustomTextInput
              label="Last name"
              name="lastName"
              placeholder="Herrera"
            />
            <CustomTextInput
              label="GitHub username"
              name="username"
              placeholder="myuser"
            />
            <CustomTextInput
              label="GitHub password"
              name="password"
              placeholder="******"
              type="password"
            />
            <button type="submit" disabled={!isValid || !dirty}>
              Create account
            </button>
            {userError && <span>{userError}</span>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
