const VARIANTS = {
  primary: 'bg-accent text-white hover:bg-[var(--color-accent-hover)] focus:bg-[var(--color-accent-hover)] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
  secondary: 'bg-white text-accent hover:bg-[var(--color-bg)] border-2 border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-accent focus:bg-white focus:text-accent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-5 py-2.5 text-base min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[44px]'
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-lg font-bold transition-all duration-300 inline-flex items-center justify-center';
  const variantClasses = VARIANTS[variant] || VARIANTS.primary;
  const sizeClasses = SIZES[size] || SIZES.md;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
