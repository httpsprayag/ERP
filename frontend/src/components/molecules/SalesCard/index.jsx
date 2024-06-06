/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Card, Typography, Divider } from '@mui/material';

const SalesCard = ({ cardTitle, cardIcon, cardTotal, cardContent, moreContent, sx }) => (
  <Box
    fontFamily='Inter'
    sx={{ ...sx }}
    component={Card}
    p={2}
    borderRadius={1}
    elevation={0}
    boxShadow='box-shadow: 0px 4px 25px 0px #00000014'
    display='flex'
    flexDirection='column'
    justifyContent='center'>
    <Box display='flex' alignItems='center' gap={1.5}>
      {cardIcon && <>{cardIcon}</>}
      <Typography fontSize={16} fontWeight={600} lineHeight='19.36px' color='#212121'>
        {cardTitle}
      </Typography>
    </Box>
    <Typography mt='10px' mb={3} ml={6} fontSize={24} fontWeight={600} lineHeight='29.05px'>
      {cardTotal}
    </Typography>
    <Typography>
      {cardContent.map((data) => (
        <Box display='flex' alignItems='center' width='100%' justifyContent='space-between'>
          <Typography fontSize={14} fontWeight={500} lineHeight='16.94px'>
            {data.name}
          </Typography>
          <Typography color='#00DC82'>{data.total}</Typography>
        </Box>
      ))}
    </Typography>
    <Box padding={0} borderTop={moreContent && '1px solid #89939E'} pt='14px' mt={2}>
      <Typography fontSize={14} fontWeight={400} lineHeight='16.94px' textAlign='center'>
        {moreContent}
      </Typography>
    </Box>
  </Box>
);

export default SalesCard;
