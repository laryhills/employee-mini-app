import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function MuiCheckbox(props) {
  
  const {name, label, value, onChange} = props

  const convertToDefEventPara = (name, value) => ({
    target:{
      name, value
    }
  })
  
  return (
    <FormControl>
      <FormControlLabel
        label={label}
        control = {<Checkbox
          color="primary"
          name={name}
          checked={value}
          onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />}
        />
    </FormControl>
    
  )
}
