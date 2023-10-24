import Button from "components/Common/Button/Button";

import React from "react";

function TestPage() {
  return (
    <div>
      <Button category="basic" shape="primary">
        등록
      </Button>
      <Button category="basic" shape="sub">
        책 보러 가기
      </Button>
      <Button category="basic" shape="big">
        이메일로 로그인하기
      </Button>
      <Button category="basic" shape="big" disabled>
        로그인
      </Button>
      <Button category="white">취소</Button>
      <Button category="list" txt={["종료", "삭제", "고마워"]}>
        취소
      </Button>
    </div>
  );
}

export default TestPage;

// 오늘 할일
// 버튼 리스트로 만들기
// 얼럿창 만들기
// 카드 만들기
