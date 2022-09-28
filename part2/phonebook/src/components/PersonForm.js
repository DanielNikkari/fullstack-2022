export const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div className="App-stat">
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div className="App-stat">
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
