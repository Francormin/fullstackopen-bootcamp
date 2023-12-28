import { ContentProps } from "../types";
import Part from "./Part";

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map(part => (
        <div key={part.name}>
          <Part part={part} />
        </div>
      ))}
    </>
  );
};

export default Content;
