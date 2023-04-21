import { useState } from "react";
import { HomepageSubscription } from "~/models/subscription.server";
import CardTags from "../CardTags";

type Props = {
  subscriptions: HomepageSubscription[];
};

const FeaturedMealsCarousel = ({ subscriptions }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % subscriptions.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + subscriptions.length) % subscriptions.length
    );
  };

  const currentSubscription = subscriptions[currentSlide];

  return (
    <div className="relative">
      <div className="carousel-container">
        <div className="carousel flex justify-center">
          <div className="carousel-slide">
            <div className="w-5xl flex flex-col rounded-lg border p-4 md:flex-row">
              <img
                className="mb-4 w-full rounded-lg md:mb-0 md:w-2/3"
                src={currentSubscription.meal.image}
                alt={currentSubscription.title}
              />
              <div className="relative ml-0 flex w-full flex-col md:ml-4 md:w-1/3">
                <div className="flex">
                  <img
                    className="mr-2 h-24 w-24 rounded-lg object-cover"
                    src={currentSubscription.cook.avatar}
                    alt={`${currentSubscription.cook.name}'s avatar`}
                  />
                  <span className="text-lg font-medium">
                    {currentSubscription.cook.name}
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-bold">
                  {currentSubscription.title}®
                </h2>
                <CardTags
                  meal={currentSubscription.meal}
                  justify="justify-start"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev absolute top-1/2 left-0 -translate-y-1/2 transform"
        onClick={prevSlide}
      >
        <span className="sr-only">Previous</span>
        &lt;
      </button>
      <button
        className="carousel-control-next absolute top-1/2 right-0 -translate-y-1/2 transform"
        onClick={nextSlide}
      >
        <span className="sr-only">Next</span>
        &gt;
      </button>
    </div>
  );
};

export default FeaturedMealsCarousel;
