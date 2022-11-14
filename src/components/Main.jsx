import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscChromeClose,
} from "react-icons/vsc";
import Accordion from "./Accordion";
import Content from "./Content";
import AppContext from "../context/AppContext";
import { getPostOne } from "../common/common.function";
import PostWrap from "./PostWrap";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Search from "./pages/Search";

export default function Main() {
  const [selected, setSelected] = useState(null);
  const {
    theme,
    setTheme,
    setSelectedPost,
    setOpenPost,
    selectedPost,
    postData,
    openPost,
    selectedTag,
  } = useContext(AppContext);

  const listArr = [
    {
      icon: <VscFiles size={32} opacity={0.8} />,
      path: "EXPLORER",
      content: (
        <>
          <Accordion title="OPEN POSTS" isBold={true} initialExpanded={true}>
            {openPost.map((one, index) => {
              const data = getPostOne(postData, one);

              return (
                <PostWrap
                  path={data.path}
                  title={data.title}
                  isClose={true}
                  key={index}
                />
              );
            })}
          </Accordion>
          <Accordion title="VSCODE" isBold={true} initialExpanded={true}>
            {postData.map((one, index) => (
              <Content {...one} key={index} />
            ))}
          </Accordion>
        </>
      ),
    },
    {
      icon: <VscSearch size={32} />,
      path: "SEARCH",
      content: <Search />,
    },
    {
      icon: <VscSourceControl size={32} />,
      path: "POSTING LOG",
      content: <Accordion title="2022">text</Accordion>, // 아코디언 빼고 다른거 사용
    },
    {
      icon: <VscDebugAlt size={32} />,
      path: "RUN AND DEBUG",
      content: <Accordion title="RUN AND DEBUG">text</Accordion>,
    },
    {
      icon: <VscExtensions size={32} />,
      path: "EXTENSIONS",
      content: <Accordion title="EXTENSIONS">text</Accordion>,
    },
  ];

  const data = getPostOne(postData, selectedPost);
  return (
    <Wrap>
      <LeftBar>
        <div>
          {listArr.map((one, index) => (
            <IconWrap
              selected={selected === index}
              onClick={() => {
                setSelected(selected === index ? null : index);
              }}
              key={index}
            >
              {one.icon}
            </IconWrap>
          ))}
        </div>
        <div>
          <div
            className={theme}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          ></div>
        </div>
      </LeftBar>
      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected].path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}
      <RightWrap selected={selected}>
        {selectedTag ? (
          <>{selected}</>
        ) : (
          <>
            <RightHeader visible={openPost.length !== 0 ? true : false}>
              {openPost.map((one, index) => {
                const data = getPostOne(postData, one);
                return (
                  <div
                    className={selectedPost === one ? "selected" : ""}
                    onClick={() => {
                      setSelectedPost(data.path);
                    }}
                    key={index}
                  >
                    📝{data.title}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        const openPostFilter = openPost.filter(
                          (one) => one !== data.path
                        );
                        setOpenPost(openPostFilter);
                        setSelectedPost(
                          openPostFilter.length !== 0 ? openPostFilter[0] : null
                        );
                      }}
                    >
                      <VscChromeClose />
                    </span>
                  </div>
                );
              })}
            </RightHeader>
            <RightContent
              selected={selected}
              visible={openPost.length !== 0 ? true : false}
            >
              {data && (
                <>
                  <p>{data.path?.replaceAll("/", " >")}</p>
                  <div>
                    <h1>{data?.title}</h1>
                    <p>
                      <strong>Hyojun</strong> | {data.data?.date}
                    </p>
                    <div>
                      {data.data?.tag?.map((one, indek) => (
                        <span key={indek}>{one}</span>
                      ))}
                    </div>
                    <div className="markdown">
                      <ReactMarkdown
                        children={data.data?.content}
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
                            return !inline && match ? (
                              <SyntaxHighlighter
                                children={String(children).replace(/\n$/, "")}
                                style={dracula}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              />
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </RightContent>
          </>
        )}
      </RightWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.primary};
`;

const LeftBar = styled.div`
  min-width: 50px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.third};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div:last-child {
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 30px;
      height: 50px;
      border: 1px solid ${({ theme }) => theme.color.text};
      border-radius: 50px;
      position: relative;
      cursor: pointer;
      &::after {
        content: "";
        position: absolute;
        top: 5px;
        left: 4px;
        width: 20px;
        border-radius: 50px;
        height: 20px;
        background-color: ${({ theme }) => theme.color.footer};
        transition: 0.3s;
      }
      &.light::after {
        top: 23px;
      }
    }
  }
`;

const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;

  border-left: ${({ selected, theme }) =>
    `${selected ? 2 : 0}px solid ${theme.color.text}}`};

  > svg {
    color: ${({ selected, theme }) =>
      `${selected ? `${theme.color.text}` : `${theme.color.textTwo}`}`};
  }
`;

const LeftContent = styled.div`
  width: 320px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 10px;
  > p {
    user-select: none;
    padding-bottom: 10px;
    color: ${({ theme }) => theme.color.textTwo};
  }
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const RightWrap = styled.div`
  width: ${({ selected }) =>
    selected === null ? "calc(100% - 50px)" : "calc(100% - 320px - 50px)"};
  @media (max-width: 540px) {
    display: ${({ selected }) => (selected === null ? "block" : "none")};
  }
`;

const RightHeader = styled.div`
  width: 100%;
  height: 40px;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  overflow-y: hidden;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.color.secondary};
  ::-webkit-scrollbar-thumb {
    display: none;
  }
  &:hover::-webkit-scrollbar-thumb {
    display: block;
  }
  > div {
    width: 150px;
    min-width: 150px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    line-height: 15px;
    user-select: none;
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 40px 10px 20px;
    background-color: ${({ theme }) => theme.color.third};
    border-right: 1px solid ${({ theme }) => theme.color.third};
    &.selected {
      font-weight: bold;
      background-color: ${({ theme }) => theme.color.primary};
      border-right: 1px solid ${({ theme }) => theme.color.primary};
    }
    &:not(.selected) {
      color: ${({ theme }) => theme.color.contentColor};
      border-right: 1px solid ${({ theme }) => theme.color.secondary};
    }
    &:not(.selected) > span {
      display: none;
    }
    &:hover > span {
      display: block;
    }
    > span {
      position: absolute;
      top: 12px;
      right: 15px;
    }
  }
`;

const RightContent = styled.div`
  width: 100%;
  height: ${({ visible }) => (visible ? "calc(100% - 50px)" : "100%")};
  background-color: ${({ theme }) => theme.color.primary};
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  > p {
    width: 100%;
    color: ${({ theme }) => theme.color.textTwo};
  }
  > div {
    max-width: 800px;
    width: 100%;
    padding: 20px;
    > h1 {
      padding: 10px 0 20px 0;
    }
    > p {
      padding-bottom: 10px;
      color: ${({ theme }) => theme.color.textTwo};
      border-bottom: 1px solid ${({ theme }) => theme.color.selected};
    }

    > div:nth-child(3) {
      padding: 20px 0 20px 0;
      > span {
        margin-right: 10px;
        padding: 5px 10px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.color.selected};
      }
    }

    > div:last-child.markdown {
      h1 {
        color: pink;
        padding: 10px 0 30px 0;
      }
    }
  }
`;
