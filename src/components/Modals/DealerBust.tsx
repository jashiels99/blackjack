import Button from '../Button.tsx';
import Modal from '../Modal.tsx';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function DealerBust({ isOpen, onClose }: Props) {
    return (
        <Modal isOpen={isOpen}>
            <Modal.Title>The dealer went bust!</Modal.Title>
            <Modal.Description>
                The dealer hit a card over 21 and you doubled your money. Click
                the button below to play again.
            </Modal.Description>
            <Button onClick={onClose} fullWidth>
                Play Again
            </Button>
        </Modal>
    );
}

export default DealerBust;
