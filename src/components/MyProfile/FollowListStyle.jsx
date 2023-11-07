import styled from 'styled-components';

const FollowerTitle = styled.p`
  text-align: center;
  margin-top: 20px;
  padding: 13px 0;
  font-family: 'Pretendard-Medium', sans-serif;
  font-size: var(--font-sm-size);
  border-top: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
  border-bottom: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
`;

const UserProfileWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 401px;
  overflow-y: auto;
`;

const UserProfile = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0 0 18px;
  /* margin-left: 25px;
  font-family: 'Pretendard-SemiBold', sans-serif;
  font-size: var(--font-base-size); */
  cursor: pointer;
  &:first-child {
    margin: 20px 0 0 18px;
  }
`;

const ProfileImage = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  border: 1px solid var(--gray-300);
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
`;

const EmptyList = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard-Regular', sans-serif;
  font-size: var(--font-xs-size);
  color: var(--gray-400);
  margin-top: 180px;
`;

const Loding = styled.div`
  text-align: center;
  margin-top: 247px;
  font-family: 'Pretendard-Regular', sans-serif;
  font-size: var(--font-xs-size);
  color: var(--gray-400);
`;

export { FollowerTitle, UserProfileWrapper, UserProfile, ProfileImage, EmptyList, Loding };
