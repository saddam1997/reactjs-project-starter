import React, { Component } from 'react';
import {
  Grid,
  Button,
  Typography,
  CssBaseline,
  TextField,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Box,
  Container,
 } from "@material-ui/core";
import { connect } from 'react-redux';
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";
import { userActions } from '../../_actions';
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { withRouter } from "react-router";
import CloseIcon from '@material-ui/icons/Close';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    width: 300,
  },
  button: {
    margin: theme.spacing(3),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
const theme = createMuiTheme();

class User extends Component {

  constructor(props) {
    super(props);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onDisable = this.onDisable.bind(this);
    this.state = {
      markers: [],
      places: [],
      offset: 0,
      size: 10,
      page: 1,
      email: '',
      restaurantModal: false,
      submitted: false,
      keyWord: '',
      formData: {
        "name": "",
        "address": "",
        "lat": "",
        "desc": "",
        "long": "",
        "mobile": "",
        "paymentInformation": "",
        "rating": "",
        "logo": "",
        "openTime": "",
        "closeTime": "",
        "countryCode": "",
        "type": ""
      }
    }
  }
  componentDidMount() {
    let data = {
      "keyWord": "",
      "pageNo": 1,
      "size": this.state.size
    }
    console.log(data);
    
    this.props.dispatch(userActions.getAllUser(data));
  }
  static getDerivedStateFromProps(nextProps, prevState) {

    if(nextProps.users.addUserSuccess){
      return {
        ...nextProps,
        formData:{"name": "",
        "address": "",
        "lat": "",
        "desc": "",
        "long": "",
        "mobile": "",
        "rating": "",
        "logo": "",
        "paymentInformation": "",
        "openTime": "",
        "closeTime": "",
        "countryCode": "",
        "type": ""},
        restaurantModal:false,
      }
    }else{
      return{
        ...nextProps
      }
    }
    
  }
   handleClick = (offset, page)=> {
    console.log(offset, page);
    
    this.setState({ offset, page });
    
    let data = {
      "keyWord": this.state.keyWord,
      "pageNo": page,
      "size": this.state.size
    }
    this.props.dispatch(userActions.getAllRestaurant(data));
  }
  handleSearch(event) {
    event.preventDefault();
    let { value } = event.target;
    this.setState({ keyWord: value,offset:0 });
    let data = {
      "keyWord": value,
      "pageNo": 1,
      "size": this.state.size
    }
    this.props.dispatch(userActions.getAllRestaurant(data));
  }
  handleClickOpen() {
    this.setState({ restaurantModal: true });
  }
  handleClose() {
    //setOpen(false);
    this.setState({ restaurantModal: false });

  }
  handleChange = (event) => {
    const email = event.target.value;
    this.setState({ email });
  }
  handleChangeInput= (event) => {
    const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
  }
  handleSubmit = () => {

    //console.log();
    
    let { users } = this.props;
    let {filesDetails }=users;
    let reqData={
      "name": this.state.formData.name,
      "address": this.state.formData.address,
      "lat": this.state.formData.lat,
      "desc": this.state.formData.desc,
      "long": this.state.formData.long,
      "paymentInformation": this.state.formData.paymentInformation,
      "mobile": this.state.formData.mobile,
      "rating": "NA",
      "logo": filesDetails && filesDetails.uploadedImageName?filesDetails.uploadedImageName:"",
      "openTime": this.state.formData.openTime,
      "closeTime": this.state.formData.closeTime,
      "countryCode": "NA",
      "type": "NA"
    }
    this.props.dispatch(userActions.addRestaurant(reqData));
  }
  onChangeFile(event) {
    this.props.dispatch(userActions.uploadImage(event.target.files[event.target.files.length-1]));
  }
  onRowClick(data) {
      this.props.history.push(`/app/restaurants/${data.id}`)  
  }

  onDeleteClick(data) {
    console.log(data);
    let tempdata={
      "id": data.id,
      "keyWord": this.state.keyWord,
      "pageNo": this.state.page,
      "size": this.state.size

    }
    console.log("asdf :: ",tempdata);
    this.props.dispatch(userActions.deleteRestaurant(tempdata));
  }
  onDisable(data) {
    console.log(data);
    let tempdata={
      "id": data.id,
      "keyWord": this.state.keyWord,
      "pageNo": this.state.page,
      "size": this.state.size

    }
    console.log("asdf :: ",tempdata);
    this.props.dispatch(userActions.disableRestaurant(tempdata));
  }

  render() {
    
    let { users, classes } = this.props;
    let { items, total,filesDetails } = users;
    const { formData,submitted} = this.state;
    console.log("restaurantModal  ",this.state.restaurantModal);
    
    return (
      <>
        <PageTitle title="Users" />
        <Grid container >
          <Grid item xs={12}>
            <Widget >
              <Grid container >
                <Grid item xs={8} />
                <Grid item xs={3}>
                  <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    name="keyWord"
                    onChange={this.handleSearch}
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1}>
                  {false?<Button variant="contained" color="primary" onClick={() => this.handleClickOpen()} className={classes.button}>
                    Add
                  </Button>:null}
                </Grid>
              </Grid>

              {
                items && items.length > 0 ?
                  <>
                    <Table data={items} offset={this.state.offset} onRowClick={this.onRowClick} onDeleteClick={this.onDeleteClick} onDisable={this.onDisable}  />
                  </>
                  : <Typography >Data not found.</Typography>
              }
              {
                total && total > 10 ?
                  <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Pagination
                      limit={this.state.size}
                      offset={this.state.offset}
                      total={total}
                      onClick={(e, offset, page) => this.handleClick(offset, page)}
                    />
                  </MuiThemeProvider>
                  : null}
            </Widget>
          </Grid>
        </Grid>
        <Dialog fullScreen open={this.state.restaurantModal} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Add New User
            </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                Cancel
            </Button>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Add User
              </Typography>
             
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                   
                    <TextValidator
                      label="Name*"
                      fullWidth
                      onChange={this.handleChangeInput}
                      name="name"
                      id="name"
                      value={formData.name}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextValidator
                      label="Desciption*"
                      id="desc"
                      fullWidth
                      onChange={this.handleChangeInput}
                      name="desc"
                      value={formData.desc}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextValidator
                      label="address*"
                      id="address"
                      fullWidth
                      onChange={this.handleChangeInput}
                      name="address"
                      value={formData.address}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <TextValidator
                      label="mobile*"
                      id="mobile"
                      fullWidth
                      onChange={this.handleChangeInput}
                      name="mobile"
                      value={formData.mobile}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      />
                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextValidator
                      label="latitude*"
                      id="lat"
                      fullWidth
                      onChange={this.handleChangeInput}
                      name="lat"
                      value={formData.lat}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextValidator
                      label="longitude*"
                      id="long"
                      fullWidth
                      onChange={this.handleChangeInput}
                      name="long"
                      value={formData.long}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      />
                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextValidator
                      label="openTime*"
                      id="openTime"
                      fullWidth
                      onChange={this.handleChangeInput}
                      name="openTime"
                      value={formData.openTime}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      />
                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextValidator
                      label="closeTime*"
                      id="closeTime"
                      fullWidth
                      onChange={this.handleChangeInput}
                      name="closeTime"
                      value={formData.closeTime}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      />
                    
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <TextValidator
                      label="Payment information*"
                      id="paymentInformation"
                      fullWidth
                      onChange={this.handleChangeInput}
                      name="paymentInformation"
                      value={formData.paymentInformation}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      />
                    <Box textAlign="right" m={1}>
                                Payment method should comma seperated.
                              </Box>
                  </Grid>

                  <Grid item xs={12}>
                   <input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      onChange={this.onChangeFile}
                      type="file"
                    />
                    <label htmlFor="raised-button-file">
                      <Button variant="contained" color="primary" component="span" className={classes.button}>
                        Upload
                      </Button>
                    </label>  
                    <label >
                      {
                       filesDetails? <span>{filesDetails.uploadedImageName}</span>:null
                      }
                    </label>  
                  </Grid> 
                  <Grid item xs={12}></Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                    type="submit"
                    disabled={submitted}
                  className={classes.submit}
                >
                  Save
                </Button>
              </ValidatorForm>
            </div>
          </Container>
        </Dialog>
      </>
    );

  }
}
function mapStateToProps(state) {
  //console.log("state  ", state);
  const { loggingIn } = state.authentication;
  const { users } = state;
  return {
    loggingIn,
    users
  };
}
export default connect(mapStateToProps)(withStyles(styles)(withRouter(User)));
