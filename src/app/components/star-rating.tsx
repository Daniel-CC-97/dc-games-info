import { FaStar, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating?: number; // rating is now optional
  maxStars?: number; // default is 5 stars
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  if (rating === undefined || rating <= 0) {
    return <p>No rating available</p>;
  }

  const starRating = (rating / 100) * maxStars;
  const fullStars = Math.floor(starRating);
  const halfStar = starRating - fullStars > 0.5 ? 1 : 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
      {halfStar === 1 && <FaStar className="text-yellow-500" />}
      {[...Array(maxStars - fullStars - halfStar)].map((_, index) => (
        <FaRegStar key={index} className="text-yellow-500" />
      ))}
    </div>
  );
};

export default StarRating;

