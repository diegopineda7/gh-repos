import { Repo } from '../interfaces';
import heartFull from '../assets/heart-full.svg';
import heartEmpty from '../assets/heart-empty.svg';
import { capitalizeFirstLetter } from '../api/utils';

interface Props {
  repo: Repo;
  isFavorite?: boolean;
  onClickFavorite: () => void;
}

export const RepoCard = ({ repo, isFavorite, onClickFavorite }: Props) => {
  return (
    <div className="repo-card">
      <div className="repo-card-header">
        <a href={repo.url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
        <img
          src={isFavorite ? heartFull : heartEmpty}
          onClick={onClickFavorite}
          alt={isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
          title={isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
          width={30}
        ></img>
      </div>

      <div className="repo-card-footer">
        <p>{repo.primaryLanguage.name}</p>
        <p>{capitalizeFirstLetter(repo.visibility)}</p>
      </div>
    </div>
  );
};
