import { Tag } from "antd";

export type TagType =
  | "Admin"
  | "Agent"
  | "Account Manager"
  | "External Reviewer";

interface Props {
  type: TagType;
}

function KTag(props: Props) {
  const { type } = props;

  let tagClassName = "";
  let textClassName = "";

  switch (type) {
    case "Account Manager":
      tagClassName = "bg-red";
      textClassName = "text-red";
      break;
    case "Admin":
      tagClassName = "bg-purple";
      textClassName = "text-purple";
      break;
    case "Agent":
      tagClassName = "bg-blue";
      textClassName = "text-blue";
      break;
    case "External Reviewer":
      tagClassName = "bg-orange";
      textClassName = "text-orange";
      break;
  }

  return (
    <Tag
      className={`font-500 border-none round-sm text-small-size ${tagClassName} ${textClassName}`}
      color="magenta"
    >
      {type}
    </Tag>
  );
}
export default KTag;
