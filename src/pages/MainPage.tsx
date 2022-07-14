import axios from "axios";
import { useEffect, useState } from "react";
import Box from "../components/Box";
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

  return (
    <Box p="16px">
      <h1>클라우드 메모장</h1>
      <Editor value={edit} onChange={setEdit} />
    </Box>
  );
};

export default MainPage;
