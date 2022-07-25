interface Memo {
  content: string;
  id: number;
  created_at: number;
  updated_at: number | null;
  deleted_at: number | null;
}

export default Memo;
