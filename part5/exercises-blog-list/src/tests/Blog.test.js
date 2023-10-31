import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Blog from "../components/Blog";
import Togglable from "../components/Togglable";

const blogTest = {
  title: "Component testing is done with react-testing-library",
  url: "https://react-testing-library.com",
  likes: 10,
  author: {
    name: "John Doe",
    username: "johnny45"
  }
};

test("<Blog /> renders only the blog title. Url, likes and author name are hidden by default", () => {
  const component = render(<Blog blog={blogTest} />);
  const divBlog = component.container.querySelector(".blog");

  expect(divBlog).toHaveTextContent("Component testing is done with react-testing-library");
  expect(divBlog).not.toHaveTextContent("https://react-testing-library.com");
  expect(divBlog).not.toHaveTextContent("10");
  expect(divBlog).not.toHaveTextContent("John Doe");
});

test("<Togglable /> renders blog's url, likes and author name after clicking the View button", () => {
  const component = render(
    <Togglable buttonLabel="View">
      <p>Url: {blogTest.url}</p>
      <p>
        Likes: {blogTest.likes} <button>Like</button>
      </p>
      <p>Author: {blogTest.author.name}</p>
    </Togglable>
  );

  const viewButton = component.getByText("View");
  fireEvent.click(viewButton);

  const divInfoBlog = component.container.querySelector(".togglableContent");

  expect(divInfoBlog).toHaveTextContent("https://react-testing-library.com");
  expect(divInfoBlog).toHaveTextContent(10);
  expect(divInfoBlog).toHaveTextContent("John Doe");
});

test("If the Like button is clicked twice, it triggers two different event handlers", () => {
  const handleLike = jest.fn();
  const component = render(<Blog blog={blogTest} />);

  const likeButton = component.getByText("Like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(handleLike.mock.calls).toHaveLength(2);
});
