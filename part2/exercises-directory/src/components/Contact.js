export const Contact = ({ name, number, deleteHandler }) => {
  return (
    <>
      <p>
        {name} {number} <button onClick={deleteHandler}>Delete</button>
      </p>
    </>
  );
};
