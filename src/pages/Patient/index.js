import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_PATIENTS,
  CREATE_PATIENT_SUB,
  DELETE_PATIENT_SUB,
  UPDATE_PATIENT_SUB
} from "./queries";
import { Row, Col } from "antd";
import styles from "./styles.module.css";

function Patient() {
  const { subscribeToMore, data, loading } = useQuery(GET_ALL_PATIENTS);

  useEffect(() => {
    // veri değiştiğinde reactta kullanılması için useEffect hooku kullanıldı.
    subscribeToMore({
      document: CREATE_PATIENT_SUB, // dinlenilecek sorgu
      updateQuery: (
        prev, // mevcut durum
        { subscriptionData } // dinlenen kanaldan gelen
      ) => {
        if (!subscriptionData.data) return prev;

        return {
          patients: [...prev.patients, subscriptionData.data.patientCreated], // posts tanımı cache olarak tutulan veri keyinden alındı
        };
      },
    });
    subscribeToMore({
      document: DELETE_PATIENT_SUB, // dinlenilecek sorgu
      updateQuery: (
        prev, // mevcut durum
        { subscriptionData } // dinlenen kanaldan gelen
      ) => {
        if (!subscriptionData.data) return prev;

        const list = prev.patients.filter(
          (patient) => patient.id !== subscriptionData.data.patientDeleted.id
        );

        console.log(list);

        return {
          patients: list, // posts tanımı cache olarak tutulan veri keyinden alındı
        };
      },
    });
    subscribeToMore({
      document: UPDATE_PATIENT_SUB, // dinlenilecek sorgu
      updateQuery: (
        prev, // mevcut durum
        { subscriptionData } // dinlenen kanaldan gelen
      ) => {
        if (!subscriptionData.data) return prev;

        const list = prev.patients.filter(
          (patient) => patient.id !== subscriptionData.data.patientUpdated.id
        );

        

        return {
          patients: [...list, subscriptionData.data.patientUpdated],
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) {
    return <>Loading...</>;
  }

  const horse_patient = data.patients.filter(
    (patient) => patient.company === "Horse"
  );
  const renault_patient = data.patients.filter(
    (patient) => patient.company === "Renault"
  );

  return (
    <>
      <Row className={styles.container} gutter={24}>
        <Col span={12}>
          <h1>Bekleme Listesi</h1>
          <Row gutter={24}>
            <Col span={10} className={styles.list}>
              <h2>Renault</h2>

              {renault_patient &&
                renault_patient.map(
                  (patient) =>
                    patient.status === "bekle" && (
                      <p className={styles.listItems} key={patient.id}>
                        {patient.registration_number}
                      </p>
                    )
                )}
            </Col>
            <Col span={10} className={styles.list}>
              <h2>Horse</h2>

              {horse_patient &&
                horse_patient.map(
                  (patient) =>
                    patient.status === "bekle" && (
                      <p key={patient.id}>{patient.registration_number}</p>
                    )
                )}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24} className={styles.call}>
              <h1>Poliklinik - 1: Renault</h1>
              <h2>
                {renault_patient &&
                  renault_patient.map(
                    (patient) =>
                      patient.status === "gel" && (
                        <p className={styles.callItem} key={patient.id}>
                          {patient.registration_number}
                        </p>
                      )
                  )}
              </h2>
            </Col>
            <Col span={24} className={styles.call}>
              <h1>Poliklinik - 4: Horse</h1>
              <h2>
                {horse_patient &&
                  horse_patient.map(
                    (patient) =>
                      patient.status === "gel" && (
                        <p className={styles.callItem} key={patient.id}>
                          {patient.registration_number}
                        </p>
                      )
                  )}
              </h2>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Patient;
