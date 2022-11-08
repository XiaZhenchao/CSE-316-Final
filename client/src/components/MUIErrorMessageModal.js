import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth'
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function MUIErrorMessageModal() {
    const { auth } = useContext(AuthContext);
    let errorMessage = "ERROR!";
    let isopen = false;
    if(auth.error.errorMessage)
    {
        console.log("detect error")
        isopen = true
    }

    function handleCloseModal() {
        auth.closeErrorModal();
        console.log("close")
        isopen = false
    }

    return (
        <Modal
            open={isopen}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                {/* <header className="dialog-header">
                    {auth.error.errorMessage}
                </header> */}
                <Alert severity="error">
                    {auth.error.errorMessage}
                </Alert>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}