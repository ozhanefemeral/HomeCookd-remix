import { Subscription } from "@prisma/client";

const FeaturedSubscriptionHomePage = ({ subscription }: { subscription: Subscription }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center w-full h-64 overflow-hidden bg-gray-100">
        <img src="https://dummyimage.com/256x256" alt="meal" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col w-full space-y-2 py-4">
        <h1 className="text-xl font-bold text-center text-primary">{subscription.title}</h1>
        <h3 className="text-lg text-center text-black font-bold">{subscription.price} ₺</h3>
      </div>
    </div>
  );
};

export default FeaturedSubscriptionHomePage;