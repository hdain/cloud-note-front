import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";
import Editor from "../components/Editor";

const MainPage = () => {
  const [edit, setEdit] = useState("");

  useEffect(() => {
    (async () => {
      const {
        data: { rs },
      } = await axios.get("/tmp");

      setEdit(rs);
    })();
  }, []);

  useEffect(() => {
    if (edit.length > 0)
      axios.post("/tmp", {
        content: edit,
      });
  }, [edit]);

  const handleSubmit = useCallback(async () => {
    if (edit.replace(/<[/\w\s"=-]*>/gi, "").length === 0) {
      alert("메모를 작성해주세요!");
      return;
    }

    try {
      const { data } = await axios.post("/", {
        content: edit,
      });

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
    </Box>
  );
};

export default MainPage;
