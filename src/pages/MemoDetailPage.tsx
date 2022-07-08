import React from "react";
import { useParams } from "react-router-dom";

const MemoDetailPage = () => {
  const { id } = useParams();

  return <div>MemoDetailPage {id}</div>;
};

export default MemoDetailPage;
