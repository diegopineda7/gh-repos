// Hooks
import useLocalStorage from '../hooks/useLocalStorage';

export const SignUpPage = () => {
  const { userError, askForAccess } = useLocalStorage();

  return (
    <div>
      <h1>Sign Up</h1>

      <button onClick={askForAccess}>Create account</button>
      <h1>{userError}</h1>
    </div>
  );
};
