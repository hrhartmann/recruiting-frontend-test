import { useState } from "react";

function BillList({
  title,
  items,
  usdToClp,
  setSelectItem,
  setIndex,
  lastColMsg = "",
  baseIndex = 0,
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>{title}</h2>

      <ul className="list-group">
        {items
          // .filter((item) => item.reference === selectedItem.id)
          .map((item, index) => (
            <li
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={item.id}
              onClick={() => {
                setSelectedIndex(index);
                setSelectItem(item);
                setIndex(index);
              }}
            >
              <div className="container text-center">
                <div className="row">
                  <div className="col">
                    inv_{index + baseIndex} ({item.organization_id})
                  </div>
                  <div className="col">
                    ${item.amount * usdToClp}CLP ({item.amount}
                    USD)
                  </div>
                  <div className="col">{lastColMsg}</div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default BillList;
