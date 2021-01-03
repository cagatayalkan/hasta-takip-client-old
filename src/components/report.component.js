import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from '../config/config';

export default class Report extends Component {
  state = {
    searchReportDate: moment(new Date().toString()).format('YYYY-MM-DD'),
    payment: [],
    examiniation : [],
    patients :[],
    examiniationFee : []
  };

  componentDidMount() {
    axios
      .get(BASE_URL+'/payments')
      .then((response) => {
        this.setState({ payment: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(BASE_URL+'/examiniations/' )
      .then((response) => {
        this.setState({ examiniation: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get(BASE_URL+'/patients/')
      .then(response => {
        this.setState({ patients: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get(BASE_URL+'/examiniationFee')
      .then(response => {
        this.setState({ examiniationFee: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  changeHandle = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
    console.log([e.target.id], e.target.value);
  };
  handleShowExamClick = (key, e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/profile',
      state: {
        patient: key,
      },
    });
  };
  render() {
    const { searchReportDate, payment ,examiniation , patients  , examiniationFee} = this.state;
    let cashTotal = 0,
      creditTotal = 0;
    return (
      <div>
        <div className='dashboard'>
          <div className='row'>
            <div className='input-field'>
              <div className='card-panel z-depth-2 blue lighten-3 center'>
                <span>Rapor Tarihi</span>
              </div>
              <input
                type='date'
                id='searchReportDate'
                data-date-format='MMDDYYYY'
                defaultValue={searchReportDate}
                onChange={this.changeHandle}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col s12 m6'>
              <div className='card-content grey-text text-darken-3'>
                <div className='card-panel z-depth-2 blue lighten-3 center'>
                  <span>Ödemeler</span>
                </div>
              </div>
              <div>
                {payment &&
                  payment.map((payment) => {
                    if (payment.createDate === searchReportDate) {
                      if (payment.paymentType === 'N')
                        cashTotal += parseInt(payment.amountMoney);
                      else creditTotal += parseInt(payment.amountMoney);
                      return (
                        <ul className='collection' key={payment._id}>
                          <li className='collection-item'>
                            <span className='red-text'>Ad Soyad : </span>{' '}
                            {payment.name} {payment.surname}{' '}
                            <span className='red-text'>Ödenen Miktar : </span>{' '}
                            {payment.amountMoney}
                            {'₺'}{' '}
                            <span className='red-text'>Ödeme Tipi : </span>{' '}
                            {payment.paymentType}
                          </li>
                        </ul>
                      );
                    }
                  })}
                <div>
                  <ul className='collection'>
                    <li className='collection-item'>
                      {' '}
                      <span className='red-text'>Nakit : </span> {cashTotal} ₺
                      ---{' '}
                      <span className='red-text'>
                        <span className='red-text'>Kredi : </span> :{' '}
                      </span>{' '}
                      {creditTotal} ₺ ={' '}
                      <span className='red-text'>Toplam : </span>{' '}
                      {cashTotal + creditTotal} ₺
                    </li>
                  </ul>
                </div>
              </div>
              <div className='card-panel z-depth-2 blue lighten-3 center'>
                  <span>Borçlu Olanlar</span>
                </div>
                {examiniationFee &&
                  examiniationFee.map((res, index) => {
                    if (patients) {
                      return patients.map((patient) => {
                        if (res.patientId === patient._id)
                          return (
                            <div>
                              <ul className='collection' key={res.id}>
                                <li className='collection-item'>
                                  Ad soyad : {patient.name} {patient.surname}
                                  <i
                                    onClick={this.handleShowExamClick.bind(
                                      this,
                                      patient
                                    )}
                                    className='material-icons right'
                                  >
                                    account_circle
                                  </i>
                                </li>
                              </ul>
                            </div>
                          );
                      });
                    }
                  })}
            </div>
            

            <div className='col s12 m6'>
              <div className='card-content grey-text text-darken-3'>
                <div className='card-panel z-depth-2 blue lighten-3 center'>
                  <span>Gelen Hastalar</span>
                </div>
              </div>
              <div>
              {examiniation &&
                examiniation.map((res) => {
                  if (patients)
                    return patients.map((patient) => {
                      if (
                        res.createDate === searchReportDate &&
                        res.patientId === patient._id
                      ) {
                        return (
                          <ul className='collection' key={patient.id}>
                            <li className='collection-item'>
                              <span className='red-text'>Ad Soyad : </span>
                              {patient.name} {patient.surname}{' '}
                              <span className='red-text'> TC : </span>{' '}
                              {patient.tc}
                              <span className='red-text'> Telefon : </span>{' '}
                              {patient.phone}
                            </li>
                          </ul>
                        );
                      }
                    });
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
