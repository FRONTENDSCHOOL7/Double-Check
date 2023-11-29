/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { profileAPI, setProfile, setProfileAPI } from 'API/Profile';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';
import loginToken from 'Recoil/LoginToken';
import { styled } from 'styled-components';
import { ImageUpload } from 'API/ImageUpload';
import Topbar from 'components/Common/Topbar/Topbar';
import { navBar } from 'Recoil/Navbar';
import imgBtn from 'assets/images/icon/icon-img.png';
import { CategoryList } from 'components/Category';
import ImageCheck from 'components/Common/ImageCheck';
import { useNavigate } from 'react-router-dom';
// 상단바 로그아웃 버튼
import { HiOutlineDotsVertical } from 'react-icons/hi';
import ModalButton from 'components/Common/Modal/ModalButton';
export default function SetMyInfo() {
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  const navigate = useNavigate();
  const [, setLoginCheck] = useRecoilState(loginCheck);
  const [token, setToken] = useRecoilState(loginToken);
  const [profileImage, setProfileImage] = useState('');
  const [categories, setCategories] = useState([]);
  const isFirstRender = useRef(true); // 랜더링 컨트롤
  const [intro, setIntro] = useState('');
  const [profileData, setProfileData] = useState({
    user: {
      username: '',
      accountname: '',
      intro: '',
      image: '',
    },
  });
  // 모달 상태
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);
  const LogoutButton = (
    <button onClick={() => setShowEditDeleteModal(true)}>
      <HiOutlineDotsVertical />
    </button>
  );

  const handleCancel = () => {
    setShowEditDeleteModal(false);
  };

  //로그아웃
  const navigateToLoginPage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('recoil-persist');
    setLoginCheck(false);
    navigate('/main');
  };
  // 프로필 정보 요청
  const getMyProfile = async () => {
    try {
      const response = await profileAPI(token);
      console.log(response);
      setProfileData(response);

      const parts = response.user.intro.split('@cc@');
      if (parts.length > 1) {
        const categoryParts = parts[1].split(',');
        setCategories(categoryParts);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
    isFirstRender.current = false;
  };

  // 페이지 로딩 될때 먼저 프로필 정보 가져오기
  useEffect(() => {
    setShowNavBar(false);
    getMyProfile();
  }, [token]);

  const inputRef = useRef();

  const handleImgBtnClick = () => {
    inputRef.current.click();
  };

  // 이미지 변경 처리 함수
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const response = await ImageUpload(file);
    setProfileImage(response.data.filename);
    setProfileData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        image: response.data.filename,
      },
    }));
  };

  const categoriesArr = [
    '사회',
    '역사',
    '어린이',
    '경영',
    '소설',
    '에세이',
    '시',
    '예술',
    '경제',
    '종교',
    '인문학',
    '과학',
    '자기개발',
  ];

  const handleCategoryClick = (category) => {
    const maxCategories = 3;

    if (categories.includes(category)) {
      // 이미 선택한 카테고리를 다시 클릭하면 제거
      const updatedCategories = categories.filter((c) => c !== category);
      setCategories(updatedCategories);
    } else {
      // 아직 선택하지 않은 카테고리를 클릭하면 추가
      if (categories.length < maxCategories) {
        setCategories([...categories, category]);
      } else {
        return;
      }
    }
    handleIntroChange();
    isFirstRender.current = true;
  };

  const handleIntroChange = (e) => {
    setIntro(e ? e.target.value : intro);
    isFirstRender.current = true;
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      return;
    }
    if (categories) {
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        user: {
          ...prevProfileData.user,
          intro: intro + (categories.length > 0 ? '@cc@' + categories.join(',') : ''),
        },
      }));
    }
  }, [categories, intro]);

  const updateProfile = async () => {
    console.log('Updating profile with data:', profileData);
    const response = await setProfileAPI(profileData, token);
    console.log(response);
    location.reload(navigate('/profile/myinfo'));
  };
  const userImage = ImageCheck(
    'https://api.mandarin.weniv.co.kr/' + profileData.user.image,
    'profile',
  );
  return (
    <>
      <Wrapper>
        <Profile>
          <Rectangle />
          <ProfileBox>
            <ImgInput>
              <ImageBox>
                <Image src={userImage} alt='프로필이미지' />
              </ImageBox>
              <ImgBtn src={imgBtn} alt='' onClick={handleImgBtnClick} />
            </ImgInput>
            <InputFile>
              <InputBoxFile
                className='a11y-hidden'
                type='file'
                placeholder={profileData.user.image}
                id='image'
                ref={inputRef}
                onChange={handleImageChange} // 이미지 변경 처리
              />
            </InputFile>
            <Label>카테고리(최대 3개)</Label>
            <CategoryDiv>
              <CategoryList
                categories={categoriesArr}
                onCategoryClick={handleCategoryClick}
                initialClickedCategories={categories}
              />
            </CategoryDiv>
            <InputDiv>
              <Label htmlFor='intro'>소개</Label>
              <Textarea
                type='text'
                placeholder={
                  profileData.user.intro &&
                  typeof profileData.user.intro === 'string' &&
                  profileData.user.intro.includes('@cc@')
                    ? profileData.user.intro.split('@cc@')[0] + '(30자 이내로 입력해 주세요)'
                    : profileData.user.intro || '' + '(30자 이내로 입력해 주세요)'
                }
                id='intro'
                name='intro'
                maxLength='30'
                value={intro || ''}
                onChange={handleIntroChange}
              />
            </InputDiv>
            <ButtonDiv>
              <Button type='button' onClick={updateProfile}>
                프로필 수정
              </Button>
            </ButtonDiv>
          </ProfileBox>
        </Profile>
      </Wrapper>

      {showEditDeleteModal && (
        <ModalButton
          text={'로그아웃'}
          onClick={navigateToLoginPage}
          onCancel={handleCancel}
          padding
        />
      )}
    </>
  );
}

const Textarea = styled.textarea`
  width: 100%;
  height: 6.25em;
  font-family: 'Pretendard-Regular';
  border: none;
  resize: none;
  border-radius: 10px;
  padding: 15px;
  font-size: var(--font-xs-size);
`;

const Rectangle = styled.div`
  margin-top: 10px;
  width: 48px;
  height: 11px;
  border-radius: 30px;
  background: #d2d8fa;
`;

const Wrapper = styled.div`
  font-family: 'Pretendard-Regular';
  padding: 0 20px;
`;

const Profile = styled.div`
  margin-top: 32px;
  width: 100%;
  /* height: 100vh; */
  padding: 10px 20px;
  background-color: #f2f4ff;
  border-radius: 20px;
`;

const Button = styled.button`
  width: 144px;
  height: 40px;
  font-family: Pretendard-Regular;
  font-size: 16px;
  color: #fff;
  border-radius: 17px;
  background: #b29aff;
  margin-top: 33px;
`;

const ButtonDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const InputFile = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;

const Label = styled.label`
  color: #000;
  font-family: 'Pretendard-Regular';
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  margin-bottom: 20px;
`;

const InputBoxFile = styled.input`
  height: 40px;
  border: 1px solid var(--medium-blue);
  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;

const ProfileBox = styled.div`
  margin-top: 60px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-fit: fill;
  image-rendering: -webkit-optimize-contrast;
`;

const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  background-color: var(--white);
  border-radius: 50%;
  overflow: hidden;
`;

const ImgInput = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ImgBtn = styled.img`
  width: 49px;
  height: 45px;
  position: absolute;
  z-index: 20;
  top: 70%;
  left: 60%;
`;

const CategoryDiv = styled.div`
  margin: 15px 0 0 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
