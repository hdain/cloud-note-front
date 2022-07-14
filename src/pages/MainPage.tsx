import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Flex from "../components/Flex";
import Memo from "../interface/Memo";

const MainPage = () => {
  const [edit, setEdit] = useState("");
  const [memoList, setMemoList] = useState<Memo[]>([]);

  useEffect(() => {
    (async () => {
      const {
        data: { rs },
      } = await axios.get("/tmp");

      setEdit(rs);
    })();

    loadMemo();
  }, []);

  useEffect(() => {
    if (edit.length > 0)
      axios.post("/tmp", {
        content: edit,
      });
  }, [edit]);

  const loadMemo = useCallback(async () => {
    const { data } = await axios.get<Memo[]>("/");

    setMemoList(data);
  }, [setMemoList]);

  const handleSubmit = useCallback(async () => {
    if (edit.replace(/<[/\w\s"=-]*>/gi, "").length === 0) {
      alert("메모를 작성해주세요!");
      return;
    }

    try {
      const { data } = await axios.post("/", {
        content: edit,
      });

      setMemoList((prev) => [...prev, data]);

      setEdit("");
      alert("제출 완료");
    } catch {
      alert("저장 실패");
    }
  }, [edit]);

  return (
    <Box p="16px">
      <h1>클라우드 메모장</h1>
      <Editor value={edit} onChange={setEdit} />
      <Button mt="8px" onClick={handleSubmit}>
        제출
      </Button>
      {memoList.map((value) => (
        <Flex
          border={"1px solid #ccc"}
          p="12px"
          my="8px"
          flexDirection="column"
          key={value.created_at}
        >
          <Box dangerouslySetInnerHTML={{ __html: value.content }} />
          <Box fontSize={"12px"} color="#555" textAlign={"right"}>
            생성: {new Date(value.created_at).toLocaleString()}
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default MainPage;
