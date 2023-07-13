import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_PATIENT,
  UPDATE_PATIENT,
  GET_ALL_PATIENTS,
  CREATE_PATIENT_SUB,
  DELETE_PATIENT_SUB,
} from "./queries";
import { Button, Row, Col } from "antd";
import styles from "./styles.module.css";
// import useSound from "use-sound";
// import bibipSfx from "../../sound/bibip.mp3";

function DoctorRenault() {
  const { subscribeToMore, data, loading } = useQuery(GET_ALL_PATIENTS);

  // const [play] = useSound(bibipSfx);

  useEffect(() => {
    // veri değiştiğinde reactta kullanılması için useEffect hooku kullanıldı.
    subscribeToMore({
      document: CREATE_PATIENT_SUB, // dinlenilecek sorgu
      variables: {
        company: "Renault",
      },
      updateQuery: (
        prev, // mevcut durum
        { subscriptionData } // dinlenen kanaldan gelen
      ) => {
        if (!subscriptionData.data) return prev;
        
         //bibip

        return {
          patients: [...prev.patients, subscriptionData.data.patientCreated], // posts tanımı cache olarak tutulan veri keyinden alındı
        };
      },
    });
    subscribeToMore({
      document: DELETE_PATIENT_SUB, // dinlenilecek sorgu
      variables: {
        company: "Renault",
      },
      updateQuery: (
        prev, // mevcut durum
        { subscriptionData } // dinlenen kanaldan gelen
      ) => {
        if (!subscriptionData.data) return prev;
        
        const list = prev.patients.filter(
          (patient) => patient.id !== subscriptionData.data.patientDeleted.id
        );

        return {
          patients: list, // posts tanımı cache olarak tutulan veri keyinden alındı
        };
      },
    });
    // subscribeToMore({
    //   document: UPDATE_PATIENT_SUB, // dinlenilecek sorgu
    //   variables: {
    //     company: "Renault",
    //   },
    //   updateQuery: (
    //     prev, // mevcut durum
    //     { subscriptionData } // dinlenen kanaldan gelen
    //   ) => {
    //     // if (!subscriptionData.data) return prev;

    //     // const updated_index = prev.patients.findIndex(
    //     //   (patient) => patient.id === subscriptionData.data.patientUpdated.id
    //     // );

    //     // prev.patients[updated_index] = subscriptionData.data.patientUpdated

    //     // return {
    //     //   patients: prev.patients,
    //     // };
    //   },
    // });
  }, [subscribeToMore]);

  const [updatePatient, { loading: update_button_loading }] =
    useMutation(UPDATE_PATIENT);

  const [deletePatient, { loading: delete_button_loading }] =
    useMutation(DELETE_PATIENT);

  if (loading) {
    return <>Loading...</>;
  }

  const renault_patient = data.patients.filter(
    (patient) => patient.company === "Renault"
  );

  return (
    <Row gutter={24}>
      <Col xl={8} md={10}>
        <h1>Bekleyen Hastalar</h1>
        <div className={styles.list}>
          {renault_patient &&
            renault_patient.map(
              (patient) =>
                patient.status === "bekle" && (
                  <div key={patient.id} className={styles.listItem}>
                    <p>{patient.registration_number} </p>
                    <Button
                      loading={update_button_loading}
                      onClick={() =>
                        updatePatient({
                          variables: {
                            updatePatientId: patient.id,
                            data: {
                              status: "gel",
                            },
                          },
                        })
                      }
                    >
                      Çağır
                    </Button>
                  </div>
                )
            )}
        </div>
      </Col>
      <Col xl={8} md={10}>
        <h1>Çağrılan Hasta</h1>
        <div className={styles.list}>
          {renault_patient &&
            renault_patient.map(
              (patient) =>
                patient.status === "gel" && (
                  <div key={patient.id} className={styles.listItem}>
                    <p>{patient.registration_number} </p>
                    <Button
                      loading={delete_button_loading}
                      onClick={() =>
                        deletePatient({
                          variables: {
                            deletePatientId: patient.id,
                          },
                        })
                      }
                    >
                      Sil
                    </Button>
                  </div>
                )
            )}
        </div>
      </Col>
    </Row>
  );
}

export default DoctorRenault;
