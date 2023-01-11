import { useState } from "react";

export default function RecipeCard({ recipe }: { recipe: any }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg shadow-lg">
      <div className="flex h-64 w-full flex-col items-center justify-center overflow-hidden bg-gray-100">
        <img
          src="https://dummyimage.com/256x256"
          alt="meal"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col space-y-2 py-4">
        <h1 className="text-center text-xl font-bold text-primary">
          {recipe.title}
        </h1>
        <p className="text-center text-sm text-gray-600">
          {recipe.body.slice(0, showMore ? recipe.body.length : 100)}
        </p>
        <div className="flex flex-col space-y-2">
          <button
            className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
}
