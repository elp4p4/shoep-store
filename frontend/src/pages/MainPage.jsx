import React from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const MainPage = () => {
  useDocumentTitle("Home - ShoeP Store");
  return (
    <div className="bg-white">
      {/* Promotions and Ads Section */}
      <div className="bg-gray-500 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Special Offers!</h2>
        <p className="mb-4">
          Get up to 50% off on selected items. Limited time only!
        </p>
      </div>
      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative">
          <div className="relative overflow-hidden w-full h-[30rem] md:h-[calc(80vh-106px)] bg-gray-100 rounded-2xl">
            {/* Single Slide Example - You can convert this to a carousel later */}
            <div className="absolute top-0 bottom-0 start-0 flex flex-nowrap w-full">
              <div className="w-full">
                <div
                  className="h-[30rem] md:h-[calc(80vh-106px)] flex flex-col bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                  }}
                >
                  <div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10">
                    <span className="block text-black text-lg">
                      Adidas React
                    </span>
                    <span className="block text-black text-xl md:text-3xl font-bold mb-4">
                      Rewriting sport's playbook for billions of athletes
                    </span>
                    <div className="mt-5">
                      <Link
                        to="/category/men"
                        className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-black border border-transparent text-white hover:bg-gray-100 transition-colors"
                      >
                        Explore Collection
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Promotions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="https://i.imgur.com/LzisW9S.png"
                alt="Women Shoes Collection"
                className="w-full h-72 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-bold mb-4">Women Shoes Collection</h3>
              <p className="text-gray-600 mb-4">
                Featuring sport details such as hidden breathing vents
              </p>
              <Link
                to="/category/women"
                className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                Shop Women
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Men Shoes Collection"
                className="w-full h-72 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-bold mb-4">Men Shoes Collection</h3>
              <p className="text-gray-600 mb-4">
                Waterproof + antimicrobial linings for ultimate comfort
              </p>
              <Link
                to="/category/men"
                className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                Shop Men
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
