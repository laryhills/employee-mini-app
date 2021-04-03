import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";


export default function MuiRadioGroups(props) {  
  
  const {name, label, value, onChange, items} = props

  return (
  
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <RadioGroup
      row
      name={name}
      value={value}
      onChange={onChange}
    >
    {
      items.map(
        (item, index) => (
          <FormControlLabel key={item.id} value={item.id}  control={<Radio />} label={item.title} />
        )
      )
    }
    
    </RadioGroup>
    </FormControl>
  )
}
