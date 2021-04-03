import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Controls from "./controls/Controls"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton"
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";


const useStyles = makeStyles(theme =>({
  dialog : {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogAction: {
    justifyContent: 'center'
  },
  titleIcon : {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover':{
      backgroundColor: theme.palette.secondary.light,
      color: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem'
    }
  }
}))


export default function ConfirmDialog(props) {

  const { confirmDialog, setConfirmDialog } = props

  const classes = useStyles()

  const handleClose = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen:false
    }) 
  }

  return (
    <Dialog open={confirmDialog.isOpen} transitionDuration={0.01} classes={{ paper:classes.dialog}}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.MuiButton
          text="No"
          color="default" 
          onClick= {handleClose}
          />
        <Controls.MuiButton
          text="Yes"
          color="secondary" 
          onClick={confirmDialog.onConfirm}
          />          
      </DialogActions>
      
    </Dialog>
  )
}
