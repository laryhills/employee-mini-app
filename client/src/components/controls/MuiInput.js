import TextField from '@material-ui/core/TextField';

export default function MuiInput(props) {
  
  const {name, label, error=null, value, onChange, ...other} = props
  return (
    <TextField
      variant="outlined"
      label={label}
      // type={type}
      name={name}
      value={value}
      onChange ={onChange}
      {...other}
      // required ---using created validated function
      {...(error && {error:true,helperText:error
      })}
    />
  )
}
