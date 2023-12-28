import { PartProps } from "../types";
import { assertNever } from "../utils";

const nameAndExerciseCountStyles = {
  marginBottom: 0
};

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <>
          <h3 style={nameAndExerciseCountStyles}>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <i>{props.part.description}</i>
        </>
      );
    case "group":
      return (
        <>
          <h3 style={nameAndExerciseCountStyles}>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          Project exercises: {props.part.groupProjectCount}
        </>
      );
    case "background":
      return (
        <>
          <h3 style={nameAndExerciseCountStyles}>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <i>{props.part.description}</i>
          <br />
          Background material: <a href={props.part.backgroundMaterial}>{props.part.backgroundMaterial}</a>
        </>
      );
    case "special":
      return (
        <>
          <h3 style={nameAndExerciseCountStyles}>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <i>{props.part.description}</i>
          <br />
          Required skills: {props.part.requirements.join(", ")}
        </>
      );
    default:
      return assertNever(props.part);
  }
};

export default Part;
