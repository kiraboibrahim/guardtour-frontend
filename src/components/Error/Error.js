import React, { createContext, useContext } from 'react';
import ReportIcon from '@mui/icons-material/Report';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/joy/Typography';
import { Sheet } from '@mui/joy';

export const ErrorContext = createContext();

export default function Error() {
    const {error, setError} = useContext(ErrorContext);
    return (
        <Sheet sx={{display: error ? 'block' : 'none'}}>
            <Alert
                sx={{ alignItems: 'flex-start', borderRadius: 0}}
                startDecorator={<ReportIcon />}
                variant="soft"
                color='danger'
                endDecorator={
                    <IconButton variant="soft" color='danger' onClick={() => setError(undefined)}>
                    <CloseRoundedIcon />
                    </IconButton>
                }
                size='sm'
            >
                <div>
                    <div>Error</div>
                    <Typography level="body-sm">
                        {error}
                    </Typography>
                </div>
            </Alert>
        </Sheet>
    );
}
