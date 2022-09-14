import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import { SERVER } from 'src/config';
import { Typography } from '@mui/material';

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    width: 100%;
    margin: 0 auto;
    
`;

const HeadWrapper = styled.div`
    background: #212130;
    padding: 20px;
    border-radius: 20px;
    overflow: hidden;
`;

const CoverPhoto = styled.div`
    max-height: 200px;
    overflow: hidden;
    & > img {
        width: max-content;
        object-fit: cover;
        border-radius: 20px;
    }
    border-radius: 20px;
`;

const Header = styled.div`
    display: flex;
    width: 100%;
    position: relative;
`;

const Avatar = styled.div`
    height: 120px;
    width: 120px;
    & > img{
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        width: 120px;
        height: 120px;
    }
    position: absolute;   
    left: 20px;
    bottom: 5px;
`;

const Name = styled.div`
    display: flex;
    flex-direction: column;
`;

const EditProfile = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
    text-align: right;
    align-self: center;
    cursor: pointer;
    font-size: 24px;
    & > span{
        min-width: 40px;
        min-height: 40px;
        border: 1px solid #123456;
        display: inline-block;
        text-align: center;
        line-height: 40px;
        border-radius: 8px;
        transition: all 0.4s ease;
    }
    & > span:hover{
        background-color: #123456;
    }
`;

const BodyConatiner = styled.div`
    display: grid;
    grid-template-columns: 30% 1fr;
    gap: 30px;
    width: 100%;
`;

const LeftColumn = styled.div`
    margin-top: 30px;
`;

const RightColumn = styled.div`
    margin-top: 30px;
`;

const FollowContainer = styled.div`
    width: 100%;
    background-color: #212130;
    padding: 20px;
    border-radius: 20px;    
`;

const FollowCount = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const CountBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
    & > p{
        font-size: 24px;
    }
    & > span{
        font-style: italic;
        opacity: 0.6;
        color: #ccc;
    }
`;

const FollowButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

const FollowButtonBlock = styled.div`
    padding: 15px 20px;
    margin-top: 15px;
    background-color: #123456;
    opacity: 1;
    color: #fff;
    width: fit-content;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover{
        background-color: #0d253d;
    }
`;


const BodyMeContainer = styled.div`
    width: 100%;
    background-color: #212130;
    padding: 20px;
    border-radius: 20px;   
`;

const BodyMeTabs = styled.div`
    display: flex;
    /* border-bottom: solid 2px #e8e8e8; */
`;

const BodyMeTabItem = styled.div`
    margin: 6px 15px;
    cursor: pointer;
    position: relative;
    &::after{
        content: "";
        position: absolute;
        left: 0;
        bottom: -6px;
        height: 4px;
        width: ${props => props.choose ? "100%" : "0"};
        background-color: #2196f3;
        transition: all 0.4s ease;
    }
    &:hover::after{
        width: 100%;
    }
`;

const BodyMeContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostContainer = styled.div`
    width: 100%;
    padding: 20px;
    & > textarea{
        min-width: 100%;
        background-color: #212130;
        padding: 15px;
        border-radius: 15px;
        resize: vertical;
        line-height: 16px;
        min-height: 92px;
        max-height: 320px;
        color: #ffffff;
    }
    & > textarea:focus{
        border: solid 1px #212130;
        outline-color: #212130;
    }
`;

const PostAction = styled.div`
    display: flex;
`;

const PostActionItem = styled.div`
    padding: 10px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.4 ease;
    &:hover{
        background-color: #123456;
    }
`;

const PostActionItemText = styled.div`
    margin-left: 10px;
`;

const PostActionButton = styled.div`
    padding: 10px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    background-color: #123456;
    opacity: ${props => props.isHighlight ? "1" : "0.7"};
    margin-left: auto;
`;

const PostItemContainer = styled.div``;
// End of styled

const data = {
    cover: 'https://images5.alphacoders.com/120/thumb-1920-1200477.jpg',
    avatar: 'https://images4.alphacoders.com/678/thumb-1920-678317.jpg',
    name: 'Pham Hoang Viet'
}

const Head = () => {
    const avt = useRef(null)
    const handleClickAvatar= () => {
        // avt.current.style.position = 'absolute'
        // avt.current.style.width = '100%'
        // avt.current.style.height = '100%'
        // avt.current.style.top = '-50%'
        // console.log("click", avt.current.style)
    }
    return <HeadWrapper>
        <CoverPhoto>
            <img src={data.cover} alt="Cover-banner" />
        </CoverPhoto>-
        <Header>
            <Avatar onClick={handleClickAvatar} ref={avt}>
                <img src={data.avatar} alt="avatar-banner" />
            </Avatar>
            <Name>
                <Typography mt={3} ml={20} sx={{
                    fontSize: '24px',
                    fontWeight: '700'                
                }}>
                    {data.name}
                </Typography>
                <Typography t={3} ml={20} sx={{
                    fontSize: '16px',
                    fontWeight: '100',
                    opacity: '0.5',
                    fontStyle: 'italic'          
                }}>Wibu lord</Typography>
            </Name>
            <EditProfile><span>=</span></EditProfile>
        </Header>
    </HeadWrapper>
}

const Follow = () => {
    const data = [
        {title: 'Follower', count: 150},
        {title: 'Posts', count: 10},
        {title: 'Comments', count: 35}
    ]
    return <FollowContainer>
        <FollowCount>
            {data && data.map((item, index) => <CountBlock key={index}>
                <p>{item.count}</p>
                <span>{item.title}</span>
            </CountBlock>)}
        </FollowCount>
        <FollowButton>
            <FollowButtonBlock>Follow</FollowButtonBlock>
            <FollowButtonBlock>Send Message</FollowButtonBlock>
        </FollowButton>
    </FollowContainer>
}

// BODY of Me Component

const Post = () => {
    const [isHighlight, setisHighlight] = useState(false)
    const server = SERVER;
    return <PostContainer>
        <textarea placeholder='Type something...'></textarea>
        <PostAction>
            <PostActionItem>
                <i class="fa-solid fa-link"></i>
                <PostActionItemText>Link Anime/Manga</PostActionItemText>
            </PostActionItem>
            <PostActionItem>
                <i class="fa-solid fa-images"></i>
                <PostActionItemText>Image/Video</PostActionItemText>
            </PostActionItem>
            <PostActionButton isHighlight={isHighlight}>Post</PostActionButton>
        </PostAction>
        <form action={`${server}api/image/uploadphoto`} enctype="multipart/form-data" method="POST">
            <input type="file" name="myImage" accept="image/*"/>
            <input type="submit" value="Upload Photo"/>
        </form>
    </PostContainer>
}

const PostItem = ({}) => {
    return <PostItemContainer></PostItemContainer>
}

const AboutMe = () => {
    return <>abt me</>
}

const Setting = () => {
    return <>setting</>
}

const BodyMe = () => {
    const [type, settype] = useState(0)
    return <BodyMeContainer>
        <BodyMeTabs>
            <BodyMeTabItem choose={type == 0 ? true : false} onClick={() => settype(0)}>Posts</BodyMeTabItem>
            <BodyMeTabItem choose={type == 1 ? true : false} onClick={() => settype(1)}>About Me</BodyMeTabItem>
            <BodyMeTabItem choose={type == 2 ? true : false} onClick={() => settype(2)}>Setting</BodyMeTabItem>
        </BodyMeTabs>
        <BodyMeContent>
            { 
            type == 0 ? <Post></Post> 
            : type == 1 ? <AboutMe></AboutMe> 
            : type == 2 ? <Setting></Setting> 
            : <></>
            }
        </BodyMeContent>
    </BodyMeContainer>
}

const Me = () => {
  return (
    <Container>
        <Head></Head>
        <BodyConatiner>
            <LeftColumn>
                <Follow></Follow>
            </LeftColumn>
            <RightColumn>
                <BodyMe></BodyMe>
            </RightColumn>
        </BodyConatiner>
    </Container>
  )
}

export default Me