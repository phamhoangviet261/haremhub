import { useFormik } from 'formik';
import { useState, useEffect, useContext, createContext } from 'react';
// material
import { Container, Stack, Typography, Pagination, Box } from '@mui/material';
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
import styled from 'styled-components';
// ----------------------------------------------------------------------
import {SERVER} from '../config'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { orderBy } from 'lodash';
export const OrderByContext = createContext()
// ----------------------------------------------------------------------
const movieGenres = [
  "Tâm Lý",
  "Tài Liệu",
  "Hành Động",
  "Phiêu Lưu",
  "Tình Cảm",
  "Chính kịch",
  "Bí ẩn",
  "Viễn Tưởng",
  "Hài Hước",
  "Cổ Trang",
  "Kinh Dị",
  "Học Đường",
  "Hình Sự",
  "Chiến Tranh",
  "Âm Nhạc",
  "Gia Đình",
  "Khoa Học",
  "Võ Thuật",
  "Thần Thoại",
  "Thể Thao",
  "Phim 18+",
  "Kinh Điển"
];

const StyledGenreContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const StyledGenreItem = styled.span`
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 10px;
  &:hover{
    background-color: #5dafec;
  }
`;

export default function ListMovie() {
  
  const location = useLocation();
  
  // state list anime for page
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [listAnime, setListAnime] = useState([])
  
  

  useEffect(() => {
    let URL = `${SERVER}/api/${'movie'}?page=${page-1}`;
    let data = {
    };
    let endpoint = ''
    let method = 'GET'

    if(location.pathname.split('/')[2] == 'search'){
      console.log('location', location)
      URL = `${SERVER}/api/${'movie'}/search`;
      data = {
        value: location.search.split('=')[1]
      };
      method = 'POST'
    }
    console.log({method,
      url: URL,
      data: data})
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
  }, [page, location.pathname, orderBy])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, location.pathname, orderBy]);

  // useEffect for orderBy
  // console.log("type ", type)
  return (
    
    <Page title={`Shiro | ${'movie'}`}>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Danh sách {'phim'} | Trang {page}
        </Typography>

        <StyledGenreContainer>
          <span style={{padding: '10px 15px'}}>Genres: </span>
          {movieGenres.map(gen => <StyledGenreItem>{gen}</StyledGenreItem>)}
        </StyledGenreContainer>

        {listAnime.length > 0 ? <MovieList movies={listAnime} /> : <h2>SEARCHING MOVIE</h2>}
        {/* <ProductCartWidget /> */}
      </Container>
      <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography></Typography>
        <Pagination count={totalPage} page={page} onChange={handleChange} />
      </Stack>
    </Page>
  );
}
