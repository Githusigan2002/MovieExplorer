export function converMin(minutes) {
  if (!minutes) return '2h 15m';
  const hour = Math.floor(minutes / 60);
  const remainingMin = minutes % 60;
  return `${hour}h ${remainingMin}m`;
}

export function getMatchPercentage(voteAverage) {
  if (!voteAverage) return '95% Match';
  const match = Math.round(voteAverage * 10);
  return `${Math.min(99, Math.max(80, match + 12))}% Match`;
}

const MY_LIST_KEY = 'movieexplorer_my_list_movies';

export function getMyList() {
  try {
    const list = localStorage.getItem(MY_LIST_KEY) || localStorage.getItem('netflix_my_list_movies');
    return list ? JSON.parse(list) : [];
  } catch (e) {
    console.error('Error reading My List from localStorage:', e);
    return [];
  }
}

export function toggleMyList(movie) {
  try {
    const currentList = getMyList();
    const exists = currentList.some((item) => item.id === movie.id);
    let updatedList;
    if (exists) {
      updatedList = currentList.filter((item) => item.id !== movie.id);
    } else {
      updatedList = [movie, ...currentList];
    }
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event('myListUpdated'));
    return !exists;
  } catch (e) {
    console.error('Error updating My List:', e);
    return false;
  }
}

export function isInMyList(movieId) {
  const currentList = getMyList();
  return currentList.some((item) => item.id === movieId);
}