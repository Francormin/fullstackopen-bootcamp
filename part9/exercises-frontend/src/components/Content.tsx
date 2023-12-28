import { ContentProps } from "../types";
import Part from "./Part";

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map(part => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
