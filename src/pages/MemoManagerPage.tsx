import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import Box from "../components/Box";
import Button from "../components/Button";
import Flex from "../components/Flex";
import Memo from "../interface/Memo";

const MemoManagerPage = () => {
  const navigate = useNavigate();

  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [selectedMemoList, setSelectedMemoList] = useState<number[]>([]);

  const loadMemo = useCallback(async () => {
    const { data } = await axios.get<Memo[]>("/");

    setMemoList(data);
  }, [setMemoList]);

  useEffect(() => {
    loadMemo();
  }, [loadMemo]);

  return (
    <Box p="16px">
      <Button square onClick={() => navigate("/")}>
        <VscChevronLeft />
      </Button>
      <h1>Cloud Memo Manager</h1>
      <Flex style={{ gap: "8px" }}>
        <Button
          onClick={() => {
            memoList.length === selectedMemoList.length
              ? setSelectedMemoList([])
              : setSelectedMemoList(memoList.map((v) => v.id));
          }}
        >
          {memoList.length === selectedMemoList.length
            ? "전체 해제"
            : "전체 선택"}
        </Button>
        <Button
          onClick={async () => {
            if (selectedMemoList.length === 0) {
              alert("메모를 선택해주세요.");
              return;
            }

            const list = [];

            for (const id of selectedMemoList)
              list.push(axios.delete("/" + id));
            // 병렬 처리를 통한 처리 시간 단축
            await Promise.all(list);

            await loadMemo();
            alert("제거 완료!");
          }}
        >
          선택 제거
        </Button>
        <Button
          onClick={async () => {
            if (!window.confirm("정말 전체 제거를 하시겠습니까?")) {
              return;
            }
            await axios.delete("/");

            await loadMemo();
            alert("제거 완료!");
          }}
        >
          전체 제거
        </Button>
      </Flex>
      {memoList.map((value) => (
        <Flex
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedMemoList((prev) => {
              if (prev.includes(value.id))
                return prev.filter((v) => value.id !== v);
              return [...prev, value.id];
            });
          }}
          border={"1px solid #ccc"}
          borderWidth={selectedMemoList.includes(value.id) ? "3px" : "1px"}
          p="12px"
          my="8px"
          flexDirection="column"
          key={value.created_at}
        >
          <Box
            className="memo-content"
            dangerouslySetInnerHTML={{ __html: value.content }}
          />
          <Box fontSize={"12px"} color="#555" textAlign={"right"}>
            생성: {new Date(value.created_at).toLocaleString()}
          </Box>
          {value.updated_at && (
            <Box fontSize={"12px"} color="#555" textAlign={"right"}>
              수정: {new Date(value.updated_at).toLocaleString()}
            </Box>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default MemoManagerPage;
