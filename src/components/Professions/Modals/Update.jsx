import React, {useEffect, useState} from 'react';
import Modal from "../../UI/Modal/index.jsx";
import './FromProfession.scss'
import Input from "../../UI/Form/Input/index.jsx";
import Button from "../../UI/Form/Button/index.jsx";
import {createProfession, updateProfession} from "../../../pages/Home/actions.js";


const ModalUpdate = ({ isOpen, closeModal, profession, loadData, create }) => {
    const [values, setValues] = useState({
        keyWords: '',
    })

    const [isLoading, setIsLoading] = useState(false);

    const handleClickSave = async () => {
        if(isLoading) return;
        if(!profession.id) return;


        if(!create) {
            setIsLoading(true);
            const {id, ...remainOptions} = profession;

            const options = {
                ...remainOptions,
                keyWords: values.keyWords.split(','),
                primary_flag: remainOptions.primary_flag === 1
            }

            const resp = await updateProfession(id, options)

            if(resp) {
                await loadData();
                closeModal();
            }
            setIsLoading(false);
        }


        if(create) {
            setIsLoading(true);
            const {id, ...remainOptions} = profession;

            const options = {
                ...remainOptions,
                keyWords: values.keyWords.split(','),
                primary_flag: false
            }

            const resp = await createProfession(options)

            if(resp) {
                await loadData();
                closeModal();
            }
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(profession.keyWords.length !== 0) {
            if(!create) {
                setValues({...values, keyWords: profession.keyWords.join(',')})
            }
        }
    },[])

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            title={`${create ?'Create' :'Edit'} Profession`}
        >
            {!create ? <div className='UpdateProfessionForm'>
                <Input placeholder='Key words' value={values.keyWords}
                       onChange={(value) => setValues({...values, keyWords: value})}/>
                <Button onClick={handleClickSave} disabled={values.keyWords.length === 0}>Save</Button>
            </div> :
                <div className='UpdateProfessionForm'>
                    <Input placeholder='Key words' value={values.keyWords}
                           onChange={(value) => setValues({...values, keyWords: value})}/>
                    <Button onClick={handleClickSave} disabled={values.keyWords.length === 0}>Save</Button>
                </div>
            }

        </Modal>
    );
};

export default ModalUpdate;
