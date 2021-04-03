import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import InputBase from '@material-ui/core/InputBase';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SearchIcon from '@material-ui/icons/Search';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
  root: {
    backgroundColor: '#fff',
    transform: 'translateZ(0)'
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover":{
      backgroundColor: "#f2f2f2"
    },
    "& .MuiSvgIcon-root":{
      marginRight: theme.spacing(1) //*8
    }
  }
}))

const Header = () => {

  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container>
          <Grid item>
            <InputBase
              className={classes.searchInput}
              placeholder="Search"
              startAdornment={<SearchIcon fontSize="small"/>}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color="secondary" >
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton> 
            <IconButton> 
              <Badge badgeContent={4} color="secondary" >
                <ChatBubbleOutlineIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <PowerSettingsNewIcon fontSize="small"/>
            </IconButton> 
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
