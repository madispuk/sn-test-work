import React from "react";
import fetch from "isomorphic-unfetch";
import FilesPage from "../../components/FilesPage";
import FileDetail from "../../components/FileDetail";

const FileDetailPage = ({ data }) => {
  return (
    <FilesPage>
      <FileDetail data={data} />
    </FilesPage>
  );
};

FileDetailPage.getInitialProps = async ({ req, query }) => {
  const fileId = query.id;

  const [details, segments] = await Promise.all([
    fetch(`http://interview-api.snackable.ai/api/file/details/${fileId}`),
    fetch(`http://interview-api.snackable.ai/api/file/segments/${fileId}`),
  ]);

  const detailsJSON = await details.json();
  const segmentsJSON = await segments.json();
  return { data: { details: detailsJSON, segments: segmentsJSON } };
};

export default FileDetailPage;
