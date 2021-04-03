import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';


export default function MuiSelect(props) {

  const {name, label, value, onChange, options, error=null} = props

  return (
    <FormControl
      variant="outlined"
      {...(error && {
        error:true
      })}
    >
    <InputLabel>{label}</InputLabel>
    <Select
      label={label}
      name={name}
      value={value}
      onChange={onChange} 
    >
      <MenuItem disabled={true} value=''><em>None</em></MenuItem>      
       {/* options.length > 0 ?  */}
       { options.map(
          (option, index) => (            
            <MenuItem key={index} value={option.id}>{option.title}</MenuItem>
          ) )}
        {/* ) : " "       */}
    </Select>      
    {error && 
      <FormHelperText>{error}</FormHelperText>
    }
    </FormControl>
  )
}
