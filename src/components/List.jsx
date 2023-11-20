import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import BillList from "./BillList";

function ListGroup({ items }) {
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedBillIndex, setSelectedBillIndex] = useState(-1);

  const resetSelection = () => {
    handleClose();
    // setSelectedIndex(-1);
    setSelectedCreditNote(null);
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

      <BillList
        title={selectBillMsg}
        items={received}
        usdToClp={usdToClp}
        setSelectItem={setSelectedBill}
        setIndex={setSelectedBillIndex}
      />
      {selectedBill !== null && (
        <BillList
          title={selectBillMsg}
          items={creditNotes.filter(
            (creditNote) => creditNote.reference === selectedBill.id
          )}
          usdToClp={usdToClp}
          setSelectItem={setSelectedCreditNote}
          setIndex={() => {}}
          lastColMsg={"inv_" + selectedBillIndex}
        />
      )}
      {selectedCreditNote !== null && (
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
