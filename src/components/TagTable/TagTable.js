import React from "react";
import { Chip, Sheet, Table, Typography } from "@mui/joy";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

export default function TagTable({tags}) {
    return (
        <Sheet variant='outlined' sx={{
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflow: 'auto',
            minHeight: 0,
          }}>
            <Table sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }} hoverRow stickyHeader>
                <thead>
                    <tr>
                        <th style={{ width: 15, padding: '12px 6px' }}>#</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Unique ID</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag) => (
                    <tr key={tag.uid}>
                        <td><Typography level="body-xs"><LocalOfferOutlinedIcon /></Typography></td>
                        <td><Typography level="body-xs"><Chip variant='soft' size='sm'>{tag.uid}</Chip></Typography></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    )
}