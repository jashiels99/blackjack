import { PropsWithChildren } from 'react';

interface Props {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

function Button({
    children,
    onClick,
    disabled = false,
}: PropsWithChildren<Props>) {
    return (
        <button
            className="px-4 py-3 rounded-lg bg-amber-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
