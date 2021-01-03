import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from '../config/config';

export default class EditPatient extends Component {
  constructor(props) {
    super(props);

 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeTC = this.onChangeTC.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);    
    //this.onChangeAge = this.onChangeAge.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        name: '',
        surname: '',
       // age: '',
        tc: '',
        phone: '',
        mail: '',
        description: '',
        gender: '',

    }
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  onChangeSurname(e) {
    this.setState({
      surname: e.target.value
    })
  }
//   onChangeAge(e) {
//     this.setState({
//       age: e.target.value
//     })
//   }
  onChangeTC(e) {
    this.setState({
      tc: e.target.value
    })
  }

  onChangeMail(e) {
    this.setState({
      mail: e.target.value
    })
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  componentDidMount() {
      console.log("**id"+this.props.location.state.id)
    axios.get(BASE_URL+'/patients/'+this.props.location.state.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          surname: response.data.surname,
          tc: response.data.tc,
          phone: response.data.phone,
          mail: response.data.mail,
          description: response.data.description,
          gender: response.data.gender
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onSubmit(e) {
    e.preventDefault();

    const patient = {
        name: this.state.name,
        surname: this.state.surname,
        tc: this.state.tc,
        phone: this.state.phone,
        mail: this.state.mail,
        description: this.state.description,
        gender: this.state.gender
    }

    console.log(patient);

    axios.post(BASE_URL+'/patients/update/' + this.props.location.state.id, patient)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
        <div>
        <h3>Hasta Bilgi Kayıdı Güncelle</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Adı : </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
                   <label>Soyadı : </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.surname}
                onChange={this.onChangeSurname}
                />
                   <label>TC : </label>
            <input  type="text"
                
                className="form-control"
                value={this.state.tc}
                onChange={this.onChangeTC}
                />
                   <label>Telefon : </label>
            <input  type="text"
                
                className="form-control"
                value={this.state.phone}
                onChange={this.onChangePhone}
                />
                   <label>Mail : </label>
            <input  type="text"
                
                className="form-control"
                value={this.state.mail}
                onChange={this.onChangeMail}
                />
                   <label>Açıklama : </label>
            <input  type="text"
                
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
                <label>Cinsiyet : </label>
            <input  type="text"
                
                className="form-control"
                value={this.state.gender}
                onChange={this.onChangeGender}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}