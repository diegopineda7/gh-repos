// Hooks
import useAuth from '../hooks/useAuth';

export const SignUpPage = () => {
  const { userError, askForAccess } = useAuth();

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <button type="button" onClick={askForAccess}>
          Sign up with GitHub
        </button>
        <h5>{userError}</h5>
      </form>
    </div>
  );
};
