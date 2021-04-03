import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Controls from "./controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(theme =>({
  dialogWrapper : {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle : {
    paddingRight: 0
  }
}))

export default function Popup(props) {

  const {title, children, openPopup , setOpenPopup} = props
  const classes = useStyles()

  return (
    <Dialog open={openPopup} transitionDuration={0.01} TransitionComponent={Collapse} maxWidth="md" classes={{ paper:classes.dialogWrapper}}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{display:'flex'}}>
          <Typography variant="h6" component="div" style={{flexGrow:1}}>{title}</Typography>
          <Controls.MuiActionButton
            color = "secondary"
            onClick = { () => setOpenPopup(false) }
          >
            <CloseIcon/>
          </Controls.MuiActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers >
        {children}
      </DialogContent>
    </Dialog>
  )
}
