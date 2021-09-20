import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';


export const DeleteConfirmDialog = inject('appointmentStore')(observer(({ appointmentStore, ...other }) => {
    const handleCancel = () => {
        appointmentStore.setConfirmDialogOpen(false)
        appointmentStore.setSelectedAppointmentId(-1)
    }
    const handleDelete = () => {
        appointmentStore.deleteAppointment(appointmentStore.selectedAppointmentId)
        appointmentStore.setConfirmDialogOpen(false)
    }
    return (
        <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={appointmentStore.isConfirmDialogOpen}
        {...other}
        >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent >
            Are you sure you want to delete this appointment?
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleCancel}>
            Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">Delete Appointment</Button>
        </DialogActions>
        </Dialog>
    );
}));