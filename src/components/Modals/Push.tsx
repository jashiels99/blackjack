import Button from '../Button.tsx';
import Modal from '../Modal.tsx';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function Push({ isOpen, onClose }: Props) {
    return (
        <Modal isOpen={isOpen}>
            <Modal.Title>Push</Modal.Title>
            <Modal.Description>
                You and the dealer both hit the same. You get your money back!
            </Modal.Description>
            <Button onClick={onClose} fullWidth>
                Play Again
            </Button>
        </Modal>
    );
}

export default Push;
