import React, { useEffect, useState } from "react";
import pb from "./lib/pocketbase"; // Import the initialized PocketBase client

function Home() {
  const [apples, setApples] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApples() {
      try {
        // Fetch the currently authenticated user's record
        const user = await pb.collection("users").authRefresh();

        // Extract the 'apples' field from the authenticated user's data
        setApples(user.record.apples);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching apple count:", err);
      }
    }

    fetchApples();
  }, []);

  return (
    <div>
      <h1>Apple Count</h1>
      {error && <p>Error: {error}</p>}
      {apples !== null ? <p>Apples: {apples}</p> : <p>Loading...</p>}
    </div>
  );
}

export default Home;
