import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const QuoteForm = ({
  onSubmit,
  onChange,
  handleFieldChange,
  handleDateChange,
  errors,
  user
}) => (
  <Card className="container" style={{paddingBottom: '150px'}}>
    <form action="/" onSubmit={onSubmit}>
      <Title>
        <h2 className="card-heading">Get a Quote instantly!</h2>
      </Title>
     {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Owner Name"
          name="ownerName"
          errorText={errors.ownerName}
          onChange={onChange}
          value={user.ownerName}
          style={{marginLeft: '45%'}}
        />
      </div>

      <div className="field-line">
      <SelectField
          floatingLabelText="Jet Model"
          value={user.jetModel}
          selectedIndex={user.jetModel}
          name="jetModel"
          onChange={handleFieldChange}
          errorText={errors.jetModel}
          style={{marginLeft: '45%'}}
        >
          <MenuItem value={1} primaryText="Gulfstream G650" />
          <MenuItem value={2} primaryText="Cessna A-37 Dragonfly" />
          <MenuItem value={3} primaryText="Cessna Citation Encore" />
        </SelectField>
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Jet Seat Capacity"
          name="seatCapacity"
          onChange={onChange}
          errorText={errors.seatCapacity}
          value={user.seatCapacity}
          style={{marginLeft: '45%'}}
        />
      </div>

      <div className="field-line">
          <DatePicker
            hintText="Manufacturing Date"
            mode="landscape"
            value={user.manDate}
            onChange={handleDateChange}
            style={{marginLeft: '45%'}}
             />
      </div>


      <div className="field-line">
        <TextField
          floatingLabelText="Purchase Price"
          name="purPrice"
          onChange={onChange}
          errorText={errors.purPrice}
          value={user.purPrice}
          style={{marginLeft: '45%'}}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Broker Email"
          name="brokEmail"
          onChange={onChange}
          errorText={errors.brokEmail}
          value={user.brokEmail}
          style={{marginLeft: '45%'}}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Fetch Quote" primary style={{marginLeft: '48%'}}/>
      </div>

    </form>
  </Card>
);

QuoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const Title = (props) => (
    <div style={{
      fontSize: '30px',
      textAlign: 'center',
      paddingTop: '140px'
    }} {...props} />
)

const formContainer = (props) => (
    <div style={{
      margin: 'auto',
      width: '50%'
    }} {...props} />
)

export default QuoteForm;
