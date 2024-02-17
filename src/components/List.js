import Cards from "./Cards"

const List = ({ items }) => {
  return(
    <div className="row mt-3">
      {items.map((item) => {
        return (
          <div key={item.createdAt} className="col-4 mb-5">
            <Cards {...item} />
            </div>
        )
      })}
    </div>
  )
}

export default List