import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton
} from '@mui/material';

// ----------------------------------------------------------------------
import axios from 'axios'
import {SERVER} from '../../config'
import { useLocation } from "react-router-dom";
// ----------------------------------------------------------------------

const APPBAR_MOBILE = 24;
const APPBAR_DESKTOP = 62;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [valueSearch, setValueSearch] = useState('')
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async () => {
    setOpen(false);
    if(location.pathname.includes('movie')){
      window.location.href=`/movie/search?title=${valueSearch}`
    } else {
      window.location.href=`/search/title=${valueSearch}`
    }    
  };
  
  const handleKeyDown= (e) => {
    if (e.key === 'Enter') {
      if(location.pathname.includes('movie')){
        window.location.href=`/movie/search?title=${valueSearch}`
      } else {
        window.location.href=`/search/title=${valueSearch}`
      }  
    }
  }
  
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>              
              }
              // value={valueSearch}
              onChange={(event) => {setValueSearch(event.target.value)}}
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              onKeyDown={handleKeyDown}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
