import axios from "axios"
//backend API
const KEYS = {
  employees:"employees",
  employeeId: "employeeId"
}

export const getDepartmentCollection = () => ([
// export function getDepartmentCollection() {
  {id: '1', title: 'Development'},
  {id: '2', title: 'Marketing'},
  {id: '3', title: 'Accounting'},
  {id: '4', title: 'HR'}
])

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) == null) //check if local storage is occupied
    localStorage.setItem(KEYS.employeeId, '0')
  var id = parseInt(localStorage.getItem(KEYS.employeeId))
  localStorage.setItem(KEYS.employeeId, (++id).toString())
  return id
}

export function insertEmployee(data) {
  let employees = getAllEmployees()
  data['id'] = generateEmployeeId()
  employees.push(data)
  localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function deleteEmployee(id){
  let employees = getAllEmployees()
  employees  = employees.filter(x => x.id !== id)
  localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function updateEmployee(data) {
  let employees = getAllEmployees() //get all employees
  let recordIndex = employees.findIndex(x => x.id === data.id) //get single emp by id
  employees[recordIndex] = {...data} // update  employee with new data
  localStorage.setItem(KEYS.employees,JSON.stringify(employees)) //update all employees
}

export function getAllEmployees() {
  // if (localStorage.getItem(KEYS.employees) == null)
  //   localStorage.setItem(KEYS.employees, JSON.stringify([]))
  // let employees =  JSON.parse(localStorage.getItem(KEYS.employees))
  // let departmennts = getDepartmentCollection();
  // return employees.map(x => ({
  //   ...x,
  //   department: departmennts[x.departmentId - 1].title
  // }))  
  let data = [];
  axios("http://localhost:4000/dept")
    .then((response) => {
      data = response.data
      return data
    })
    .catch((error) => {
    console.error("Error fetching data: ", error);
    // setError(error);
    })
    .finally(() => {
    // setLoading(false);
  })
}