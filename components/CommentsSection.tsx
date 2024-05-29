import { replaceHttpWithHttps } from "@/utils/helpingFunctions/functions";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const CommentsSection = () => {
  const [comments, setComments] = useState([
    {
      author: "Jane Doe",
      text: "Great event! Had a fantastic time.",
      rating: 5,
    },
    { author: "John Smith", text: "Well organized and fun.", rating: 4 },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleCommentChange = (e:any) => setNewComment(e.target.value);
  const handleRatingChange = (rating:any) => setNewRating(rating);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const comment = {
      author: "Anonymous",
      text: newComment,
      rating: newRating,
    };
    setComments([comment, ...comments]);
    setNewComment("");
    setNewRating(0);
  };

  return (
    <section className="comments-section">
      <h3 className="font-bold text-xl">Comments and Reviews</h3>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write your comment..."
          rows={4}
          required
        />
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`star ${newRating >= star ? "" : "empty"}`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul className="comments-list">
        {comments.map((comment, index) => (
          <li key={index} className="mb-4">
            <div className="p-4 rounded-lg flex items-center w-full bg-white border border-gray-200 shadow-lg  max-w-4xl mx-auto  ">
              <Image
                src={replaceHttpWithHttps(
                  "https://res.cloudinary.com/dm7gmrkki/image/upload/w_300,c_limit/v1710061258/n99emrwdhvmwd85nwkbu.png"
                )}
                alt="Organizer"
                className="w-16 h-16 rounded-full mr-4"
                height={960}
                width={600}
              />
              <div className="flex flex-col items-start">
                <div className="flex flex-col flex-grow item-start justify-start w-full">
                  <h3 className="font-bold text-left">{comment.author}</h3>
                  <p className="text-left text-sm text-gray-500">
                    {comment.text}
                  </p>
                </div>
                <div className="rating mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${
                        comment.rating >= star ? "" : "empty"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CommentsSection;
