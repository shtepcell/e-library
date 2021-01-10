import React, { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface IConfirmDialogProps {
    open?: boolean;
    onAgree?: VoidFunction;
    onReject?: VoidFunction;
    textTitle: string;
    textHint?: string;
}

export const ConfirmDialog: FC<IConfirmDialogProps> = ({ open, onAgree, onReject, textTitle, textHint }) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={onReject}
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">{textTitle}</DialogTitle>
                <DialogContent>
                    {textHint && (
                        <DialogContentText id="alert-dialog-description">
                            {textHint}
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onReject} color="primary">
                        Нет
                    </Button>
                    <Button onClick={onAgree} color="primary" variant="contained" autoFocus>
                        Да, удалить документ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}