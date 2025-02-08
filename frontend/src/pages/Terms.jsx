import React from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const TermsOfService = () => {
  useDocumentTitle("Terms of Service");
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Image with overlay */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1585995604064-e1c454b311d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your shoe store image URL
                alt="Shoe Store Hero"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-indigo-600 opacity-50 rounded-2xl"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                <p className="mt-4 text-lg text-white font-medium">
                  Shoep Store Policies & Customer Rights
                </p>
              </div>
            </div>
            {/* Right Column: Terms Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 overflow-y-auto">
              <div className="prose max-w-none">
                <h2 className="text-xl font-extrabold text-indigo-700 border-b-2 pb-2">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using our Shoe Store website, you agree to be
                  bound by these terms and conditions.
                </p>

                <h2 className="text-xl font-extrabold text-indigo-700 border-b-2 pb-2">
                  2. Use License
                </h2>
                <ul className="list-disc pl-6">
                  <li>
                    Permission is granted to temporarily download one copy of
                    the materials for personal, non-commercial use only.
                  </li>
                  <li>
                    This license is non-transferable and does not allow
                    modification or reproduction of our product images,
                    descriptions, or other content.
                  </li>
                </ul>

                <h2 className="text-xl font-extrabold text-indigo-700 border-b-2 pb-2">
                  3. Refund & Replacement Policy
                </h2>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <p className="text-sm text-red-700">
                    We accept returns within <strong>14 days</strong> of
                    purchase. The shoes must be unworn, in their original
                    packaging, and accompanied by a valid receipt. If the
                    product is defective, we will provide a **free replacement**
                    or full refund. Refunds are processed within **5-7 business
                    days** after inspection.
                  </p>
                </div>

                <h2 className="text-xl font-extrabold text-indigo-700 border-b-2 pb-2">
                  4. Shipping Policy
                </h2>
                <p>
                  Orders are shipped within **2-3 business days** after payment
                  confirmation. Delivery times vary depending on location:
                </p>
                <ul className="list-disc pl-6">
                  <li>Local Shipping: **3-5 business days**</li>
                  <li>International Shipping: **7-14 business days**</li>
                </ul>
                <p>
                  Free shipping is available for orders over{" "}
                  <strong>$300</strong>.
                </p>

                <h2 className="text-xl font-extrabold text-indigo-700 border-b-2 pb-2">
                  5. Disclaimer
                </h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-sm text-yellow-700">
                    The materials on our website are provided on an "as is"
                    basis. We make no warranties, expressed or implied,
                    regarding their accuracy, reliability, or suitability for
                    any purpose.
                  </p>
                </div>

                <h2 className="text-xl font-extrabold text-indigo-700 border-b-2 pb-2">
                  6. Contact Us
                </h2>
                <p>
                  For any questions regarding these Terms of Service, please
                  contact us at{" "}
                  <a
                    href="mailto:shoep@slasapur.de"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    shoep@slasapur.de
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
