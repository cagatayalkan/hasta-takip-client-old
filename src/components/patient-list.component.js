import React, { Component } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { BASE_URL } from '../config/config';

export default class PatientList extends Component {
  constructor(props) {
    super(props);

    this.state = { patients: [], selectedRow: null };
  }

  componentDidMount() {

    axios
      .get(BASE_URL+'/patients/')
      .then((response) => {
        this.setState({ patients: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onClickHandleExamination = (e, key) => {
    this.props.history.push({
      pathname: '/examination',
      state: {
        patientId: key._id,
      },
    });
  };
  onClickHandleUpdateUser = (e, key) => {
    console.log('---id' + key._id);
    this.props.history.push({
      pathname: '/updatePatient',
      state: {
        id: key._id,
      },
    });
  };
  onClickHandleShowProfile = (e, key) => {
    this.props.history.push({
      pathname: '/profile',
      state: {
        patient: key,
      },
    });
  };
  onClickHandlePayment = (e, key) => {
    this.props.history.push({
      pathname: '/payment',
      state: {
        patient: key,
      },
    });
  };
  onClickHandleDelete = (e, key) => {
    const result = window.confirm(
      'Hastayı Kaydını Silmek Üzeresiniz Emin misiniz?'
    );
    axios
      .delete(BASE_URL+'/patients/' + key._id)
      .then((response) => {
        console.log(response.data);
      });
  };

  render() {
    return (
      <div>
        <MaterialTable
          title='Hasta Takip Listesi'
          columns={[
            { title: 'Adı', field: 'name' },
            { title: 'Soyadı', field: 'surname' },
            { title: 'Telefon', field: 'phone' },
            { title: ' TC Kimlik Numarası', field: 'tc' },
            { title: 'Doğum Tarihi', field: 'age', type: 'numeric' },
            { title: 'Cinsiyet', field: 'gender' },
            { title: 'Adres', field: 'address' },
            { title: 'Email', field: 'mail' },
          ]}
          options={{
            exportButton: true,
            pageSize: 10,
            headerStyle: {
              backgroundColor: '#4db6ac',
              color: '#FFF ',
            },
            rowStyle: (rowData) => ({
              backgroundColor:
                this.state.selectedRow &&
                this.state.selectedRow.tableData.id === rowData.tableData.id
                  ? '#dce775'
                  : '#FFF',
            }),
          }}
          data={this.state.patients}
          onRowClick={(evt, selectedRow) => this.setState({ selectedRow })}
          actions={[
            {
              icon: 'account_circle',
              tooltip: 'Tüm Bilgiler',
              onClick: (event, rowData) =>
                this.onClickHandleShowProfile(this, rowData),
            },
            {
              icon: 'add',
              tooltip: 'Muayene',
              onClick: (event, rowData) =>
                this.onClickHandleExamination(this, rowData),
            },
            {
              icon: 'update',
              tooltip: 'Hasta Güncelle',
              onClick: (event, rowData) =>
                this.onClickHandleUpdateUser(this, rowData),
            },
            {
              icon: 'payment',
              tooltip: 'Tahsilat',
              onClick: (event, rowData) =>
                this.onClickHandlePayment(this, rowData),
            },
            {
              icon: 'delete',
              tooltip: 'Hasta Sil',
              onClick: (event, rowData) =>
                this.onClickHandleDelete(this, rowData),
            },
          ]}
        />
      </div>
    );
  }
}
