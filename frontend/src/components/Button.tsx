interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = ({ text, className, type = 'button', disabled, ...props }: ButtonProps) => {
  return (
    <button type={type} disabled={disabled} className={`px-4 py-2 rounded-md ${className}`} {...props}>
      {text}
    </button>
  );
};

export default Button;
