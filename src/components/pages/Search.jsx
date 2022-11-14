import React, { useState, useEffect } from "react";
import Accordion from "../Accordion";
import styled from "styled-components";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

export default function Search() {
  const { postData, setSelectedTag } = useContext(AppContext);
  const [tagDate, setTagData] = useState([]);

  useEffect(() => {
    const tempArr = [];

    searchTagFnc(postData);
    // 태그 데이터 뽑는 함수
    function searchTagFnc(nowPostDataArr) {
      nowPostDataArr.forEach((nowPostData) => {
        if (nowPostData.type === "post") {
          // 게시물일 경우 처리
          nowPostData.data.tag?.forEach((tag) => {
            // 일시 데이터에 태그가 존재하는지 검사
            const tempTarget = tempArr.find((temp) => tag === temp.tagTitle);
            if (tempTarget) {
              tempTarget.count += 1;
              tempTarget.postArr.push(nowPostData.path);
              tempTarget.postArr = [...new Set(tempTarget.postArr)];
            } else {
              tempArr.push({
                tagTitle: tag,
                count: 1,
                postArr: [nowPostData.path],
              });
            }
          });
        } else {
          nowPostData.children && searchTagFnc(nowPostData.children);
        }
      });
    }
    setTagData(tempArr);
  }, [postData]);

  return (
    <Accordion title="Tags" initialExpanded={true}>
      <TagWrap>
        {tagDate.map((one, index) => (
          <Tag
            key={index}
            onClick={() => {
              setSelectedTag({
                tagTitle: one.tagTitle,
                path: one.postArr,
              });
            }}
          >
            {one.tagTitle} <span>{one.count}</span>
          </Tag>
        ))}
      </TagWrap>
    </Accordion>
  );
}

const TagWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  margin: 5px;
  padding: 10px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.third};
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  > span {
  }
`;
