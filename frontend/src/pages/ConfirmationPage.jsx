import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("UserInfo"));
  const handleClick = () => {
    navigate("/assessment", { state: { id: data._id } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your registration on{" "}
          <span className="font-semibold text-blue-600">Nivesh Jano</span> was
          successful.
        </p>
        {data?.registrationId && (
          <div className="bg-gray-100 p-4 rounded-md border border-gray-300 text-sm text-gray-700">
            <p className="font-medium">Your Registration ID:</p>
            <p className="mt-1 text-blue-700 font-semibold">
              {data.registrationId}
            </p>
          </div>
        )}
        <button onClick={handleClick} className="cursor:pointer">
          Click me
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
