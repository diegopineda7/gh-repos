import useRepos from '../hooks/useRepos';
import { SearchInput, Tab } from '../components';
import { RepoCard } from '../components/RepoCard';

export const ReposPage = () => {
  const {
    allRepos,
    repos,
    favorites,
    searchText,
    isFavoritesTab,
    handleSearchByName,
    clearSearch,
    setIsFavoritesTab,
    toggleFavoriteRepo,
  } = useRepos();

  return (
    <div>
      <h1>My repos</h1>
      {allRepos.length > 0 && (
        <>
          <SearchInput
            value={searchText}
            placeholder="Search..."
            onChange={handleSearchByName}
            onClear={clearSearch}
          />
          {!searchText && (
            <div className="tabs-container">
              <Tab
                isActive={!isFavoritesTab}
                label={`All (${allRepos.length})`}
                onClick={() => setIsFavoritesTab(false)}
              />
              <Tab
                isActive={isFavoritesTab}
                label={`Favorites (${favorites.length})`}
                onClick={() => setIsFavoritesTab(true)}
              />
            </div>
          )}
        </>
      )}

      <div className="repos-container">
        {repos.length > 0 &&
          repos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              isFavorite={favorites.includes(repo.id)}
              onClickFavorite={() => toggleFavoriteRepo(repo)}
            />
          ))}
        {repos.length === 0 && (
          <p>
            You have no {isFavoritesTab ? 'favorite' : ''} repos{' '}
            {searchText ? `named "${searchText}"` : ''}{' '}
          </p>
        )}
      </div>
    </div>
  );
};
