import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/config';

export default class Payment extends Component {
  state = {
    patient: '',
    amountMoney: 0,
    paymentType: ''
  };
  changeHandle = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  componentDidMount() {
    this.setState({
      patient: this.props.location.state.patient
    });
  }
  handleSubmit = e => {
    e.preventDefault();

    const payment = {
      patientId: this.state.patient._id,
      amountMoney: this.state.amountMoney,
      paymentType: this.state.paymentType,
      name: this.state.patient.name,
      surname: this.state.patient.surname
    };
    axios
      .post(BASE_URL+'/payments/add', payment)
      .then(res => console.log(res.data));

    this.setState({
      patient: '',
      amountMoney: 0,
      paymentType: ''
    });
    window.location = '/';
    
  };
  render() {
    const { amountMoney, paymentType, patient } = this.state;
    return (
      <div>
        <h3>Tahsilat</h3>
        <h5 className='red-text text-darken-3'>
          Hasta Adı : {patient.name} {patient.surname}
        </h5>

        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Tahsilat Tutarı : </label>
            <input
              type='number'
              id='amountMoney'
              className='form-control'
              onChange={this.changeHandle}
              value={amountMoney}
            />
            <label>Ödeme Tipi : </label>
            <select
              id='paymentType'
              onChange={this.changeHandle}
              className='form-control'
            >
              <option value='' disabled selected>
                Ödeme Tipi :
              </option>
              <option value='N'>Nakit</option>
              <option value='K'>Kredi Kartı</option>
            </select>
          </div>
          <div className='form-group'>
            <input type='submit' value='Kaydet' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}
