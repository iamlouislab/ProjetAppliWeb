import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-10 w-10 border-t-2 border-gray-900 rounded-full"></div>
    </div>
  );
};

export default Loader;
