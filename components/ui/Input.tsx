import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        w-full rounded-2xl border border-orange-200
        bg-white px-4 py-3
        text-sm text-zinc-800
        placeholder:text-zinc-400
        focus:outline-none
        focus:ring-2
        focus:ring-orange-200
        focus:border-orange-300
        transition
        ${className}
      `}
      {...props}
    />
  );
}
