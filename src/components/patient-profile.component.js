import React, { Component } from 'react';
import axios from 'axios';
import PatientDetailPrint from '../components/patient-exam-print.component'
import { BASE_URL } from '../config/config';

export default class PatientProfile extends Component {
  state = {
    patient: '',
    payment: [],
    examiniation  : []
  };
  componentDidMount() {
    this.setState({
      patient: this.props.location.state.patient,
    });

    const patientId = this.props.location.state.patient._id;
    console.log("2131231  "+patientId )
    axios
      .get(BASE_URL+'/payments/getPatientPayment/' + patientId)
      .then((response) => {
        this.setState({ payment: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(BASE_URL+'/examiniations/getPatientExaminiation/' + patientId)
      .then((response) => {
        this.setState({ examiniation: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleDeletePayment = (patientDetail, e) => {
    e.preventDefault();
    const result = window.confirm('Ödemeyi Silmek Üzeresiniz Emin misiniz?');
    if (result) this.props.deletePayment(patientDetail);
  };
  handleDeleteClick = (examinationId, e) => {
    e.preventDefault();
    const result = window.confirm(
      "Hastayı Kaydını Silmek Üzeresiniz Emin misiniz?"
    );
    
    axios.delete(BASE_URL+'/examiniations/'+examinationId)
    .then(response => { console.log(response.data)});
  };
  handeEditClick = (examinationId, e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/editExamination",
      state: {
        examinationId: examinationId
      }
    });
  };
  handlePrintClick = (patient, patientDetail, e) => {
    this.props.history.push({
      pathname: '/print',
      state: {
        patient: patient,
        patientDetail: patientDetail,
      },
    });
  };
  onClickHandlePayment = (key, e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/payment',
      state: {
        patient: key,
      },
    });
  };

  render() {
    const { patient, payment ,examiniation} = this.state;
    
    return (
      <div className='dashboard'>
        <div className='row'>
          <div className='col s12 m6'>
            <div className='card-content grey-text text-darken-3'>
              <div className='card-panel z-depth-2 blue lighten-3 center'>
                <span> Hasta Profil Bilgileri</span>
              </div>

              <ul className='collection'>
                <li className='collection-item'>
                  İsim Soyisim : {patient.name} {patient.surname}
                </li>
                <li className='collection-item'>
                  Doğum Tarihi : {patient.age}{' '}
                </li>
                <li className='collection-item'>
                  Cinsiyet : {patient.gender}{' '}
                </li>
                <li className='collection-item'>Telefon : {patient.phone} </li>
                <li className='collection-item'>TC : {patient.tc} </li>
                <li className='collection-item'>Email : {patient.mail} </li>
                <li className='collection-item'>Adres : {patient.address}</li>
                <li className='collection-item'>Açıklama : {patient.desc}</li>

                <li className='collection-item'>
                  Kayıt Tarihi :{patient.createDate}
                </li>
              </ul>
              <div className='card-panel z-depth-2 blue lighten-3 center'>
                <span>
                  {' '}
                  Ücret ve Ödemeler{' '}
                  <i
                    onClick={this.onClickHandlePayment.bind(this, patient)}
                    className='material-icons right'
                  >
                    payment
                  </i>
                </span>
              </div>
              <h5>Ödemeler</h5>

              {payment &&
                payment.map((res) => {
                  if (res.patientId === patient._id) {
                    return (
                      <ul className='collection' key={res.id}>
                        <li className='collection-item'>
                          Ücret : {res.amountMoney}{' '}
                        </li>
                        <li className='collection-item'>
                          Ödeme Tarihi : {res.createDate}{' '}
                        </li>
                      </ul>
                    );
                  }
                })}
            </div>
          </div>

          <div className='col s12 m5'>
            <div className='card-panel z-depth-2 blue lighten-3 center'>
              <span> Muayene Bilgileri</span>
            </div>
            <div>
            {examiniation &&
                  examiniation.map(res => {
                
                      return (
                        <ul className="collection" key={res._id}>
                          <li className="collection-item">
                            {" "}
                            <i
                              onClick={this.handleDeleteClick.bind(this, res._id)}
                              className="material-icons right"
                            >
                              delete
                            </i>
                            <i
                              onClick={this.handeEditClick.bind(this, res._id)}
                              className="material-icons right"
                            >
                              edit
                            </i>
                            <span>
                              <PatientDetailPrint
                                patient={patient}
                                patientDetail={res}
                              />
                            </span>
                            <span className="red-text">Şikayet : </span>
                            {res.complaint}
                          </li>
                          <li className="collection-item">
                            {" "}
                            <span className="red-text">Özgeçmiş : </span>{" "}
                            {res.profileDesc}
                          </li>
                          <li className="collection-item">
                            {" "}
                            <span className="red-text">Fizik Muayene : </span>
                            {res.examiniation}
                          </li>
                          <li className="collection-item">
                            {" "}
                            <span className="red-text">EKG : </span>
                            {res.ecg}
                          </li>
                          <li className="collection-item">
                            {" "}
                            <span className="red-text">EKO : </span>
                            {res.eko}
                          </li>
                          <li className="collection-item">
                            {" "}
                            <span className="red-text">İlaç : </span>
                            {res.medicament}
                          </li>
                          <li className="collection-item">
                            {" "}
                            <span className="red-text">Tansiyon : </span>
                            {res.bloodPressure}
                          </li>
                          <li className="collection-item">
                            <span className="red-text">Kan Şekeri : </span>
                            {res.bloodSugar}
                          </li>
                          <li className="collection-item">
                            {" "}
                            <span className="red-text">SO2 : </span>
                            {res.so2}
                          </li>
                          <li className="collection-item">
                            <span className="red-text">Laboratuvar : </span>
                            {res.lab}
                          </li>
                          <li className="collection-item">
                            <span className="red-text">Sonuç : </span>
                            {res.description}
                          </li>
                          <li className="collection-item">
                            {" "}
                            <span className="red-text">Ücret : </span>
                            {res.fee}
                          </li>
                          <li className="collection-item">
                            {" "}
                            <span className="red-text">Muayene Tarihi : </span>
                            {res.createDate}
                          </li>
                        </ul>
                      );
                
                  })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
