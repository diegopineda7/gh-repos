import useRepos from '../hooks/useRepos';

export const ReposPage = () => {
  const { repos } = useRepos();

  return (
    <div>
      <h1>My repos</h1>
      {repos.map((repo) => (
        <h6 key={repo.id}>{repo.name}</h6>
      ))}
    </div>
  );
};
