import { PropsWithChildren } from 'react';

function Hand({ children }: PropsWithChildren) {
    return (
        <div className="relative flex -translate-x-1/2 left-1/2 w-fit">
            {children}
        </div>
    );
}

export default Hand;
