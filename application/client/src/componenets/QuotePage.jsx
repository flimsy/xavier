import React, { PropTypes } from 'react';
import QuoteForm from './QuoteForm.jsx';
import Loading from './Loading.jsx';
import dataPresentation from './Loading.jsx';
import CircularProgress from 'material-ui/CircularProgress';

class QuotePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      FetchingData: false,
      dataFetched : false,
      response : '',
      errors: {},
        user: {
          ownerName: '',
          jetModel: '',
          seatCapacity: '',
          manDate: '',
          purPrice: '',
          brokEmail: ''
        }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
      isFetching: false,
      dataFetched : false
    });
  }

  handleFieldChange(event, index, value){
    const user = this.state.user;
    user['jetModel'] = value;
   this.setState({
     user,
     isFetching: false,
     dataFetched : false
   });
 }

 handleDateChange(event, date){
   const user = this.state.user;
   user['manDate'] = date;
  this.setState({
    user,
    isFetching: false,
    dataFetched : false
  });
}



  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
  const ownerName = (this.state.user.ownerName);
  const jetModel = (this.state.user.jetModel);
  const seatCapacity = (this.state.user.seatCapacity);
  const manDate = (this.state.user.manDate);

  const purPrice = (this.state.user.purPrice);
  const brokEmail = (this.state.user.brokEmail);

  const response = {};
  const context = this;
  const MODELS = ['Gulfstream G650', 'Cessna A-37 Dragonfly', 'Cessna Citation Encore'];

    context.setState( { FetchingData : true , dataFetched : false});


    fetch('/quotes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ownerName: ownerName,
      jetModel: MODELS[jetModel - 1],
      seatCapacity: seatCapacity,
      manDate: new Date(manDate).toISOString(),
      purPrice: purPrice,
      brokEmail: brokEmail
    })
    }).then(function(response) {
      return response.json();
    }).then(function(object) {
      console.log(object);
      context.setState( { FetchingData: false, dataFetched: true, response : object });
    } ).catch(function(error) {
    console.log(error);
    });

    // console.log('owner Name:', this.state.user.ownerName);
    // console.log('jet Model:', MODELS[jetModel - 1]);
    // console.log('seatCapacity:', this.state.user.seatCapacity);
    // console.log('Date:', new Date(this.state.user.manDate).toISOString());
    // console.log('Purchase Price:', this.state.user.purPrice);
    // console.log('Broker Email:', this.state.user.brokEmail);


}

  /**
   * Render the component.
   */
  render() {

    const isFetching = this.state.isFetching;
    const isFetched = this.state.dataFetched;
    const response = this.state.response;
    let output = null;

    if(isFetching) {
      output =  <Loading />;
    } else if(!isFetching && isFetched) {
      if(response.premium) {
        output = <Title><h1>Your premium is ${response.premium}. </h1></Title>
      } else {
        output = <Title><h1> We ran into some issues. <ul>{response.errors[0].reasons.map((error, index) => (<li key={index}> {error} </li>))} </ul></h1></Title>
      }
    } else {
      output = <QuoteForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          handleFieldChange={this.handleFieldChange}
          handleDateChange={this.handleDateChange}
          errors={this.state.errors}
          user={this.state.user}
        />;
      // output =  <Loading />;
    }
    return (

      <div>
        {output}
      </div>

    );
  }

}

const Title = (props) => (
    <div style={{
      fontSize: '30px',
      textAlign: 'center',
      paddingTop: '140px'
    }} {...props} />
)

export default QuotePage;
