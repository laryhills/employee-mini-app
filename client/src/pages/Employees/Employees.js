import { useState, useEffect } from "react";
import axios from "axios"
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useTable } from "../../components/useTable";
import Popup from "../../components/Popup";
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import LinearProgress from "@material-ui/core/LinearProgress"
import Toolbar from "@material-ui/core/Toolbar"
import InputAdornment from "@material-ui/core/InputAdornment"
import DateFnsAdapter from '@date-io/date-fns';
import Controls from "../../components/controls/Controls";
import Search from "@material-ui/icons/Search"
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog"

const useStyles = makeStyles(theme =>({
  pageContent:{
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  root: {
    width:"100%",
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  tbl: {
    textTransform: "capitalize"
  },
  searchInput:{
    width:"50%"
  },
  newButton:{
    position:"absolute",
    right: "10px"
  }
}))

const headCells = [
  {id: "fullName", label: "Employee Name"},
  {id: "email", label: "Email"},
  {id: "mobile", label: "Mobile Number", disableSorting: true},
  {id: "city", label: "City"},
  {id: "department", label: "Department"},
  {id: "gender", label: "Gender"},
  {id: "hireDate", label: "Date Hired"},
  {id: "isPermanent", label: "Permanent Employee"},
  {id: "actions", label: "Actions", disableSorting: true}
]

const d = new DateFnsAdapter()

const Employees = () => {

const classes = useStyles()

  

const [recordForEdit, setRecordForEdit] = useState(null);
const [records, setRecords] = useState([]);
const [loading, setLoading] = useState(true);
const [filterFn, setFilterFn] = useState({fn:items => {return items}});
const [openPopup, setOpenPopup] = useState(false);
const [notify, setNotify] = useState({isOpen:false, message:"", type:""});
const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:"", subTitle:"", id:""});


const getAllEmployees = async () => {
  await axios("http://localhost:4000/employees")
    .then((response) => {
      setRecords(response.data);
      setLoading(false);
    })
    .catch((error) => {
      if(error.response){
        console.error("Error fetching data: ",error.response.data.message)
      }
      setLoading(true);
  });
}

//Get ALL Employees on pageLoad
  useEffect(() => {
    getAllEmployees()      
   }, []);

  // Using Re-usable Component Table
  const { //destructed
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } =  useTable(records, headCells, filterFn )

  // const {} = Popup

  const handleSearch = e =>{
    let target = e.target
    setFilterFn({
      fn:items => {
        if(target.value === "")
          return items
        else
          return items.filter(x => x.fullName.toLowerCase().includes(target.value))
      }
  })
  }

  const addOrEdit = (employee, resetForm) => {

    // Determine Operation
    if(employee.id === 0)
      // Add Employee
      axios.post("http://localhost:4000/employees", employee)
        .then((response) => {           
          //reload data for new entry
          getAllEmployees() 

          //close Dialog
          setOpenPopup(false)
          
          //reset Form
          resetForm()
          
          //notifcation
          setNotify({
            isOpen:true,
            message: 'New Record Submitted Successfully',
            type: 'success'
          })
        })
        .catch((error) => {
        console.error("Error saving data: ", error);
        // setError(error);
        })
        .finally(() => {
        // setLoading(false);
      });
     else
      // Update Employee
      axios.put(`http://localhost:4000/employees/${employee.id}`, employee)
        .then((response) => { 
          //reload data for new entry
          getAllEmployees()
          
          //reset edit/form
          setRecordForEdit(null)

          //close Dialog
          setOpenPopup(false)        
          
          //notifcation
          setNotify({
            isOpen:true,
            message: 'Record Updated Successfully',
            type: 'success'
          })
        })
        .catch((error) => {
        console.error("Error saving data: ", error);
        // setError(error);
        })
        .finally(() => {
        // setLoading(false);
      });

  }

  const openInPopup = record => {
    setRecordForEdit(record)
    setOpenPopup(true)
  }

  const onDelete = id => {
    // if(window.confirm('Are you sure to delete this record?')) {
      //close Dialog
      setConfirmDialog({isOpen:false, title:"", subTitle:"", id:""})
      
      axios.delete(`http://localhost:4000/employees/${id}`)
      .then((response) => { 
        //reload data for new entry
        getAllEmployees()         
        
        //notifcation
        setNotify({
          isOpen:true,
          message: 'Record Deleted Successfully',
          type: 'error'
        })
      })
      .catch((error) => {
      console.error("Error saving data: ", error);
      // setError(error);
      })
      .finally(() => {
      // setLoading(false);
    });
    // }
    
  }

  return (
    <>
      <PageHeader
        title="New Employee"
        subTitle="Form design with Validation"
        icon = {<PeopleOutlineTwoToneIcon fontSize="large"/>}
      />
      <Paper className={classes.paperContent}>
        {loading ? (<div className={classes.root}><LinearProgress/> </div>) : 
          (
            <>
            <Toolbar>
              <Controls.MuiInput
                className={classes.searchInput}
                label="Search Employees"
                InputProps = {{
                  startAdornment:(
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>)
                }}
                onChange={handleSearch}
              />

              <Controls.MuiButton
                className = {classes.newButton}
                text = "Add New"
                variant = "outlined"
                startIcon = {<AddIcon/>}
                onClick =  {() => { setOpenPopup(true);setRecordForEdit(null)}}
              />
            </Toolbar>
            <TblContainer >
              <TblHead/>
              <TableBody>
                { recordsAfterPagingAndSorting().map(
                    record => 
                      (
                        <TableRow key={record.id}>
                          <TableCell className={classes.tbl}>{record.fullName}</TableCell>
                          <TableCell>{record.email}</TableCell>
                          <TableCell className={classes.tbl}>{record.mobile}</TableCell>
                          <TableCell className={classes.tbl}>{record.city}</TableCell>
                          <TableCell>{record.title}</TableCell>
                          <TableCell className={classes.tbl}>{record.gender}</TableCell>
                          <TableCell>{d.format(Date.parse(record.hireDate), "dd/MMM/yyyy")}</TableCell>
                          <TableCell>{record.isPermanent === true ? "Yes" : "No"}</TableCell>
                          <TableCell>                          
                            <Controls.MuiActionButton
                              color = "primary"
                              onClick={() => {openInPopup(record)}} >
                                <EditOutlinedIcon fontSize="small" />                              
                            </Controls.MuiActionButton>
                            <Controls.MuiActionButton
                              color = "secondary"
                              onClick = { () => 
                              // onDelete(record.id)
                              setConfirmDialog({
                                isOpen:true,
                                title:`Are you sure to delete ${record.fullName}'s record?`,
                                subTitle:"You can't undo this operation",
                                // id:`${record.id}`
                                onConfirm: () => {onDelete(record.id)}
                              }) 
                              } 
                              > {/* use () => is you are passing a value to onCLick */}
                                <CloseIcon fontSize="small" />                              
                            </Controls.MuiActionButton>                            
                          </TableCell>
                        </TableRow>
                      )
                  )
                }
              </TableBody>
            </TblContainer>
            <TblPagination/>
            </>
          ) 
        }
      </Paper>
      <Popup
        title = "Employee Form"
        openPopup = {openPopup}
        setOpenPopup = {setOpenPopup}
      >
        <EmployeeForm
          recordForEdit={recordForEdit}          
          addOrEdit={addOrEdit}
        />
      </Popup>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>    
  )
}

export default Employees
