const INPUT_BASE_CLASSES = 'w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition min-h-[44px]';

export const Input = ({
  icon: Icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-3.5 text-gray-400 text-sm" />
      )}
      <input
        className={`${INPUT_BASE_CLASSES} ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export const Select = ({
  icon: Icon,
  options = [],
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-3.5 text-gray-400 pointer-events-none text-sm" />
      )}
      <select
        className={`${INPUT_BASE_CLASSES} appearance-none bg-white ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export const TextArea = ({
  icon: Icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-3.5 text-gray-400 text-sm" />
      )}
      <textarea
        className={`${INPUT_BASE_CLASSES} resize-none ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};
