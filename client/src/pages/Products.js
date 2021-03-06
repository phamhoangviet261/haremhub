import { useFormik } from 'formik';
import { useState, useEffect, useContext, createContext } from 'react';
// material
import { Container, Stack, Typography, Pagination } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
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

export default function EcommerceShop({type}) {
  type=type.toLowerCase()
  const [openFilter, setOpenFilter] = useState(false);
  const [orderBy, setOrderBy] = useState('nameASC')
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const { pathname } = useLocation();
  
  // state list anime for page
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [listAnime, setListAnime] = useState()
  let URL = `${SERVER}/api/${type}?page=${page-1}`
  let data = {
    orderBy: orderBy
  };
  
  if(type == 'search') {
    
    URL = `${SERVER}/api/search/byName`
    data = {
      "value": pathname.split("=").pop(),
      'orderBy': orderBy
    }
    console.log("data search", data);
  }
  useEffect(() => {
    let endpoint = ''
    let method = 'POST'
    let d = axios({
    method,
    url: URL,
    data: data
    }).catch(err => {
      console.log(err);
    }).then(res => {
        console.log(res.data)
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
    <OrderByContext.Provider value={{
      orderBy: orderBy,
      setOrderByContext: (value) => {
        setOrderBy(value)
      }
    }}>
    <Page title={`Shiro | ${type}`}>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Danh s??ch {type}{type == 'search' ? ": " + pathname.split("=").pop() : ""} | Trang {page}
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              type={type || 'anime'}
            />
            <ProductSort />
          </Stack>
        </Stack>

        {listAnime && <ProductList type={type} products={listAnime} />}
        {/* <ProductCartWidget /> */}
      </Container>
      <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography></Typography>
        <Pagination count={totalPage} page={page} onChange={handleChange} />
      </Stack>
    </Page>
    </OrderByContext.Provider>
  );
}
