import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
//import { Button } from "../../../../components/Wrappers/Wrappers";
import moment from 'moment';


export default function TableComponent(props) {
  let {data}=props;
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell >S. NO.</TableCell>
          <TableCell >TxId</TableCell>
          <TableCell >TIME</TableCell>
          <TableCell >TYPE</TableCell>
          <TableCell >AMOUNT</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data.map((tempdata, index) => (
            <TableRow key={index}>
              <TableCell className="pl-3 fw-normal">{index + 1}</TableCell>
              <TableCell className="pl-3 fw-normal">{tempdata.txid}</TableCell>
              <TableCell>{moment(new Date(parseInt(tempdata.time*1000))).utcOffset("+05:30").format("YYYY-MM-DD HH:mm")}</TableCell>
              <TableCell>{tempdata.category}</TableCell>
              <TableCell>{tempdata.amount}</TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
