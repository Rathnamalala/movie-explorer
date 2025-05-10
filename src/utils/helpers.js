/**
 * Format movie release date to readable format
 * @param {string} dateString - Date string from API
 * @returns {string} - Formatted date string
 */
export const formatReleaseDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format runtime to hours and minutes
 * @param {number} minutes - Runtime in minutes
 * @returns {string} - Formatted runtime string
 */
export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Get YouTube video URL from video key
 * @param {string} key - YouTube video key
 * @returns {string} - YouTube embed URL
 */
export const getYoutubeUrl = (key) => {
  return `https://www.youtube.com/embed/${key}`;
};

/**
 * Convert rating to readable format (e.g., 7.5 to 7.5/10)
 * @param {number} rating - Movie rating
 * @returns {string} - Formatted rating string
 */
export const formatRating = (rating) => {
  if (!rating && rating !== 0) return 'No rating';
  return `${rating.toFixed(1)}/10`;
};

/**
 * Get color based on rating
 * @param {number} rating - Movie rating
 * @returns {string} - CSS color value
 */
export const getRatingColor = (rating) => {
  if (!rating) return '#757575';
  if (rating >= 7) return '#4caf50';
  if (rating >= 5) return '#ff9800';
  return '#f44336';
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Check if object is empty
 * @param {object} obj - Object to check
 * @returns {boolean} - True if empty
 */
export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};