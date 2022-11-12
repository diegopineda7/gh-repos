import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CustomTextInput } from '../components';

// Hooks
import useLocalStorage from '../hooks/useLocalStorage';

export const LogInPage = () => {
  const { userError, validateUser } = useLocalStorage();

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, 'Debe de tener 15 caracteres o menos')
      .required('Requerido'),
    password: Yup.string().required('Reqiuerido'),
  });

  return (
    <div>
      <h1>Log in</h1>

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        enableReinitialize
        onSubmit={validateUser}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty }) => (
          <Form>
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
              Log in
            </button>
            {userError && <span>{userError}</span>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
