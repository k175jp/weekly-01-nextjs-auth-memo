export type AddMemoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    onTitleChange: (title: string) => void;
    onContentChange: (content: string) => void;
    onAddMemo: () => void;
};
