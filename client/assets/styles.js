import { grey800 } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';


export default {
  tab: {
    background: 'rgba(255, 255, 255, .1)'
  },
  headline: {
    fontSize: 24,
    fontWeight: 400,
    background: 'rgba(0, 0, 0, 1)'
  },
  deleteButton: {
    backgroundColor: 'crimson'
  },
  Avatar: {
    width: '200px',
    height: '200px',
    position: 'relative',
    top: 0,
    fontSize: '100px',
    background: 'white'
  },
  formStyle: {
    margin: 15,
    color: 'white',
  },
  button: {
    margin: 1,
    width: '',
    display: 'inline-block',
    position: 'relative',
  },
  formElement: {
    margin: 5,
  },
  dashboardInfoContent: {
    padding: '5px 10px',
    marginLeft: 50,
    height: 40
  },
  dashboardInfoNumber: {
    display: 'block',
    fontWeight: typography.fontWeightMedium,
    fontSize: 18,
    color: grey800
  },
  text: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: grey800
  },
  icon: {
    height: 30,
    width: 48,
    marginTop: 10,
    maxWidth: '100%'
  },
  documentStack: {
    width: '100%',
    margin: 5,
    marginBottom: 25,
    padding: 5,
    textAlign: 'center',
    display: 'inline-block',
  },
  selectDocuments: {
    background: 'white',
    height: 10,
    padding: 10,
    paddingBottom: 30,
    color: 'black',
  },
  selectDocumentsButton: {
    color: 'black',
    marginTop: 0,
  },
  toolbar: {
    background: 'transparent'
  },
  paper: {
    display: 'inline-block',
    width: '100%'
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  sideAvatar: {
    width: '70px',
    margin: '0 auto',
    position: 'relative',
    top: 0,
    bottom: '20px',
    height: '70px',
    fontSize: '50px',
    background: 'white'
  }
};
