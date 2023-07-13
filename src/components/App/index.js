import { Col, Row } from "antd";
import { Route, Routes } from "react-router-dom";
import DoctorRenault from "../../pages/DoctorRenault";
import Nurse from "../../pages/Nurse";
import Patient from "../../pages/Patient";
import styles from "./styles.module.css";
import DoctorHorse from "../../pages/DoctorHorse";


function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col span={20} className={styles.content}>
          <Routes>
            <Route path="/patient" element={<Patient />} />
            <Route path="/" element={<Nurse />} />
            <Route path="/doctor_renault" element={<DoctorRenault />} />
            <Route path="/doctor_horse" element={<DoctorHorse />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
