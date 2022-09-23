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
import { useLocation, Link } from 'react-router-dom';
import { orderBy } from 'lodash';
export const OrderByContext = createContext()
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

const movieTypes = [
  "Phim Mới",
  "Phim Bộ",
  "Phim Lẻ",
  "TV Shows",
  "Hoạt Hình",
  "Pham Vietsub",
  "Phim Thuyết Minh",
  "Phim Lồng Tiếng",
  "Phim Bộ Đang Chiếu",
  "Phim Trọn Bộ",
  "Phim Sắp Chiếu",
  "Subteam",
];

const StyledGenreContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const StyledGenreItem = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 10px;
  text-decoration: none;
  color: #fff;
  &:hover{
    background-color: #5dafec;
  }
`;

export default function ListMovie({type}) {
  
  const location = useLocation();
  
  // state list anime for page
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [listAnime, setListAnime] = useState([])
  
  const [genre, setGenre] = useState('');

  useEffect(() => {
    let URL = `${SERVER}/api/${'movie'}?page=${page-1}`;
    let data = {
    };
    let endpoint = ''
    let method = 'GET'

    if(type == 'search'){      
      URL = `${SERVER}/api/${'movie'}/search`;
      data = {
        value: location.search.split('=')[1]
      };
      method = 'POST'
    } else if (type == 'category'){
      console.log({location})
      URL = `${SERVER}/api/${'movie'}/category/${location.pathname.split('/').pop()}?page=${page}`;
      data = {
        
      };
      method = 'GET'
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
        if(type == 'category'){
          setGenre(res.data.genre);
        }
    });
  }, [page, location.pathname, orderBy])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, location.pathname, orderBy]);

  // useEffect for orderBy
  // console.log("type ", type)
  function convertViToEn(str, toUpperCase = false) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    return toUpperCase ? str.toUpperCase() : str;
}
  return (
    
    <Page title={`Shiro | ${'movie'}`}>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Danh sách {'phim'} | Trang {page}
        </Typography>
        {genre && <Typography variant="h4" sx={{ mb: 5 }}>Thể loại: {genre}</Typography>}
        <StyledGenreContainer>
          {/* <span style={{padding: '15px 15px'}}>Thể loại: </span> */}
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Thể loại:</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={''}
              label="Thể loại:"
              
            >
          {movieGenres.map((gen, index) => 
          // <StyledGenreItem key={`gen+${index}`} to={'/movie/category/'+convertViToEn(gen.toLocaleLowerCase().split(' ').join('-'))}>{gen}</StyledGenreItem>          
                <MenuItem value={gen}>
                  <StyledGenreItem key={`gen+${index}`} to={'/movie/category/'+convertViToEn(gen.toLocaleLowerCase().split(' ').join('-'))}>{gen}</StyledGenreItem> 
                </MenuItem>
              
          )}
          </Select>
            </FormControl>
        </StyledGenreContainer>

        <StyledGenreContainer>
          {/* <span style={{padding: '15px 15px'}}>Nhóm: </span> */}
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Nhóm:</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={''}
              label="Nhóm:"
              
            >
          {movieTypes.map((gen, index) => 
          // <StyledGenreItem key={`gen+${index}`} to={'/movie/category/'+convertViToEn(gen.toLocaleLowerCase().split(' ').join('-'))}>{gen}</StyledGenreItem>          
                <MenuItem value={gen}>
                  <StyledGenreItem key={`gen+${index}`} to={'/movie/category/'+convertViToEn(gen.toLocaleLowerCase().split(' ').join('-'))}>{gen}</StyledGenreItem> 
                </MenuItem>
              
          )}
          </Select>
            </FormControl>
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
