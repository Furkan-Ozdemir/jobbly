export function formatDateDifference(date1, date2) {
  const diffInMs = new Date(date2) - new Date(date1);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 14) {
    return "1 week ago";
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} weeks ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} months ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} years ago`;
  }
}
