import Button from '../Button.tsx';
import Modal from '../Modal.tsx';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function PlayerBust({ isOpen, onClose }: Props) {
    return (
        <Modal isOpen={isOpen}>
            <Modal.Title>You went bust!</Modal.Title>
            <Modal.Description>
                You hit a card over 21 and lost your money. Click the button
                below to play again.
            </Modal.Description>
            <Button onClick={onClose} fullWidth>
                Play Again
            </Button>
        </Modal>
    );
}

export default PlayerBust;
