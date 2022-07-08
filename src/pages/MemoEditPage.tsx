import React from "react";
import { useParams } from "react-router-dom";

const MemoEditPage = () => {
  const { id } = useParams();

  return <div>MemoEditPage {id}</div>;
};

export default MemoEditPage;
