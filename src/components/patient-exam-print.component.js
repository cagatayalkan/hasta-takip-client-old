import React from 'react';
import PrintComponents from 'react-print-components';


const divStyle = {
  fontSize: '12px',
};

const PatientDetailPrint = ({ patient, patientDetail }) => {
  return (
    <div>
      <PrintComponents trigger={<i className='material-icons right'>print</i>}>
        <div style={divStyle}>
          <div>
            <table className='responsive-table'>
              <thead>
                <tr>
                  <th>Adı</th>
                  <th>Soyadı</th>
                  <th>Yaşı</th>
                  <th>Cinsiyet</th>
                  <th>Tc</th>
                  <th>Telefon</th>
                  <th>Adres</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{patient.name}</td>
                  <td>{patient.surname}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.tc}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <ul className='collection'>
              <li className='collection-item'>
                Muayene Tarihi : {patientDetail.createDate} Saati :{' '}
                {patientDetail.createTime}
              </li>
              <li className='collection-item'>
                Şikayet : {patientDetail.complaint}
              </li>
              <li className='collection-item'>
                Özgeçmiş : {patientDetail.profileDesc}{' '}
              </li>
              <li className='collection-item'>
                Fizik Muayene : {patientDetail.examiniation}{' '}
              </li>
              <li className='collection-item'>EKG : {patientDetail.ekg}</li>
              <li className='collection-item'>EKO : {patientDetail.eko}</li>
              <li className='collection-item'>
                İlaç : {patientDetail.medicament}
              </li>
              <li className='collection-item'>
                Tanisyon : {patientDetail.bloodPressure}
              </li>
              <li className='collection-item'>
                Kan Şekeri : {patientDetail.bloodSugar}
              </li>
              <li className='collection-item'>
                Laboratuvar : {patientDetail.lab}
              </li>
              <li className='collection-item'>
                Sonuç : {patientDetail.patientDesc}
              </li>
            </ul>
          </div>
        </div>
      </PrintComponents>
    </div>
  );
};

export default PatientDetailPrint;
