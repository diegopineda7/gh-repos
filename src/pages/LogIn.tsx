import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Components
import { CustomTextInput } from '../components';

// Hooks
import useAuth from '../hooks/useAuth';
import { REQUIRED_FIELD } from '../constants';

export const LogInPage = () => {
  const { userError, validateUser } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string().required(REQUIRED_FIELD),
  });

  return (
    <div>
      <h1>Log in</h1>

      <Formik
        initialValues={{
          username: '',
        }}
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

            <button type="submit" disabled={!isValid || !dirty}>
              Log in
            </button>
            <h4>{userError}</h4>
          </Form>
        )}
      </Formik>
    </div>
  );
};
