interface Props {
    value: string | null;
}

function Card({ value }: Props) {
    return (
        <img
            className="relative left-0 shadow-lg -ml-36 max-h-72 first:ml-0"
            src={`/cards/${value ?? '1B'}.svg`}
            draggable="false"
        />
    );
}

export default Card;
