import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ListGroup({ items }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedCreditNote, setSelectedCreditNote] = useState(-1);
  const [selectedBill, setSelectedBill] = useState(null);

  const resetSelection = () => {
    handleClose();
    setSelectedIndex(-1);
    setSelectedCreditNote(-1);
    setSelectedBill(null);
  };

  const usdToClp = 800;

  items = items.map((item) => {
    if (item.currency === "CLP") {
      return { ...item, amount: item.amount / usdToClp };
    }
    return item;
  });

  const received = items.filter((item) => item.type === "received");
  const creditNotes = items.filter((item) => item.type === "credit_note");

  const selectBillMsg = "Selecciona una factura";
  const selectCreditMsg = "Selecciona una nota de crédito";
  const modalMsg = "Nota de crédito asignada correctamente";
  const modalContinueMsg = "Seguir asignando";
  const okMsg = "Asignar";

  const recivedMsg = "Recibida";

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (items.length === 0) {
    return <p>No items</p>;
  }
  // <button onClick={() => setShowModal(false)}>Close</button>

  return (
    <>
      {true && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalMsg}</Modal.Title>
          </Modal.Header>
          {/* <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body> */}
          <Modal.Footer>
            <Button variant="primary" onClick={resetSelection}>
              {modalContinueMsg}
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <h2 style={{ textAlign: "center" }}>{selectBillMsg}</h2>

      <ul className="list-group">
        {received.map((bill, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={bill.id}
            onClick={() => {
              setSelectedIndex(index);
              setSelectedBill(bill);
            }}
          >
            <div class="container text-center">
              <div class="row">
                <div class="col">
                  inv_{index} ({bill.organization_id})
                </div>
                <div class="col">
                  ${bill.amount * usdToClp}CLP ({bill.amount}
                  USD)
                </div>
                <div class="col">{recivedMsg}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedIndex !== -1 && (
        <>
          <h2 style={{ textAlign: "center" }}>{selectCreditMsg}</h2>
          <ul className="list-group">
            {creditNotes
              .filter((creditNote) => creditNote.reference === selectedBill.id)
              .map((creditNote, cnindex) => (
                <li
                  className={
                    selectedCreditNote === cnindex
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  key={creditNote.id}
                  onClick={() => {
                    setSelectedCreditNote(cnindex);
                  }}
                >
                  <div class="container text-center">
                    <div class="row">
                      <div class="col">
                        {cnindex} ({creditNote.organization_id})
                      </div>
                      <div class="col">
                        ${creditNote.amount * usdToClp}CLP ({creditNote.amount}
                        USD)
                      </div>
                      <div class="col">inv_{selectedIndex}</div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
      {selectedCreditNote !== -1 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={handleShow}>
            {okMsg}
          </button>
        </div>
      )}
    </>
  );
}

export default ListGroup;
