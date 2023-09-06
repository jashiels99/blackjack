import Button from '../Button.tsx';
import Modal from '../Modal.tsx';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function PlayerWon({ isOpen, onClose }: Props) {
    return (
        <Modal isOpen={isOpen}>
            <Modal.Title>You win!</Modal.Title>
            <Modal.Description>
                You beat the dealer. You've doubled your money!
            </Modal.Description>
            <Button onClick={onClose} fullWidth>
                Play Again
            </Button>
        </Modal>
    );
}

export default PlayerWon;
