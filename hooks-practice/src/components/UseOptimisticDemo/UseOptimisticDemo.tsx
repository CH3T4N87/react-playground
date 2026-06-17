import { useOptimistic, useState } from "react";

export default function UseOptimisticDemo() {
  const [likes, setLikes] = useState(0);

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes) => currentLikes + 1
  );

  const handleLike = async () => {
    addOptimisticLike(1);

    await new Promise((resolve) => setTimeout(resolve, 20000));
    setLikes((prev) => prev + 1);

  };

  return (
    <>
      <h2>Likes: {optimisticLikes}</h2>

      <button onClick={handleLike}>
        Like
      </button>
    </>
  );
}