import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { FaTrash } from 'react-icons/fa';

const styles = {
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
};

function QuotationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    let sum = 0;
    let totalDiscount = 0;
    
    const z = data.map((v, i) => {
      let discount = parseInt(v.dis);
      let amount = (v.qty * v.ppu) - v.dis;
      sum += amount;
      totalDiscount += discount ;
      return (
        <tr key={i}>
          <td><FaTrash onClick={() => deleteClick(i)}/></td>
          <td style={styles.textCenter}>{v.qty}</td>
          <td>{v.item}</td>
          <td style={styles.textRight}>{numberWithCommas(v.ppu)}</td>
          <td style={styles.textRight}>{numberWithCommas(discount)}</td>
          <td style={styles.textRight}>{numberWithCommas(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotalPrice(sum);
    setTotalDiscount(totalDiscount);
  }, [data]);

  const deleteClick = (i) => {
    data.splice(i,1)
    setDataItems([...data])
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="table-heading">Quotation</h1>
        </Col>
        <Col style={styles.textRight}>
          <Button onClick={clearTable} variant="btn btn-primary btn2">
            Clear
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th></th>
            <th>Qty</th>
            <th>Item</th>
            <th>Price/Unit</th>
            <th>Discount</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <th colSpan={3}></th>
            <th style={styles.textCenter}>Total</th>
            <th style={styles.textRight}>{numberWithCommas(totalDiscount)}</th>
            <th style={styles.textRight}>{numberWithCommas(totalPrice)}</th>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
