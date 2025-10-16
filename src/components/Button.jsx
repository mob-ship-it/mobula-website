import React from "react";

export const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "default",
    disabled = false,
    loading = false,
    className = "",
    ...props
}) => {
    const baseClasses = "flex items-center justify-center gap-2.5 p-2.5 relative transition-all duration-200 font-normal";

    const variants = {
        primary: "bg-[#211ee1] text-[#faf1ea] hover:bg-[#1a18c4] active:bg-[#151199]",
        secondary: "border-[3px] border-solid border-[#211ee1] text-[#211ee1] hover:bg-[#211ee1] hover:text-[#faf1ea]",
        outline: "border border-solid border-[#13243c] text-[#13243c] hover:bg-[#13243c] hover:text-[#faf1ea]",
        ghost: "text-[#13243c] hover:bg-gray-100"
    };

    const sizes = {
        small: "h-[40px] text-base px-4",
        default: "h-[52px] text-xl px-4",
        large: "h-[69px] text-3xl px-4"
    };

    const shape = {
        primary: "rounded-[48px]",
        secondary: "rounded-[48px]",
        outline: "rounded-[11px]",
        ghost: "rounded-md"
    };

    const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${shape[variant]}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

    const handleClick = (e) => {
        if (disabled || loading) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            <span className={`${loading ? 'opacity-0' : 'opacity-100'} [font-family:'Be_Vietnam',Helvetica]`}>
                {children}
            </span>
        </button>
    );
};
