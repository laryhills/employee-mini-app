import React, { useState } from "react"
import Popup from "../Popup"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Controls from "../../components/controls/Controls"
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select
} from "@material-ui/core"
import GetAppIcon from '@material-ui/icons/GetApp'
import { arrayToExcel } from "./ArrayToExcel";
import cloneDeep from "lodash.clonedeep";

const ArrayToExcelButton = ({ apiArray, fileName, buttonTitle }) => {

  const [showDownloadModal, setShowDownloadModal] = useState(false); //const [openPopup, setOpenPopup] = useState(false);
  const [columnsType, setColumnsType] = useState("0");
  const [selectedColumns, setSelectedColumns] = useState([]);

  const totalColumns = apiArray ? Object.keys(apiArray[0]).length : "";

  //get columns selected
  // const updateSelectedColumns = (e, column) => {
  //   if (e.target.checked) {
  //       setSelectedColumns([...selectedColumns, column]);
  //   } else {
  //       setSelectedColumns(selectedColumns.filter(value => value !== column));
  //   }
  // }
  const updateSelectedColumns = (checked, column) => {
    if (checked) {
        setSelectedColumns([...selectedColumns, column]);
    } else {
        setSelectedColumns(selectedColumns.filter(value => value !== column));
    }
  }

  const apiArrayToExcel = () => {
    if (columnsType === "1") {
        arrayToExcel.convertArrayToTable(apiArray, fileName)
    } else {
        const customArray = cloneDeep(apiArray);
        customArray.map(obj => Object.keys(obj).forEach((key) => {
          if (!selectedColumns.includes(key)) {
            delete obj[key];
          }
        }))
        arrayToExcel.convertArrayToTable(customArray, fileName)
        setSelectedColumns([]);
    }
  }

  const handleSelect = e => {setColumnsType(e.target.value)}
  // const handleCheckbox = (checked, name) => {console.log((checked + name))}
  

  return (
    <>
    {(apiArray.length > 0 && apiArray !== undefined) &&
      <>
        <Controls.MuiButton
          text = {buttonTitle}
          startIcon = {<GetAppIcon/>}
          onClick={() => setShowDownloadModal(true)}
        />
        {/* <Popup
                title = "Employee Form"
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
              >
                <EmployeeForm
                  recordForEdit={recordForEdit}          
                  addOrEdit={addOrEdit}
                />
            </Popup> */}      
        {showDownloadModal &&              
          <Dialog open={showDownloadModal} onClose={() => setShowDownloadModal(false)}>
            {/* <DialogOverlay /> */}
            <DialogTitle>{buttonTitle}</DialogTitle>
            <DialogContent>
                {/* <DialogCloseButton /> */}
                {/* <DialogBody> */}
              <p style={{ marginBottom: "10px" }}>Select Download Type: </p>
              <Select onChange={handleSelect}  value={columnsType}>
                  <MenuItem value={0} disabled selected> Select an Option</MenuItem>
                  <MenuItem value="1">All Columns({totalColumns})</MenuItem>
                  <MenuItem value="2">Custom</MenuItem>
              </Select>
                {columnsType === "1" &&
                  <p style={{ marginTop: "20px" }}>
                      {Object.keys(apiArray[0]).map((key, index) => {
                          return (
                              <span key={index}>{(key)}, </span>
                          )
                      })}
                  </p>
                }
                {columnsType === "2" &&
                  <div style={{ display: "flex", flexWrap: "wrap", width: "100%", marginTop: "20px" }}>
                    {Object.keys(apiArray[0]).map((key, index) => {
                      return (
                        <div key={index} style={{ display: "flex", alignItems: "center", width: "33.3%" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                name={key}
                                onChange={(e) => {updateSelectedColumns(e.target.checked, key)} }
                              />
                            }
                            label={key}
                          />
                        </div>
                      )
                    })}
                  </div>
                }
              </DialogContent>

              <DialogActions>
                <Button mr={3} onClick={() => setShowDownloadModal(false)}>
                  Cancel
                </Button>
                <Controls.MuiButton
                  color="primary"
                  text = "Download"
                  onClick={apiArrayToExcel}
                />
              </DialogActions>
            {/* </ModalContent> */}
        </Dialog>
    }
      </>
  }

  </>
  )
  }

  export default ArrayToExcelButton;