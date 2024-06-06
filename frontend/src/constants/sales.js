import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

export const salesData = [
  {
    id: 1,
    cardTitle: 'Purchase',
    cardTotal: '₹ 50000.00',
    cardGrowth: { growth: 8.5, growthContent: 'This Month Growth' },
    cardContent: [
      { name: 'Gayatri Pipes', total: 3322 },
      { name: 'Gayatri Pipes', total: 3322 },
      { name: 'Gayatri Pipes', total: 3322 },
    ],
    cardIcon: <img src='./icons/shopping-cart.svg' width={24} height={24} alt='shopping-cart' />,
    moreContent: '60+ more',
  },
  {
    id: 2,
    cardTitle: 'You’ll Receive',
    cardTotal: '₹ 50000.00',
    cardGrowth: { growth: 8.5, growthContent: 'This Month Growth' },
    cardContent: [
      { name: 'Gayatri Pipes', total: 3322 },
      { name: 'Gayatri Pipes', total: 3322 },
      { name: 'Gayatri Pipes', total: 3322 },
    ],
    cardIcon: <SouthIcon sx={{ color: '#FF1717', width: 24, height: 24 }} />,
    moreContent: '60+ more',
  },
  {
    id: 2,
    cardTitle: 'You’ll Pay',
    cardTotal: '₹ 50000.00',
    cardGrowth: { growth: 8.5, growthContent: 'This Month Growth' },
    cardContent: [
      { name: 'Gayatri Pipes', total: 3322 },
      { name: 'Gayatri Pipes', total: 3322 },
      { name: 'Gayatri Pipes', total: 3322 },
    ],
    cardIcon: <NorthIcon color='success' sx={{ color: '#00DC82 ', width: 24, height: 24 }} />,
    moreContent: '60+ more',
  },
];
