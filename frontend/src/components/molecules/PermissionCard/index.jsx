import React from 'react';
import { Box, Card, CardContent, Checkbox, Grid, Typography } from '@mui/material';

const PermissionCard = ({ menuName, permissions = [], handleSingleCheckBox }) => (
  <Card
    sx={{ height: '100%', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px' }}>
    <Box color='#89939e' bgcolor='#fff' borderBottom='1px solid #89939e' p={2} fontSize={15}>
      {menuName}
    </Box>
    <CardContent>
      <Grid container spacing={2}>
        {permissions.map((permission) => (
          <Grid item xs={12} sm={6} xl={3} key={permission.id} display='flex' alignItems='center'>
            <Checkbox
              color='error'
              sx={{ padding: 0 }}
              name={permission.label}
              checked={Boolean(permission.isChecked)}
              onChange={() => handleSingleCheckBox(permission.id)}
            />
            <Typography>{permission.label}</Typography>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

export default PermissionCard;
