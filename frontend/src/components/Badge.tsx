interface BadgeProps extends React.HTMLProps<HTMLDivElement> {
  text: string;
  color: 'dark' | 'light';
}
const Badge = ({ text, color, className, ...props }: BadgeProps) => {
  return (
    <div className={`px-4 py-2  rounded-2xl font-semibold w-max ${color === 'dark' ? 'bg-blue-800 text-white' : 'bg-slate-500 text-white'} ${className}`} {...props}>
      {text}
    </div>
  );
};

export default Badge;
