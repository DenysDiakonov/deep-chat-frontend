import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import './DialogComponent.scss'
import CloseDialogIcon from '../../../assets/image/close.svg'
const DialogComponent = ({
    open,
    onClose,
    children,
    longDialog,
    classes = '',
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{
                root: 'default_dialog_root',
                paper: 'paper_custom_dialog',
            }}>
            <div
                className={`dialog_wrapper ${
                    longDialog ? 'dialog_wrapper_long' : ''
                } ${classes}`}>
                <button onClick={onClose} className='dialog_close_button'>
                    <img src={CloseDialogIcon} alt='close icon' />
                </button>
                {children}
            </div>
        </Dialog>
    )
}

export default DialogComponent
