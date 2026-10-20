
// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied before React is imported. This resolves errors where standard HTML elements were not recognized in JSX.
import '../../../types';
import * as React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ indeterminate, className = '', ...props }) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !props.checked && indeterminate;
    }
  }, [ref, indeterminate, props.checked]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={`h-4 w-4 rounded bg-gray-200 border-gray-300 text-brand-blue-500 focus:ring-brand-blue-500 focus:ring-offset-white ${className}`}
      {...props}
    />
  );
};

export default Checkbox;
