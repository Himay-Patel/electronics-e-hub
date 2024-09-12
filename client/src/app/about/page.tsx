import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-e_hub_white py-10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-e_hub_light_black mb-6">About E-Hub</h1>
          <p className="text-lg text-e_hub_blue mb-4">
            Welcome to <span className="font-semibold">E-Hub</span>, your one-stop destination for the latest and best electronic products across multiple categories. We are committed to providing you with an exceptional shopping experience, featuring the best in technology, fashion, home decor, and more.
          </p>
          <p className="text-lg text-e_hub_blue mb-8">
            Our journey started with a passion for innovation and customer satisfaction, and we continue to strive for excellence in everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Our Vision */}
          <div className="bg-e_hub_white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-e_hub_light_black mb-4">Our Vision</h2>
            <p className="text-e_hub_blue">
              At E-Hub, our vision is to become the go-to platform for online shopping, where customers can find an unmatched variety of products, all while experiencing top-notch service and convenience. We aim to revolutionize the e-commerce industry by putting our customers first and staying at the forefront of technological advancements.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-e_hub_white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-e_hub_light_black mb-4">Our Mission</h2>
            <p className="text-e_hub_blue">
              Our mission is to bring the best products to our customers’ doorsteps with speed, efficiency, and care. We’re here to simplify the shopping experience while ensuring quality, affordability, and sustainability in everything we offer.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-e_hub_white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-e_hub_light_black mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-e_hub_blue space-y-2">
            <li>Wide selection of high-quality products across categories</li>
            <li>Competitive pricing with frequent discounts and offers</li>
            <li>Fast and reliable shipping options</li>
            <li>Outstanding customer service and support</li>
            <li>Secure payment methods for peace of mind</li>
          </ul>
        </div>

        {/* Our Team */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-e_hub_light_black mb-6">Meet Our Team</h2>
          <p className="text-lg text-e_hub_blue mb-8">
            We are a team of dedicated professionals working tirelessly to bring you the best online shopping experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-e_hub_white rounded-lg shadow-lg p-6">
              <img
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="Team Member 1"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-e_hub_light_black mb-2">Keyur Machchhar</h3>
              <p className="text-e_hub_blue">Student 1</p>
            </div>
            <div className="bg-e_hub_white rounded-lg shadow-lg p-6">
              <img
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="Team Member 2"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-e_hub_light_black mb-2">Henil Patel</h3>
              <p className="text-e_hub_blue">Student 2</p>
            </div>
            <div className="bg-e_hub_white rounded-lg shadow-lg p-6">
              <img
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="Team Member 3"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-e_hub_light_black mb-2">Himay Patel</h3>
              <p className="text-e_hub_blue">Student 3</p>
            </div>
            <div className="bg-e_hub_white rounded-lg shadow-lg p-6">
              <img
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="Team Member 3"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-e_hub_light_black mb-2">Meet Tank</h3>
              <p className="text-e_hub_blue">Student 4</p>
            </div>
            <div className="bg-e_hub_white rounded-lg shadow-lg p-6">
              <img
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="Team Member 3"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-e_hub_light_black mb-2">Pritesh vyas</h3>
              <p className="text-e_hub_blue">Student 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;