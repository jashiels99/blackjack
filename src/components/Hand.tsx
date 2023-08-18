import { PropsWithChildren } from 'react';
import { Points } from '../App';

interface Props {
    points: Points;
}

function Hand({ children, points }: PropsWithChildren<Props>) {
    return (
        <div className="relative flex items-center -translate-x-1/2 left-1/2 w-fit">
            {children}
            {points.hard > 0 && (
                <p className="absolute p-2 text-2xl rounded-lg -left-[90px] whitespace-nowrap bg-gray-900/40">
                    {points.soft
                        ? `${points.soft} / ${points.hard}`
                        : points.hard}
                </p>
            )}
        </div>
    );
}

export default Hand;
