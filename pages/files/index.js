import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import FileList from "../../components/FileList";
import FilesPage from "../../components/FilesPage";
import Router, { withRouter } from "next/router";

const FileListPage = (props) => {
  const [filter, setFilter] = useState("");
  const query = props.router.query;
  const offset = parseInt(query.offset) || 0;
  const limit = parseInt(query.limit) || 5;

  const prevOffset = offset - limit < 0 ? 0 : offset - limit;
  const nextOffset = offset + limit;

  const changeLimit = (e) => {
    Router.push(`/files?offset=${offset}&limit=${e.target.value}`);
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };
  let filteredFiles = props.files;
  if (filter !== "") {
    filteredFiles = props.files.filter((f) => f.processingStatus === filter);
  }

  return (
    <FilesPage>
      Filter:
      <select value={filter} onChange={changeFilter}>
        <option value="">-</option>
        <option value="FINISHED">FINISHED</option>
        <option value="FAILED">FAILED</option>
        <option value="PROCESSING">PROCESSING</option>
      </select>
      Limit:
      <select value={limit} onChange={changeLimit}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <FileList files={filteredFiles} />
      <div>
        <button
          onClick={() =>
            Router.push(`/files?offset=${prevOffset}&limit=${limit}`)
          }
          disabled={offset === 0}
        >
          PREV
        </button>
        <button
          onClick={() =>
            Router.push(`/files?offset=${nextOffset}&limit=${limit}`)
          }
          disabled={props.files.length < limit}
        >
          NEXT
        </button>
      </div>
    </FilesPage>
  );
};

FileListPage.getInitialProps = async (context) => {
  const offset = context.query.offset;
  const limit = context.query.limit;

  const resp = await fetch(
    `http://interview-api.snackable.ai/api/file/all?offset=${offset}&limit=${limit}`
  );
  const json = await resp.json();
  return { files: json };
};

export default withRouter(FileListPage);
