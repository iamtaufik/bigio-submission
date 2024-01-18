interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ text, className, type = 'button', ...props }: ButtonProps) => {
  return (
    <button type={type} className={`px-4 py-2 rounded-md ${className}`} {...props}>
      {text}
    </button>
  );
};

export default Button;
