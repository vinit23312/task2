import React, { useState } from 'react';
import axios from 'axios';

const GithubCard = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          GitHub Username:
        </label>
        <div className="flex">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter GitHub username"
          />
          <button
            onClick={fetchUserData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>

        {userData && (
          <div className="mt-8">
            <img
              src={userData.avatar_url}
              alt="User Avatar"
              className="rounded-full w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{userData.login}</h2>
            <p className="text-gray-700">{userData.name}</p>
            <p className="text-gray-700">
              Repositories: {userData.public_repos}
            </p>
            <p className="text-gray-700">Gists: {userData.public_gists}</p>
            <p className="text-gray-700">
              Profile created at: {new Date(userData.created_at).toLocaleDateString('en-US')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubCard;
