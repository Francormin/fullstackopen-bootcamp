export const ContactForm = ({ nameHandler, name, numberHandler, number, submitHandler }) => (
  <form onSubmit={submitHandler}>
    <div>
      Name: <input onChange={nameHandler} value={name} />
    </div>
    <div>
      Number: <input onChange={numberHandler} value={number} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
