export const Person = ({ name, number, handleDelete, id }) => {
  return (
    <div className="App-text">
      <p>
        {name} {number}{" "}
        <button className="button2" onClick={() => handleDelete(id, name)}>
          Delete
        </button>
      </p>
    </div>
  )
}
