import React, { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

type InputGroupProps = {
  label?: string;
  id: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
  className?: string;
  // O resto dos props são separados para input e textarea:
} & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

export const InputGroup = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputGroupProps
>((props, ref) => {
  const {
    label,
    id,
    textarea = false,
    rows = 3,
    required = false,
    className = "",
    ...rest
  } = props;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-1">
          {label} {required && <span aria-label="campo obrigatório">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          id={id}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          rows={rows}
          required={required}
          className={`mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition ${className}`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          ref={ref as React.Ref<HTMLInputElement>}
          required={required}
          className={`mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition ${className}`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
});

InputGroup.displayName = "InputGroup";
