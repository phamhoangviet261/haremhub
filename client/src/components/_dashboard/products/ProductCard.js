import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import { useState } from 'react';

// ----------------------------------------------------------------------
import TooltipSide from './Tooltip';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ type, product, index }) {
  const { id, name, coverArt, description, status, altTitle, tags, genres, score } = product;
  
  const colors = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107'
  ];
  
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const typeLink = product.type == "novel" ? "manga" : product.type
  return (
    <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title={<TooltipSide description={description} tags={tags} genres={genres}></TooltipSide>} placement="right-start">
      <Link to={`/${typeLink}/${name.replace('?', '').toLowerCase().split(' ').join('-')+'&'+id}`} state={{id: id}} color="inherit" underline="hover" component={RouterLink}>
      <Card sx={{cursor: 'pointer'}}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {status && 
            <Box>
              <Label
              variant="filled"
              color={'secondary'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase'
              }}
            >
              {score && `Score: ${score}`}
            </Label>
            <Label
              variant="filled"
              color={(status === 'ongoing' && 'error') || 'info'}
              sx={{
                zIndex: 9,
                top: 16,
                left: 16,
                position: 'absolute',
                textTransform: 'uppercase'
              }}
            >
              {status}
            </Label>
            </Box>
          }
          <ProductImgStyle alt={name} src={coverArt ? coverArt[0] : ''} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          
            <Typography variant="subtitle1" noWrap>
              {name} 
            </Typography>
          
          <Typography variant="subtitle2" noWrap sx={{color: "#00AB55"}}>Tên khác: {altTitle}</Typography>
          
        </Stack>
        {/* Custom popover */}
        
      </Card>
      </Link>
    </Tooltip>
  );
}
