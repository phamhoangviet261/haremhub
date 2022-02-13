import { Icon } from '@iconify/react';
import { useState, useContext } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';

// ----------------------------------------------------------------------
import { OrderByContext } from 'src/pages/Products';
// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'score', label: 'Score' },
  { value: 'newest', label: 'Newest' },
  { value: 'nameASC', label: 'Name: A-Z' },
  { value: 'nameDESC', label: 'Name: Z-A' }
];

export default function ShopProductSort() {
  const [open, setOpen] = useState(null);
  const [optionValue, setOptionValue] = useState('nameASC')
  const [optionLabel, setOptionLabel] = useState('Name: A-Z')
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const context = useContext(OrderByContext)
  const handleClose = (v) => {
    setOpen(null);
    if(v == 'score' || v == 'newest' || v == 'nameASC' || v == 'nameDESC'){
      setOptionValue(v)
      let x = SORT_BY_OPTIONS.find(i => {if(i.value == v) return i.label})      
      setOptionLabel(x.label)

      context.setOrderByContext(v)
    }
  };

  
  // console.log('context', context)
  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {optionLabel}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value == optionValue}
            onClick={() => handleClose(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
