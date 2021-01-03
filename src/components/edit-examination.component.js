import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/config';

export default class PatientExamination extends Component {
  state = {
    description: '',
    ecg: '',
    complaint: '',
    examiniation: '',
    profileDesc: '',
    fee: '',
    eko: '',
    medicament: '',
    bloodPressure: '',
    bloodSugar: '',
    so2: '',
    lab: ''
   // file: ''
  };
  constructor(props) {
    super(props);
  }
  changeHandle = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const examiniation = {
      description: this.state.description,
      ecg: this.state.ecg,
      complaint: this.state.complaint,
      examiniation: this.state.examiniation,
      profileDesc: this.state.profileDesc,
      fee: this.state.fee,
      eko: this.state.eko,
      medicament: this.state.medicament,
      bloodPressure: this.state.bloodPressure,
      bloodSugar: this.state.bloodSugar,
      so2: this.state.so2,
      lab: this.state.lab
    };
   
     
    axios
      .post(BASE_URL+'/examiniations/update/'+ this.props.location.state.examinationId, examiniation)
      .then(res => console.log(res.data));

    this.setState({
      description: '',
      ecg: '',
      complaint: '',
      examiniation: '',
      profileDesc: '',
      fee: null,
      eko: '',
      medicament: '',
      bloodPressure: '',
      bloodSugar: '',
      so2: '',
      lab: '',
      file: ''
    });
    this.props.history.goBack();
  };

  componentDidMount() {
    
    axios.get('http://localhost:5000/examiniations/'+this.props.location.state.examinationId)
    .then(response => {
      this.setState({
        description: response.data.description,
        ecg: response.data.ecg,
        complaint: response.data.complaint,
        examiniation: response.data.examiniation,
        profileDesc: response.data.profileDesc,
        fee: response.data.fee,
        eko: response.data.eko,
        medicament: response.data.medicament,
        bloodPressure: response.data.bloodPressure,
        bloodSugar: response.data.bloodSugar,
        so2: response.data.so2,
        lab: response.data.lab
      })   
    })
    .catch(function (error) {
      console.log(error);
    })
  
  }

  render() {
    const {
      description,
      ecg,
      complaint,
      examiniation,
      profileDesc,
      fee,
      eko,
      medicament,
      bloodPressure,
      bloodSugar,
      so2,
      lab
      //file
    } = this.state;

    return (
      <div>
        <h3>Muayene Formu Güncelle</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Şikayet : </label>
            <textarea
              id='complaint'
              className='form-control'
              onChange={this.changeHandle}
              value={complaint}
            ></textarea>
            <label>Özgeçmiş : </label>
            <textarea
              id='profileDesc'
              className='form-control'
              onChange={this.changeHandle}
              value={profileDesc}
            ></textarea>
            <label>Fizik Muayene: </label>
            <input
              type='text'
              className='form-control'
              id='examiniation'
              onChange={this.changeHandle}
              value={examiniation}
            />
            <label>EKG: </label>
            <input
              type='text'
              id='ecg'
              className='form-control'
              onChange={this.changeHandle}
              value={ecg}
            />
            <label>EKO: </label>
            <input
              className='form-control'
              type='text'
              id='eko'
              onChange={this.changeHandle}
              value={eko}
            />
            <label>İlaç: </label>
            <textarea
              className='form-control'
              id='medicament'
              onChange={this.changeHandle}
              value={medicament}
            ></textarea>
            <label>Tansiyon: </label>
            <input
              className='form-control'
              type='text'
              id='bloodPressure'
              onChange={this.changeHandle}
              value={bloodPressure}
            />
            <label>SO2: </label>
            <input
              className='form-control'
              type='text'
              id='so2'
              onChange={this.changeHandle}
              value={so2}
            />
            <label>Kan Şekeri: </label>
            <input
              className='form-control'
              type='text'
              id='bloodSugar'
              onChange={this.changeHandle}
              value={bloodSugar}
            />
            <label>Laboratuvar: </label>
            <input
              className='form-control'
              type='text'
              id='lab'
              onChange={this.changeHandle}
              value={lab}
            />
            <label>Sonuç </label>
            <textarea
              className='form-control'
              id='description'
              onChange={this.changeHandle}
              value={description}
            ></textarea>
            <label>Ücret </label>
            <input
              id='fee'
              className='form-control'
              type='number'
              onChange={this.changeHandle}
              value={fee}
            ></input>
           
          </div>
          <div className='form-group'>
            <input type='submit' value='Güncelle' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}

