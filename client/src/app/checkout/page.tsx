'use client'
import { initiate } from '@/lib/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface Address {
  _id: string,
  name: string,
  street: string,
  city: string,
  state: string,
  zipCode: string
}

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const cart = useAppSelector(state => state.cart);
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([])
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // const savedAddresses = [
  //   { id: '1', name: 'John Doe', street: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '12345', country: 'USA' },
  //   { id: '2', name: 'Jane Smith', street: '456 Elm St', city: 'Somewhere', state: 'NY', zipCode: '67890', country: 'USA' }
  // ];

  const handleAddressChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedAddress(e.target.value);
  };

  const handleNewAddressChange = (e: { target: { name: any; value: any; }; }) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPaymentMethod(e.target.value);
  };

  // const validateForm = () => {
  //   const newErrors = {
  //     name: '',
  //     street: '',
  //     city: '',
  //     state: '',
  //     zipCode: '',
  //     country: '',
  //     paymentMethod: ''
  //   };
  //   if (!newAddress.name) newErrors.name = 'Name is required';
  //   if (!newAddress.street) newErrors.street = 'Street address is required';
  //   if (!newAddress.city) newErrors.city = 'City is required';
  //   if (!newAddress.state) newErrors.state = 'State is required';
  //   if (!newAddress.zipCode) newErrors.zipCode = 'Zip code is required';
  //   if (!paymentMethod) newErrors.paymentMethod = 'Payment method is required';
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let address = selectedAddress;
      if (savedAddresses.length === 0 || selectedAddress.length === 0) {
        const addressResponse = await axios.post(process.env.API_URL + "/api/address/create", newAddress, {
          withCredentials: true
        });
        address = addressResponse.data._id;
      }
      const orderResponse = await axios.post(process.env.API_URL + "/api/order/generate", {
        totalAmount: cart.total * 1.01,
        products: cart.items,
        address: address,
        paymentMethod: paymentMethod
      }, {
        withCredentials: true
      });
      dispatch(initiate({
        items: [],
        total: 0,
        totalItems: 0
      }));
      router.push('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    let timer = setTimeout(() => {
      if (user._id) {
        axios.post(process.env.API_URL + '/api/cart/modify', {
          cartId: user.cartId,
          cartItems: cart.items,
          cartTotal: cart.total
        }, {
          withCredentials: true
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }, 1200);
    return () => {
      clearTimeout(timer);
    }
  }, [cart]);

  useEffect(() => {
    // Fetching user saved addresses
    axios.get(process.env.API_URL + `/api/address/${user._id}`, {
      withCredentials: true
    })
      .then(response => {
        console.log(response);
        setSavedAddresses(response.data);
      })
      .catch(err => {
        const { status, data, statusText } = err.response;
        if (status === 401) {
          router.push('/login?next=cart');
        }
      })
  }, []);

  useEffect(() => {
    if (selectedAddress.length > 0) {
      const { name, street, city, state, zipCode } = savedAddresses.filter(addess => addess._id === selectedAddress)[0];
      setNewAddress({ name, street, city, state, zipCode });
    }
  }, [selectedAddress]);

  useEffect(() => {
    const containedAddress = savedAddresses.find(address => {
      return address.name.toLowerCase() === newAddress.name.toLowerCase() &&
        address.city.toLowerCase() === newAddress.city.toLowerCase() &&
        address.state.toLowerCase() === newAddress.state.toLowerCase() &&
        address.zipCode === newAddress.zipCode &&
        address.street.toLowerCase() === newAddress.street.toLowerCase();
    });
    console.log(containedAddress);

    if (containedAddress !== undefined) {
      setSelectedAddress(containedAddress._id)
    } else {
      setSelectedAddress('')
    }
  }, [newAddress]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Checkout</h2>
          <form>
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{savedAddresses.length > 0 ? "Select Address" : "No Saved Address"}</h3>
              {savedAddresses.map((address) => (
                <label key={address._id} className="flex items-center mb-3">
                  <input
                    type="radio"
                    name="address"
                    value={address._id}
                    checked={selectedAddress === address._id}
                    onChange={handleAddressChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-3">
                    {address.name}, {address.street}, {address.city}, {address.state}, {address.zipCode}
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
                onClick={handleSubmit}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-e_hub_orange focus:outline-none focus:ring-2 focus:ring-offset-2"
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
