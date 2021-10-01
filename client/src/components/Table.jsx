import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';

export const Table = inject('appointmentStore')(observer(({ appointmentStore }) => {
    const handleButtonClick = (cellValues) => {
        console.log("Selected", cellValues.id)
        appointmentStore.setSelectedAppointmentId(cellValues.id)
        appointmentStore.setConfirmDialogOpen(true)
        console.log(cellValues)
    }

    const columns = [
      { field: 'col1', headerName: 'Name', width: 200 },
      { field: 'col2', headerName: 'Date', width: 120 },
      { field: 'col3', headerName: 'Diagnosis', width: 300 },
      { field: 'col4', headerName: 'Hospital #', width: 140 },
      {
            field: "delete", headerName: "Delete",
            renderCell: (cellValues) => {
              return (
                <Button
                  variant="contained"
                  color= "secondary"
                  onClick={(event) => {
                    handleButtonClick(cellValues);
                  }}
                >
                  Delete
                </Button>
              );
            }
      }
    ];

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <DataGrid
                rows={appointmentStore.appointments}
                columns={columns}
                disableSelectionOnClick
            />
        </div>
    );
}));