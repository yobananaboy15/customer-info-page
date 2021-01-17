import React, {useState} from 'react'
import {SubmitForm} from './SubmitForm'
import Modal from 'react-bootstrap/Modal'
import {Button} from "../components/Button"


export const CustomerModal = ({method, item, urlProp}) => {
    const [show, setShow] = useState(false)

    const showModal = () => {
        setShow(true)
    } 
    const closeModal = () => {
        setShow(false)
    }

    return (
        <>
            <Button onClick={showModal}>{method === 'PUT' ? 'Edit ' : 'Add '}customer</Button>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                <Modal.Title>{method === 'PUT' ? 'Edit ' : 'Add '} customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SubmitForm method={method} item={item} urlProp={urlProp} closeModal={closeModal}/> 
                </Modal.Body>

            </Modal>
        </>
    )
}
