"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";

import { AddMemoModalProps } from "@/lib/modal/types";

const AddMemoModal = ({
    isOpen,
    onClose,
    title,
    content,
    onTitleChange,
    onContentChange,
    onAddMemo,
}: AddMemoModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-zinc-900">
                    Add Memo
                </h2>

                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        onTitleChange(e.target.value)
                    }
                />

                <Textarea
                    placeholder="Write your memo..."
                    rows={6}
                    value={content}
                    onChange={(e) =>
                        onContentChange(e.target.value)
                    }
                />

                <div className="flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button onClick={onAddMemo}>
                        Add Memo
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default AddMemoModal;
