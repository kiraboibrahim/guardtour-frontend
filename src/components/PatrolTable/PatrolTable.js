import React from "react";
import { Sheet, Table, Typography } from "@mui/joy";


export default function PatrolTable({patrols}) {
    return (
        <Sheet variant='outlined' sx={{
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
                        <th style={{ width: 140, padding: '12px 6px' }}>Site</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Start Time</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>End Time</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Security Guard</th>
                    </tr>
                </thead>
                <tbody>
                    {patrols.filter(({securityGuard}) => securityGuard !== null).map((patrol) => (
                    <tr key={patrol.id}>
                        <td><Typography level="body-xs">{patrol.site.name}</Typography></td>
                        <td><Typography level="body-xs">{patrol.date}</Typography></td>
                        <td><Typography level="body-xs">{patrol.startTime}</Typography></td>
                        <td><Typography level="body-xs">{patrol.endTime}</Typography></td>
                        <td><Typography level="body-xs">{patrol.securityGuard.firstName} {patrol.securityGuard.lastName}</Typography></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    );
}