import Button from '../Button.tsx';
import Modal from '../Modal.tsx';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function DealerWon({ isOpen, onClose }: Props) {
    return (
        <Modal isOpen={isOpen}>
            <Modal.Title>You lost</Modal.Title>
            <Modal.Description>
                The dealer wins. You've lost your money. Tough shit.
            </Modal.Description>
            <Button onClick={onClose} fullWidth>
                Play Again
            </Button>
        </Modal>
    );
}

export default DealerWon;
