import './App.css';
import SideMenu from '../components/SideMenu'
import { createMuiTheme , makeStyles, ThemeProvider } from "@material-ui/core/styles/"
import Header from '../components/Header'
import Employees from '../pages/Employees/Employees'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from '../components/Footer'
import About from '../components/About'
import Excel from '../pages/Excel'


const theme = createMuiTheme ({
  palette:{
    primary: {
      main : "#333996",
      light : "#3c44b126"
    },
    secondary: {
      main : "#f83245",
      light : "#f8324526"
    },
    background: {
      default: "#f4f5fd"
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    // paddingLeft: '320px',
    width: '100%',
  }
})

function App() {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
      {/* <SideMenu /> */}
      <div className={classes.appMain}>
        <Header/>
        <Route exact path='/'  render={(props) => (
          <Grid container>
            <Grid item xs={12} md={12}>
              <Employees/>
            </Grid>
          </Grid>
        )}/>
        <Route path='/about' component={About}/>
        <Route path='/excel' component={Excel}/>
        <Footer />      
      </div>
      <CssBaseline/>
    </ThemeProvider>
    </Router>
    
  );
}

export default App;
