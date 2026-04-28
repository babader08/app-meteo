import React from "react";

const Headers = () => {
  return (
    <div className="flex-col-center main-container flex gap-10 p-4">
      <div className="flex-between w-full">
        <div className="flex-center gap-2">
          <i className="ri-snowflake-fill text-logo text-3xl lg:text-4xl"></i>
          <h1 className="text-xl font-medium lg:text-[27px]">la météo</h1>
        </div>
        <div className="bg-second-bg shadow-gay inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-gray-200">
          <i className="ri-calendar-2-line text-base"></i>
          <time
            dateTime={new Date().toISOString()}
            className="text-sm font-medium"
          >
            {new Date().toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
      <div>
        <h1 className="font-bold lg:text-3xl">
          Quel temps fait-il aujourd'hui ?
        </h1>
      </div>
    </div>
  );
};

export default Headers;
