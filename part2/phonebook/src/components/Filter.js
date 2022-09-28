export const Filter = ({ searchValue, handleFilterChange }) => {
  return (
    <div>
      <h3 className="App-header2">Filter</h3>
      <div className="App-stat">
        Filter names:{" "}
        <input value={searchValue} onChange={handleFilterChange} />
      </div>
    </div>
  )
}
