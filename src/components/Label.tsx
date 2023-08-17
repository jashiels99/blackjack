import { PropsWithChildren } from 'react';

function Label({ children }: PropsWithChildren) {
    return <p className="p-3 rounded-lg bg-gray-900/40">{children}</p>;
}

export default Label;
