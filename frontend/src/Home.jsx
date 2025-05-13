import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    phoneno: "",
    position: "",
  });
  let navigate = useNavigate();
  let handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await fetch("http://localhost:8080/assessment/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (data.status !== 200) {
        throw new Error("Failed to submit form");
      }
      let res = await data.json();
      if (res.result) {
        navigate("/assessment", { state: { id: res.result._id } });
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-[100vh]">
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          {/* Interview Form */}
          <form
            className="space-y-4 bg-white shadow p-6 rounded h-[80vh]"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold">
              Fill your Details to start the Assisment
            </h2>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full p-2 border"
              onChange={handleChange}
            />
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email id"
              required
              className="w-full p-2 border"
              onChange={handleChange}
            />
            <label htmlFor="">Phone Number</label>
            <input
              type="number"
              name="phoneno"
              placeholder="Enter your phone number"
              required
              className="w-full p-2 border"
              onChange={handleChange}
            />

            <div>
              <select
                name="position"
                id=""
                className="w-full p-2 border"
                onChange={handleChange}
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Position Apply for
                </option>
                <option value="technical_role">Technical Role</option>
                <option value="business_role">Bussiness Role</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
