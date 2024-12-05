import React from "react";

interface workSpacePageProps {
  params: {
    workSpaceId: string;
  };
}

const WorkSpaceId = ({ params }: workSpacePageProps) => {
  return <div>ID :{params.workSpaceId}</div>;
};

export default WorkSpaceId;
