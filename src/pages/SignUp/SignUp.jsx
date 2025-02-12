import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    country: "",
    dob: "",
    profilePic: "",
  });

  const { register, authUser, isSigningIn } = useAuthStore();
  const navigate = useNavigate();

  const validateFormData = () => {
    if (!formData.name.trim()) return toast.error("Name is required!");
    if (!formData.email.trim()) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.mobile.trim()) return toast.error("Mobile number is required!");
    if (!formData.profilePic) return toast.error("Profile photo is required!");
    if (!formData.country.trim()) return toast.error("Country is required!");
    if (!formData.password) return toast.error("Password is required!");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long!");
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, profilePic: reader.result });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateFormData();

    if (isValid) {
      await register(formData);
      if (authUser) {
        setTimeout(() => navigate('/'), 1000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center my-14 min-w-60 h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
              Phone Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="123-456-7890"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">
              Profile Photo
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleImage}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select your country</option>
              <option value="argentina">Argentina</option>
              <option value="australia">Australia</option>
              <option value="austria">Austria</option>
              <option value="belgium">Belgium</option>
              <option value="brazil">Brazil</option>
              <option value="bulgaria">Bulgaria</option>
              <option value="canada">Canada</option>
              <option value="china">China</option>
              <option value="colombia">Colombia</option>
              <option value="cuba">Cuba</option>
              <option value="czech republic">Czech Republic</option>
              <option value="egypt">Egypt</option>
              <option value="france">France</option>
              <option value="germany">Germany</option>
              <option value="greece">Greece</option>
              <option value="hong kong">Hong Kong</option>
              <option value="hungary">Hungary</option>
              <option value="india">India</option>
              <option value="indonesia">Indonesia</option>
              <option value="ireland">Ireland</option>
              <option value="israel">Israel</option>
              <option value="italy">Italy</option>
              <option value="japan">Japan</option>
              <option value="latvia">Latvia</option>
              <option value="lithuania">Lithuania</option>
              <option value="malaysia">Malaysia</option>
              <option value="mexico">Mexico</option>
              <option value="morocco">Morocco</option>
              <option value="netherlands">Netherlands</option>
              <option value="new zealand">New Zealand</option>
              <option value="nigeria">Nigeria</option>
              <option value="norway">Norway</option>
              <option value="philippines">Philippines</option>
              <option value="poland">Poland</option>
              <option value="portugal">Portugal</option>
              <option value="romania">Romania</option>
              <option value="russia">Russia</option>
              <option value="saudi arabia">Saudi Arabia</option>
              <option value="serbia">Serbia</option>
              <option value="singapore">Singapore</option>
              <option value="slovakia">Slovakia</option>
              <option value="slovenia">Slovenia</option>
              <option value="south africa">South Africa</option>
              <option value="south korea">South Korea</option>
              <option value="sweden">Sweden</option>
              <option value="switzerland">Switzerland</option>
              <option value="taiwan">Taiwan</option>
              <option value="thailand">Thailand</option>
              <option value="turkey">Turkey</option>
              <option value="uae">UAE</option>
              <option value="uk">UK</option>
              <option value="usa">USA</option>
              <option value="vietnam">Vietnam</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSigningIn ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
