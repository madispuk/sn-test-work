import { JsonToTable } from "react-json-to-table";

const FileDetail = ({ data }) => {
  return <JsonToTable json={data} />;
};

export default FileDetail;
