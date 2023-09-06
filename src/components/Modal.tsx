import { Fragment, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const ModalTitle = ({ children }: PropsWithChildren) => {
    return (
        <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-50"
        >
            {children}
        </Dialog.Title>
    );
};

const ModalDescription = ({ children }: PropsWithChildren) => {
    return (
        <div className="mt-2 mb-4">
            <p className="text-sm text-gray-300">{children}</p>
        </div>
    );
};

const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    xl2: 'max-w-2xl',
    xl3: 'max-w-3xl',
};

interface ModalProps {
    isOpen: boolean;
    size?: keyof typeof sizes;
}

const Modal = ({
    children,
    isOpen,
    size = 'md',
}: PropsWithChildren<ModalProps>) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`w-full ${sizes[size]} p-6 text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl`}
                            >
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
export default Modal;
