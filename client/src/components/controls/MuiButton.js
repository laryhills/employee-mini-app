import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
  root:{
      margin: theme.spacing(0.5)
    },
  label:{
      textTransform:'none'
  }
}))

export default function MuiButton(props) {

  const {text, size, color, variant, onClick, ...other} = props

  const classes = useStyles()

  return (
    <Button 
      classes={{root:classes.root, label:classes.label}}
      variant={variant || "contained"}
      color={color || "primary"}
      onClick={onClick}
      size={size|| "large"}
      {...other}
    >
      {text}
    </Button>
  )
}
