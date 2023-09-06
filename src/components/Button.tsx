import { PropsWithChildren } from 'react';

interface Props {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    fullWidth?: boolean;
}

function Button({
    children,
    onClick,
    disabled = false,
    fullWidth = false,
}: PropsWithChildren<Props>) {
    return (
        <button
            className={`px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-400 ${
                fullWidth && 'w-full'
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
