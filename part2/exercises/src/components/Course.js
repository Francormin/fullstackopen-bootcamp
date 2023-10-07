import { Header } from "./Header";
import { Content } from "./Content";

export const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
  </>
);
