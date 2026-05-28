type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-400 focus:ring-orange-300",

    secondary:
      "bg-white border border-orange-200 text-zinc-800 hover:bg-orange-50 focus:ring-orange-200",

    danger:
      "bg-red-500 text-white hover:bg-red-400 focus:ring-red-300",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}