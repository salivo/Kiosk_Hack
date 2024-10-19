import React, { useEffect, useState } from "react";
import pb from "./lib/pocketbase"; // Import the initialized PocketBase client
import "./Home.css";

function Home() {
  const [apples, setApples] = useState(null);
  const [bananas, setBananas] = useState(null);
  const [tangerines, setTangerines] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFruitData() {
      try {
        // Fetch the currently authenticated user's record with autoCancel disabled
        pb.autoCancellation(false);
        const user = await pb
          .collection("users")
          .authRefresh({}, { autoCancel: false });

        // Extract the 'apples', 'bananas', and 'tangerines' fields from the user's data
        setApples(user.record.apples);
        setBananas(user.record.bananas);
        setTangerines(user.record.tangerines);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching fruit counts:", err);
      }
    }

    fetchFruitData();
  }, []);

  return (
    <div className="home-container">
      <div className="fruit-box">
        <h1>Fruit Counts</h1>
        {error && <p className="error-message">Error: {error}</p>}
        {apples !== null ? <p>Apples: {apples}</p> : <p>Loading apples...</p>}
        {bananas !== null ? (
          <p>Bananas: {bananas}</p>
        ) : (
          <p>Loading bananas...</p>
        )}
        {tangerines !== null ? (
          <p>Tangerines: {tangerines}</p>
        ) : (
          <p>Loading tangerines...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
