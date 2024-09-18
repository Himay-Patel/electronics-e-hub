'use client'
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const savedAddresses = [
    { id: '1', name: 'John Doe', street: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '12345', country: 'USA' },
    { id: '2', name: 'Jane Smith', street: '456 Elm St', city: 'Somewhere', state: 'NY', zipCode: '67890', country: 'USA' }
  ];

  const handleAddressChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedAddress(e.target.value);
  };

  const handleNewAddressChange = (e: { target: { name: any; value: any; }; }) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPaymentMethod(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: ''
    };
    if (!newAddress.name) newErrors.name = 'Name is required';
    if (!newAddress.street) newErrors.street = 'Street address is required';
    if (!newAddress.city) newErrors.city = 'City is required';
    if (!newAddress.state) newErrors.state = 'State is required';
    if (!newAddress.zipCode) newErrors.zipCode = 'Zip code is required';
    if (!newAddress.country) newErrors.country = 'Country is required';
    if (!paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulating API call
      setTimeout(() => {
        setIsLoading(false);
        alert('Checkout successful!');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Checkout</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Address</h3>
              {savedAddresses.map((address) => (
                <label key={address.id} className="flex items-center mb-3">
                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    checked={selectedAddress === address.id}
                    onChange={handleAddressChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-3">
                    {address.name}, {address.street}, {address.city}, {address.state} {address.zipCode}, {address.country}
                  </span>
                </label>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Address</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newAddress.name}
                    onChange={handleNewAddressChange}
                    className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600" id="name-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    value={newAddress.street}
                    onChange={handleNewAddressChange}
                    className={`mt-1 block w-full border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    aria-invalid={errors.street ? 'true' : 'false'}
                    aria-describedby={errors.street ? 'street-error' : undefined}
                  />
                  {errors.street && (
                    <p className="mt-2 text-sm text-red-600" id="street-error">
                      {errors.street}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={newAddress.city}
                    onChange={handleNewAddressChange}
                    className={`mt-1 block w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    aria-invalid={errors.city ? 'true' : 'false'}
                    aria-describedby={errors.city ? 'city-error' : undefined}
                  />
                  {errors.city && (
                    <p className="mt-2 text-sm text-red-600" id="city-error">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={newAddress.state}
                    onChange={handleNewAddressChange}
                    className={`mt-1 block w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    aria-invalid={errors.state ? 'true' : 'false'}
                    aria-describedby={errors.state ? 'state-error' : undefined}
                  />
                  {errors.state && (
                    <p className="mt-2 text-sm text-red-600" id="state-error">
                      {errors.state}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={newAddress.zipCode}
                    onChange={handleNewAddressChange}
                    className={`mt-1 block w-full border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    aria-invalid={errors.zipCode ? 'true' : 'false'}
                    aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
                  />
                  {errors.zipCode && (
                    <p className="mt-2 text-sm text-red-600" id="zipCode-error">
                      {errors.zipCode}
                    </p>
                  )}
                </div>

                
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    disabled
                    checked={paymentMethod === 'creditCard'}
                    onChange={handlePaymentMethodChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-3 line-through">Credit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="net banking"
                    checked={paymentMethod === 'net banking'}
                    disabled
                    onChange={handlePaymentMethodChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-3 line-through">Net Banking</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash on delivery"
                    checked={paymentMethod === 'cash on delivery'}
                    onChange={handlePaymentMethodChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-3">Cash on delivery</span>
                </label>
              </div>
              {errors.paymentMethod && (
                <p className="mt-2 text-sm text-red-600">{errors.paymentMethod}</p>
              )}
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin h-5 w-5 mr-3" />
                    Processing...
                  </>
                ) : (
                  'Complete Checkout'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
