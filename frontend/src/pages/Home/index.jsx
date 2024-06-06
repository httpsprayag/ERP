import React from 'react';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import WalletIcon from '@mui/icons-material/Wallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { salesData } from '../../constants/sales';
import SalesCard from '../../components/molecules/SalesCard';
import { PrivacyToggler } from '../../components/molecules/PrivacyToggler';

export const HomePage = () => (
  <>
    <Grid container spacing={2} fontFamily='Inter' height='100vh'>
      <Grid item container xs={12} lg={8} xl={9} height='max-content' spacing={2}>
        <Grid xs={12} sm={6} lg={4} item p={0} height='100%'>
          <Box
            fontFamily='Inter'
            component={Card}
            p={2}
            height='100%'
            borderRadius={1}
            elevation={0}
            boxShadow='0px 4px 25px 0px #00000014'
            display='flex'
            flexDirection='column'
            justifyContent='center'>
            <Typography>Total Sales (Feb)</Typography>
            <Typography mt='19px' fontSize={24} fontWeight={600} lineHeight='29.05px'>
              ₹ 50,000.00
            </Typography>
            <Box
              mt='34.5px'
              display='flex'
              alignItems='center'
              gap={1}
              fontSize={16}
              fontWeight={400}
              lineHeight='19.36px'>
              <TrendingUpIcon color='#00DC82' sx={{ width: '24px', height: '24px', color: '#00DC82' }} />
              <Typography component='span' color='#00DC82'>
                8.5%
              </Typography>{' '}
              This Month Growth
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} lg={4} item p={0} height='100%'>
          <Box
            fontFamily='Inter'
            component={Card}
            height='100%'
            p={2}
            borderRadius={1}
            elevation={0}
            boxShadow='box-shadow: 0px 4px 25px 0px #00000014'
            display='flex'
            flexDirection='column'
            justifyContent='center'>
            <Box display='flex' gap={1} alignItems='center'>
              <img src='./icons/expenseRed.svg' alt='expense' width={24} height={24} />
              <Typography>Expense</Typography>
            </Box>
            <Typography mt='19px' fontSize={24} fontWeight={600} lineHeight='29.05px'>
              ₹ 50,000.00
            </Typography>
          </Box>
        </Grid>
        {salesData.map((card) => (
          <Grid xs={12} sm={6} lg={4} item key={card.id}>
            <SalesCard
              cardContent={card.cardContent}
              cardIcon={card.cardIcon}
              cardTitle={card.cardTitle}
              cardTotal={card.cardTotal}
              moreContent={card.moreContent}
            />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} lg={4} xl={3} height='max-content'>
        <Box width='100%' height='100%' display='flex' gap={{ xs: 0, lg: 3 }}>
          <Divider orientation='vertical' flexItem color='#89939E' sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Box flex={1} display='grid'>
            <PrivacyToggler fullWidth />
            <SalesCard
              id={1}
              sx={{ mt: 2 }}
              cardTitle='Total Sales (Feb)'
              cardTotal={50000}
              cardGrowth={{ growth: 8.5, growthContent: 'This Month Growth' }}
              cardContent={[
                { name: 'Gayatri Pipes', total: 3322 },
                { name: 'Gayatri Pipes', total: 3322 },
                { name: 'Gayatri Pipes', total: 3322 },
              ]}
              cardIcon={<WalletIcon color='error' />}
              moreContent='60+ more'
            />
            <Box mt='26px'>
              <Typography fontWeight={600} fontSize={20} lineHeight='20.4px'>
                Others
              </Typography>
              <Box display='flex' gap={2} alignItems='center' mt='28px'>
                <TrendingUpIcon color='#00DC82' sx={{ width: '24px', height: '24px', color: '#00DC82' }} />
                <Typography>Other Income</Typography>
              </Box>
              <Typography pl={4} mt={1.25} color='#00DC82' fontSize={24} fontWeight={600} lineHeight='29.05px'>
                ₹ 3256.00
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography fontWeight={600} fontSize={20} lineHeight='20.4px'>
                Cash Bank
              </Typography>
              <Box>
                <Box display='flex' gap={2} alignItems='center' mt='28px'>
                  <TrendingUpIcon color='#00DC82' sx={{ width: '24px', height: '24px', color: '#00DC82' }} />
                  <Typography>Other Income</Typography>
                </Box>
                <Typography pl={4} mt={1.25} color='#00DC82' fontSize={24} fontWeight={600} lineHeight='29.05px'>
                  ₹ 3256.00
                </Typography>
                <Box display='flex' gap={2} alignItems='center' mt='28px'>
                  <TrendingUpIcon color='#00DC82' sx={{ width: '24px', height: '24px', color: '#00DC82' }} />
                  <Typography>Other Income</Typography>
                </Box>
                <Typography pl={4} mt={1.25} color='#FF1717' fontSize={24} fontWeight={600} lineHeight='29.05px'>
                  ₹ 3256.00
                </Typography>
                <Box display='flex' gap={2} alignItems='center' mt='28px'>
                  <TrendingUpIcon color='#00DC82' sx={{ width: '24px', height: '24px', color: '#00DC82' }} />
                  <Typography>Other Income</Typography>
                </Box>
                <Typography pl={4} mt={1.25} color='#FF1717' fontSize={24} fontWeight={600} lineHeight='29.05px'>
                  ₹ 3256.00
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </>
);
