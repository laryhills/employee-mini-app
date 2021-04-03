import { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import {useForm, Form} from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import * as employeeService from "../../services/employeeService";
import TextField from '@material-ui/core/TextField';
import axios from "axios"


const genderItems = [
  {id:"male", title:"Male"},
  {id:"female", title:"Female"},
]

//initial form values
const initialValues = {
  id:0,
  fullName:'',
  email:'',
  mobile:'',
  city:'',
  gender:'male',
  departmentId:'',
  hireDate: new Date(),
  isPermanent: false,
}

const EmployeeForm = (props) => {

  const { addOrEdit, recordForEdit } = props

  const validate = (fieldValues = values) =>{
    let temp = {...errors}
    if('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This Field is required."
    if('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    if('mobile' in fieldValues)
      temp.mobile = (/^[0-9]{11}$/).test(fieldValues.mobile) ? "" : "Mininum/Max 11 numbers required."
    if('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId !== "" ? "" : "This Field is required."
    
    setErrors({
      ...temp //save new to previous errors
    })
    if(fieldValues === values)
      return Object.values(temp).every(x => x === "") //returns collection of values, every -> says if any element is empty return false
  }

  //get Department
  const [dept, setDept] = useState([]);
  useEffect(() => {
    axios("http://localhost:4000/dept")
      .then((response) => {
        setDept(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
      // setLoading(false);
      });
    }, []);

  


  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm
  } = useForm(initialValues, true, validate) //making real-time validations

  const handleSubmit = e => {
    e.preventDefault()

    //validate form
    if(validate()){

      //store formData
     addOrEdit(values, resetForm)

    
    }
     
  }

  useEffect(() => {
    if(recordForEdit != null)
      setValues({
        ...recordForEdit
      })
  }, [recordForEdit])
  

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={6}>
        {/*for creating reuseable components*/}
          <Controls.MuiInput 
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange ={handleInputChange}
            error={errors.fullName}
          />
          <TextField
            variant="outlined"
            label="Email"
            // type="email"
            name="email"
            value={values.email}
            onChange ={handleInputChange}
            {...(errors.email && {
              error:true,
              helperText:errors.email
            })}
            // required
            autoComplete="email"
          />
          <Controls.MuiInput 
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange ={handleInputChange}
            error={errors.mobile}
          />
          {/* From Backend */}
          <Controls.MuiInput 
            label="City"
            name="city"
            value={values.city}
            onChange ={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>          
            <Controls.MuiRadioGroup
              name="gender"
              label="Gender"
              onChange ={handleInputChange}
              value={values.gender}   
              items={genderItems}           
            />
            <Controls.MuiSelect
              name="departmentId"
              label="Department"
              onChange ={handleInputChange}
              value={values.departmentId} 
              // options={employeeService.getDepartmentCollection()}
              options={dept}
              error={errors.departmentId}
            />
            <Controls.MuiDatePicker
              name="hireDate"
              label="Hire Date"
              value={values.hireDate}
              onChange ={handleInputChange}
            />
            <Controls.MuiCheckbox
              name="isPermanent"
              label="Permanent Employee"
              onChange ={handleInputChange}
              value={values.isPermanent} 
            />
            <div>
              <Controls.MuiButton
                type="submit"
                text="Submit"
                // onClick={}
              />
              <Controls.MuiButton
                color="default"
                type="reset"
                text="Reset"
                onClick={resetForm}
              />
            </div>
        </Grid>
      </Grid>
    </Form>
  )
}

export default EmployeeForm
