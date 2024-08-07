import { FaStar, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating?: number; // Rating is now optional
  maxStars?: number; // Default is 5 stars
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 0, maxStars = 5 }) => {
  // If rating is not provided or is less than or equal to 0, display "No rating available"
  if (rating <= 0) {
    return <p>No rating available</p>;
  }

  // Calculate the number of full, half, and empty stars
  const starRating = (rating / 100) * maxStars;
  const fullStars = Math.floor(starRating);
  const halfStar = starRating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = maxStars - fullStars - halfStar;

  return (
    <div className="flex items-center text-lg" role="img" aria-label={`Rating: ${rating}%`}>
      {Array(fullStars).fill(null).map((_, index) => (
        <FaStar key={`full-${index}`} className="text-yellow-500" />
      ))}
      {halfStar === 1 && <FaStar key="half" className="text-yellow-500" />}
      {Array(emptyStars).fill(null).map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-yellow-500" />
      ))}
    </div>
  );
};

export default StarRating;
