/* eslint-disable no-unused-vars */
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLock,
  FaHistory,
  FaUserEdit,
  FaSignOutAlt,
  FaKey,
} from "react-icons/fa";

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/200"
            alt="profile"
            className="w-32 h-32 rounded-full border border-gray-200 shadow-sm"
          />
          <h1 className="text-2xl font-semibold mt-4">John Doe</h1>
          <p className="text-gray-500">Software Engineer</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 w-full text-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">12</p>
              <p className="text-gray-500 text-sm">Projects</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">87%</p>
              <p className="text-gray-500 text-sm">Tasks</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">3y</p>
              <p className="text-gray-500 text-sm">Exp</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 w-full flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
              <FaUserEdit /> Edit Profile
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
              <FaKey /> Change Password
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Right Column - Info */}
        <div className="lg:col-span-2 grid grid-rows-2 gap-8">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-medium mb-4">Personal Info</h2>
              <div className="space-y-3 text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" /> johndoe@email.com
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-gray-500" /> +62 812 3456 7890
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" /> Jakarta,
                  Indonesia
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" /> Joined Jan 2024
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-medium mb-4">Account Settings</h2>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>Language: English</li>
                <li>Timezone: GMT+7 (Jakarta)</li>
                <li>Email Notifications: Enabled</li>
              </ul>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-medium mb-4">Security</h2>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>
                  <FaLock className="inline text-gray-500 mr-2" /> Password
                  changed 3mo ago
                </li>
                <li>
                  <FaLock className="inline text-gray-500 mr-2" /> 2FA: Enabled
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>
                  <FaHistory className="inline text-gray-500 mr-2" /> Login Sep
                  10
                </li>
                <li>
                  <FaHistory className="inline text-gray-500 mr-2" /> Profile
                  updated Sep 5
                </li>
                <li>
                  <FaHistory className="inline text-gray-500 mr-2" /> Password
                  changed Aug 28
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
