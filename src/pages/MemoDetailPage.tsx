import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "../components/Box";
import Button from "../components/Button";
import Flex from "../components/Flex";
import Memo from "../interface/Memo";
import { VscChevronLeft, VscEdit, VscTrash } from "react-icons/vsc";

const MemoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memo, setMemo] = useState<Memo | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/" + id);

        setMemo(data);
      } catch (e) {
        alert((e as any).response.data.msg);
        navigate("/");
      }
    })();
  }, [id, navigate]);

  if (memo === null) return <></>;

  return (
    <Box p="16px">
      <Button square onClick={() => navigate("/")}>
        <VscChevronLeft />
      </Button>
      <Flex border={"1px solid #ccc"} p="12px" my="8px" flexDirection="column">
        <Box dangerouslySetInnerHTML={{ __html: memo.content }} />
        <Box fontSize={"12px"} color="#555" textAlign={"right"}>
          생성: {new Date(memo.created_at).toLocaleString()}
        </Box>
        {memo.updated_at !== null && (
          <Box fontSize={"12px"} color="#555" textAlign={"right"}>
            수정: {new Date(memo.updated_at).toLocaleString()}
          </Box>
        )}
      </Flex>
      <Flex justifyContent={"flex-end"} style={{ gap: 8 }}>
        <Button square onClick={() => navigate("edit")}>
          <VscEdit />
        </Button>
        <Button
          square
          onClick={async () => {
            if (window.confirm("해당 메모를 제거하시겠습니까?")) {
              try {
                await axios.delete("/" + id);
                alert("제거가 완료되었습니다.");
              } catch (e) {
                alert((e as any).response.data.msg);
                navigate("/");
              }
              navigate("/");
            }
          }}
        >
          <VscTrash />
        </Button>
      </Flex>
    </Box>
  );
};

export default MemoDetailPage;
