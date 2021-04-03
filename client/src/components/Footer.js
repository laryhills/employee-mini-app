import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme =>({
  footer:{
    marginTop: theme.spacing(1),
    textAlign : "center"
  },
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            <p>Copyright &copy; 2021</p>
            <Link to='/about'>About</Link>
        </footer>
    )
}

export default Footer
