import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuotationTable from "./QuotationTable";
import Header from "./components/Header";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import useLocalStorage from 'react-localstorage-hook'

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();

  // const [dataItems, setDataItems] = useState([]);
  const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);

  const ProductList = [
    { id: "p001", name: 'Gigabyte Aorus 15P YD"', price: 65000, discount: 3000 },
    { id: "p002", name: "MSI GP66 Leopard", price: 60000, discount: 2000 },
    { id: "p003", name: "Razer Blade 15", price: 55000, discount: 1500 },
    { id: "p004", name: "AUSU ROG G14", price: 53000, discount: 1000 },
  ];

  const addItem = () => {
    if (itemRef.current.value == "") {
      alert("Item name is empty");
      return;
    }

    const pid = itemRef.current.value;
    const product = ProductList.find((e) => e.id === pid);

    var itemObj = {
      pid: pid,
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      dis: disRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);   
  };

  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = ProductList.find((e) => e.id === pid);
    ppuRef.current.value = product.price
    disRef.current.value = product.discount
  }

  const options = ProductList.map((v) => {
    return <option value={v.id}>{v.name}</option>;
  });

  return (
    <Container>
      <Header />
      <Row>
        <Col xs={5} className="form">
          <Form>
            <Form.Group className="form-group" controlId="formItem">
              <Form.Label className='label'>Item</Form.Label>
              <Form.Select
                className='form-control size'
                aria-label="Default select example"
                ref={itemRef}
                onChange={productChange}>
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="formPrice">
              <Form.Label className='label'>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price Per Unit"
                ref={ppuRef}
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="formQauntity">
              <Form.Label className='label'>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Quantity" ref={qtyRef} />
            </Form.Group>

            <Form.Group className="form-group" controlId="formDiscount">
              <Form.Label className='label'>Discount</Form.Label>
              <Form.Control type="number" placeholder="Discount" ref={disRef}/>
            </Form.Group>

            <center>
            <Button variant="btn btn-primary btn1" onClick={addItem} class='btn btn-primary'>
              Add
            </Button>
            </center>
          </Form>
        </Col>
        <Col>
          <QuotationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
