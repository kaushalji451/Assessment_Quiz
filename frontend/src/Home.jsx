import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    phoneno: "",
    dob: "",
    gender: "",
    degree: "",
    department: "",
    sop: ""
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();
const wordCount = formdata.sop.length;
const isValidSOP = wordCount >= 100 && wordCount <= 500;
  const handleChange = (e) => {
    
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    for (let key in formdata) {
      fd.append(key, formdata[key]);
    }
    if (file) fd.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/registration/info", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        navigate("/assessment", { state: { id: data.user._id } });
      } else {
        alert("Failed: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <form
          className="space-y-4 bg-white shadow p-6 rounded-xl"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="text-xl font-bold text-center">
            Fill your details to register
          </h2>

          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            {
              label: "Phone Number",
              name: "phoneno",
              type: "tel",
              pattern: "[0-9]{10}",
            },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Degree", name: "degree", type: "text" },
           
          ].map(({ label, name, type, pattern }) => (
            <div key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                id={name}
                pattern={pattern}
                required
                className="w-full p-2 border"
                onChange={handleChange}
              />
            </div>
          ))}
          <div>
            <label htmlFor="department">Department</label>
            <select
              name="department"
              id="department"
              className="w-full p-2 border"
              onChange={handleChange}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="technical_role">Technical Role</option>
              <option value="business_role">Business Role</option>
            </select>
          </div>

          {/* Gender Select */}
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              className="w-full p-2 border"
              onChange={handleChange}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>


          <div className="mb-6">
      <label htmlFor="sop" className="block text-sm font-medium text-gray-700 mb-2">
        Statement of Purpose <span className="text-red-500">*</span>
      </label>
      <textarea
        id="sop"
        name="sop"
        required
        rows={5}
        className="w-full p-3 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
        placeholder="Write your Statement of Purpose here..."
        value={formdata.sop}
        onChange={handleChange}
      />
      <p className={`mt-2 text-sm ${wordCount < 300 ? "text-red-500" : "text-green-600"}`}>
        Letter Count: {wordCount} (Recommended: 300–2500 letters)
      </p>
    </div>

          {/* File Upload */}
          <div>
            <label htmlFor="file">Upload CV (PDF)</label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full p-2 border"
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded ${isValidSOP ? "hover:bg-blue-700" : "opacity-50 cursor-not-allowed"}`}
            disabled={!isValidSOP}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
