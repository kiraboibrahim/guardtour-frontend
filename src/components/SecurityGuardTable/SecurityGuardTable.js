import React from "react";
import { Sheet, Table, Typography } from "@mui/joy";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function SecurityGuardTable({securityGuards}) {
    return (
        <Sheet  variant='outlined' sx={{
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflow: 'auto',
            minHeight: 0,
          }}>
            <Table stickyHeader sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }} hoverRow>
                <thead>
                    <tr>
                    <th style={{ width: 140, padding: '12px 6px' }}>Unique ID</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Name</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Gender</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Date of Birth</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Phone Number</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Armed</th>
                    </tr>
                </thead>
                <tbody>
                    {securityGuards.map((securityGuard) => (
                    <tr key={securityGuard.uniqueId}>
                        <td><Typography level="body-xs">{securityGuard.uniqueId}</Typography></td>
                        <td><Typography level="body-xs">{securityGuard.firstName} {securityGuard.lastName}</Typography></td>
                        <td><Typography level="body-xs">{securityGuard.gender}</Typography></td>
                        <td><Typography level="body-xs">{securityGuard.dateOfBirth}</Typography></td>
                        <td><Typography level="body-xs">{securityGuard.phoneNumber}</Typography></td>
                        <td><Typography level="body-xs">{securityGuard.armedStatus ? <CheckCircleOutlineIcon color='success'/> : <CancelOutlinedIcon color='danger' />}</Typography></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    );
}