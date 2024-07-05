import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    labelClass = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label
                    className={`inline-block mb-1 pl-1 ${labelClass}`}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg outline-none duration-200 border w-full ${className} inputDec`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;
