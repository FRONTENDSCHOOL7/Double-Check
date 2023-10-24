import React from "react";
import Button from "./Button";

function ButtonList() {
  return (
    <div>
      <Button category="list" txt={["종료", "삭제", "고마워"]}>
        취소
      </Button>
    </div>
  );
}

export default ButtonList;
