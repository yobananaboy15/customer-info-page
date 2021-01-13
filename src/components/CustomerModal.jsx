import React, {useState} from 'react'
import {ModalForm} from '../components/ModalForm'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export const CustomerModal = () => {
    const [show, setShow] = useState(false)

    const toggleModal = () =>{
        setShow(!show)
    }

    return (
        <>
            <Button onClick={toggleModal}>Add customer</Button>
            <Modal show={show} onHide={toggleModal}>
                <Modal.Header closeButton>
                <Modal.Title>Create new customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalForm /> {/*Skicka med funktion för att stänga?*/}
                </Modal.Body>

            </Modal>
        </>
    )
}
