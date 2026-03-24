import { useState, useEffect } from "react";
import "./App.css"

function App() {

  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("All");
  const [requested, setRequested] = useState(() => {
    const saved = localStorage.getItem("requestedDonors");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState("");

  const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {

        const donorsWithBlood = data.map(user => ({
          ...user,
          bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
          available: Math.random() > 0.3
        }));

        setDonors(donorsWithBlood);
        setLoading(false);
        console.log(donorsWithBlood)
      });

  }, []);

  useEffect(() => {
    localStorage.setItem("requestedDonors", JSON.stringify(requested));
  }, [requested]);

  const requestHelp = (id) => {
    setRequested([...requested, id]);
  };
  console.log(requested)

  const filteredDonors = donors.filter(donor =>
    (bloodGroup === "All" || donor.bloodGroup === bloodGroup) &&
    donor.address.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="container">

      <h1>Community Blood Donor Finder</h1>

      <div className="controls">
        <p className="counter">Total Donors: {filteredDonors.length}</p>

        <input
          type="text"
          placeholder="Search by city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="All">All</option>
          {bloodGroups.map(bg => (
            <option key={bg}>{bg}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading donors...</p>
      ) : filteredDonors.length === 0 ? (
        <p>No donors found</p>
      ) : (
        filteredDonors.map(donor => (
          <div
            key={donor.id} className="card"
          >

            <h3>{donor.name}</h3>

            <p>Blood Group: {donor.bloodGroup}</p>

            <p>City: {donor.address.city}</p>

            <p className={donor.available ? "available" : "not-available"}>
              Availability: {donor.available ? "Available" : "Not Available"}
            </p>

            <button
              onClick={() => requestHelp(donor.id)}
              disabled={requested.includes(donor.id)}
            >
              {requested.includes(donor.id)
                ? "Request Sent ✅"
                : "Request Help"}
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default App;