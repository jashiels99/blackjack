const colorClasses = {
    white: 'bg-gray-50 text-blue-500 border-blue-500',
    blue: 'bg-blue-500 text-gray-50 border-gray-50',
    green: 'bg-green-500 text-gray-50 border-gray-50',
    red: 'bg-red-500 text-gray-50 border-gray-50',
    black: 'bg-gray-900 text-gray-50 border-gray-50',
};

interface Props {
    value: number;
    onBet: (amount: number) => void;
    color?: keyof typeof colorClasses;
}

function Chip({ value, onBet, color = 'white' }: Props) {
    return (
        <button
            className={`w-16 h-16 text-2xl font-bold border-4 border-dashed rounded-full transition-transform hover:scale-110 active:scale-100 ${colorClasses[color]}`}
            onClick={() => onBet(value)}
        >
            {value}
        </button>
    );
}

export default Chip;
