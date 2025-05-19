import Image from "next/image";
import { ImQuotesLeft } from "react-icons/im";
import { Review } from "@/types/Common";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-full">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
        <Image
          src={review.avatar || "/placeholder.svg"}
          alt={review.name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-green-800 mb-1">
        {review.name}
      </h3>

      {/* Location */}
      <p className=" mb-4">{review.location}</p>

      {/* Review Text */}

      <p className="text-[#676767] font-normal font-montserrat text-lg mb-6 h-24">
        {review.review.split(" ").slice(0, 16).join(" ") +
          (review.review.split(" ").length > 16 ? "..." : "")}
      </p>

      {/* Quote Icon */}
      <div className="mt-auto">
        <div className="w-16 h-16 rounded-full border-2 border-green-800/10 flex items-center justify-center">
          <ImQuotesLeft className="w-9 h-9 text-green-800/10" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
