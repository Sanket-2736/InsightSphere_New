import React from "react";
import { useAuthStore } from "../../stores/authStore";
import { UserCircle, User, Mail, Calendar, Phone, Globe, Bookmark, Folder, History, ExternalLink } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <p className="text-center text-xl text-gray-700">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-300 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-5xl">
        {/* User Profile Section */}
        <div className="mb-12 flex flex-col items-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-full shadow-lg">
            <img
              src={authUser.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mt-6 flex items-center gap-2">
            <UserCircle className="text-indigo-600" size={36} /> {authUser.name}
          </h2>
        </div>

        {/* User Details Table */}
        <div className="overflow-x-auto mb-12">
          <h3 className="text-3xl font-bold text-gray-700 mb-6">User Details</h3>
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-3 px-6 text-left">Field</th>
                <th className="py-3 px-6 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-6 text-gray-600 flex items-center gap-2">
                  <User size={18} /> Username
                </td>
                <td className="py-3 px-6">{authUser.username}</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="py-3 px-6 text-gray-600 flex items-center gap-2">
                  <Mail size={18} /> Email
                </td>
                <td className="py-3 px-6">{authUser.email}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-6 text-gray-600 flex items-center gap-2">
                  <Calendar size={18} /> Date of Birth
                </td>
                <td className="py-3 px-6">{authUser.dob.split("T")[0]}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-6 text-gray-600 flex items-center gap-2">
                  <Phone size={18} /> Phone
                </td>
                <td className="py-3 px-6">{authUser.mobile}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-6 text-gray-600 flex items-center gap-2">
                  <Globe size={18} /> Country
                </td>
                <td className="py-3 px-6">{authUser.country?.toUpperCase()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Viewed Categories Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-700 mb-4">Viewed Categories</h3>
          <div className="flex flex-wrap gap-4">
            {authUser.viewedCategories.map((category, index) => (
              <span key={index} className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Browsing History Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            <History size={28} className="text-red-500" /> Recent News Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authUser.history?.length === 0 ? (
              <p className="text-gray-600 text-lg">No recent news articles.</p>
            ) : (
              authUser.history?.slice(0, 6).map((history, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-purple-400 to-indigo-500 p-6 rounded-lg shadow-lg text-white flex items-center justify-between hover:scale-105 transform transition duration-300"
                >
                  <div>
                    <p className="text-lg font-semibold">{history.headline}</p>
                  </div>
                  <a
                    href={history.link}
                    onClick={(e) => console.log(history)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline cursor-pointer flex items-center gap-1"
                  >
                    View page <ExternalLink size={16} />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Saved Pages Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-700 mb-4">Saved Pages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authUser.savedPages?.length === 0 ? (
              <p className="text-gray-600 text-lg">No saved pages.</p>
            ) : (
              authUser.savedPages.map((page, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <p className="text-lg font-semibold">{page.headline}</p>
                  <a
                    href={page.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline mt-2 block"
                  >
                    View Page
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
