import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo component", () => {
  const todo = { text: "Buy milk", done: false };

  test("should render todo text", () => {
    render(<Todo todo={todo} onClickComplete={() => {}} onClickDelete={() => {}} />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  test('should render "not done" message when todo is not done', () => {
    render(<Todo todo={todo} onClickComplete={() => {}} onClickDelete={() => {}} />);
    expect(screen.getByText(/This todo is not done/i)).toBeInTheDocument();
    expect(screen.getByText("Set as done")).toBeInTheDocument();
  });

  test('should render "done" message when todo is done', () => {
    const doneTodo = { ...todo, done: true };
    render(<Todo todo={doneTodo} onClickComplete={() => {}} onClickDelete={() => {}} />);
    expect(screen.getByText(/This todo is done/i)).toBeInTheDocument();
    expect(screen.queryByText("Set as done")).not.toBeInTheDocument();
  });

  test("calls onClickDelete when Delete button is clicked", () => {
    const mockDelete = vi.fn();
    render(<Todo todo={todo} onClickComplete={() => {}} onClickDelete={mockDelete} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith(todo);
  });

  test("calls onClickComplete when Set as done is clicked", () => {
    const mockComplete = vi.fn();
    render(<Todo todo={todo} onClickComplete={mockComplete} onClickDelete={() => {}} />);

    const completeButton = screen.getByText("Set as done");
    fireEvent.click(completeButton);

    expect(mockComplete).toHaveBeenCalledWith(todo);
  });
});
