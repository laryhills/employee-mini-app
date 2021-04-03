import { withStyles } from "@material-ui/core/styles";

// withStyles & makeStyles

const style = {
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '320px',
    height: '100%',
    backgroundColor: '#253053',

  //    min-height: '100vh'
  // margin-left: '-15rem'
  // -webkit-transition: margin .25s ease-out;
  // -moz-transition: margin .25s ease-out;
  // -o-transition: margin .25s ease-out;
  // transition: margin .25s ease-out;
  }
}


const SideMenu = (props) => {

  const { classes } = props

  return (
    <div className={classes.sideMenu}>
      sidebar
    </div>
  )
}

export default withStyles(style)(SideMenu)

