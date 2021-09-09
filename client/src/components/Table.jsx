import { DataGrid } from '@material-ui/data-grid';
import { inject, observer } from 'mobx-react';

const columns = [
    { field: 'col1', headerName: 'Name', width: 300 },
    { field: 'col2', headerName: 'Hospital #', width: 200 },
    { field: 'col3', headerName: 'Diagnosis', width: 300 },
];

const rows = [
    { id: 1, col1: 'Dennis', col2: 'J123', col3: 'Dead' },
    { id: 2, col1: 'Jennis', col2: 'G123', col3: 'Almost Dead' },
    { id: 3, col1: 'Lennis', col2: 'E123', col3: 'Pretty Dead' },
];

export const Table = inject('appointmentStore')(observer(({ appointmentStore }) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={appointmentStore.appointments}
                columns={columns}
                disableSelectionOnClick
            />
        </div>
    );
}));