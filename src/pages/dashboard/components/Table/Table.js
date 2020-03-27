import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { Button } from "../../../../components/Wrappers";
import moment from 'moment';

// const states = {
//   true: "success",
//   false: "warning",
//   declined: "secondary",
// };

export default function TableComponent(props) {
  let {data,offset,onRowClick,onDeleteClick,onDisable}=props;
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell >S. NO.</TableCell>
          <TableCell >email</TableCell>
          <TableCell >createdAt</TableCell>
          {/* <TableCell >RATING</TableCell> */}
          <TableCell >ACTION</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data.map((tempdata, index) => (
            <TableRow key={index}>
              <TableCell className="pl-3 fw-normal">{offset + index + 1}</TableCell>
              <TableCell className="pl-3 fw-normal">{tempdata.email}</TableCell>
              <TableCell>{moment(new Date(parseInt(tempdata.createdAt))).utcOffset("+05:30").format("YYYY-MM-DD HH:mm")}</TableCell>
              {/* <TableCell>{tempdata.rating}</TableCell> */}
              <TableCell>
                <Button
                  color="success"
                  size="small"
                  className="px-2"
                  variant="contained"
                  style={{marginRight:'5px'}}
                  onClick={()=>onRowClick(tempdata)}
                >
                More Details..
              </Button>

              <Button
                  color={tempdata.isDisableByAdmin?"warning":"success"}
                  size="small"
                  className="px-2"
                  variant="contained"
                  style={{marginRight:'5px'}}
                  onClick={()=>onDisable(tempdata)}
                >
                {tempdata.isDisableByAdmin?'Disable':'Enable'}
              </Button>
              <Button
                  color={tempdata.verificationStatus?"warning":"success"}
                  size="small"
                  className="px-2"
                  variant="contained"
                  style={{marginRight:'5px'}}
                  onClick={()=>onDeleteClick(tempdata)}
                >
               {tempdata.verificationStatus?'Verify Email':'Verified'} 
              </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
