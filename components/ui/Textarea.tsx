import React from "react";

type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
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
        resize-none

        ${className}
      `}
      {...props}
    />
  );
}