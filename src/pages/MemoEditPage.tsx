import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "../components/Box";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Flex from "../components/Flex";

const MemoEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [edit, setEdit] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    try {
      await axios.put("/" + id, {
        content: edit,
      });

      alert("수정을 성공했습니다.");
      navigate("/" + id);
    } catch (e) {
      alert((e as any).response.data.msg);
      navigate("/");
    }
  }, [edit, id, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/" + id);
        setEdit(data.content);
      } catch (e) {
        alert((e as any).response.data.msg);
        navigate("/");
      }
    })();
  }, [id, navigate]);

  if (edit === null) return <></>;

  return (
    <Box p="16px">
      <h1>{id} memo edit</h1>
      <Editor value={edit} onChange={setEdit} />
      <Flex justifyContent={"flex-end"} style={{ gap: "8px" }}>
        <Button mt="8px" onClick={handleSubmit}>
          수정
        </Button>
        <Button mt="8px" onClick={() => navigate("/" + id)}>
          취소
        </Button>
      </Flex>
    </Box>
  );
};

export default MemoEditPage;
