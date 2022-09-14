import { useFormik } from 'formik';
import { useState, useEffect, useContext, createContext } from 'react';
// material
import { Container, Stack, Typography, Pagination } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  MovieList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------
import {SERVER} from '../config'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { orderBy } from 'lodash';
export const OrderByContext = createContext()
// ----------------------------------------------------------------------

export default function ListMovie() {
  
  const { pathname } = useLocation();
  
  // state list anime for page
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [listAnime, setListAnime] = useState()
  let URL = `${SERVER}/api/${'movie'}?page=${page-1}`
  let data = {
  };
  

  useEffect(() => {
    let endpoint = ''
    let method = 'GET'
    let d = axios({
    method,
    url: URL,
    data: data
    }).catch(err => {
      console.log(err);
    }).then(res => {
        console.log(res.data.data)
        setListAnime(res.data.data)
        setTotalPage(res.data.totalPage)
    });
  }, [page, pathname, orderBy])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, pathname, orderBy]);

  // useEffect for orderBy
  // console.log("type ", type)
  return (
    
    <Page title={`Shiro | ${'movie'}`}>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Danh sách {'phim'} | Trang {page}
        </Typography>

        

        {listAnime && <MovieList movies={listAnime} />}
        {/* <ProductCartWidget /> */}
      </Container>
      <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography></Typography>
        <Pagination count={totalPage} page={page} onChange={handleChange} />
      </Stack>
    </Page>
  );
}
