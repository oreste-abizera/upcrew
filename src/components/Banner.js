import React from "react";

export default function Banner({ title, subtitle, children }) {
  return (
    <div>
      <h1>{title}</h1>
      <h6 className="text-center mt-4">{subtitle}</h6>
      {children}
    </div>
  );
}
