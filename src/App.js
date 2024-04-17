import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    // Fetch GitHub commit data when component mounts
    const fetchCommits = async () => {
      try {
        const response = await axios.get('https://api.github.com/repos/Elkinews/Dummi_code/commits');
        setCommits(response.data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    fetchCommits();

    // Clean-up function
    return () => {
      setCommits([]);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">GitHub Commit History</h1>
      <ul>
        {commits.map(commit => (
          <li key={commit.sha} className="py-2 border-b border-gray-200">
            <div className="flex items-center">
              <div className="mr-4">
                {commit.author && commit.author?.avatar_url && <img src={commit.author.avatar_url} alt={commit.author.login} className="w-10 h-10 rounded-full" />}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{commit.commit.author.name}</h2>
                <p className="text-gray-600">{commit.commit.message}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
