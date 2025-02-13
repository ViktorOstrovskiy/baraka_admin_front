import React, {useEffect, useState} from 'react';
import './FromProfession.scss'
import Button from "../../../../components/UI/Form/Button/index.jsx";
import Modal from "../../../../components/UI/Modal/index.jsx";
import Input from "../../../../components/UI/Form/Input/index.jsx";
import {createCategories, updateCategories} from "../../action.js";


const ModalUpdate = ({ isOpen, closeModal, category, loadData, create }) => {
    const [values, setValues] = useState({
        keyWords: '',
    })

    const [isLoading, setIsLoading] = useState(false);

    const handleClickSave = async () => {
        if(isLoading) return;
        if(!category.id) return;


        if(!create) {
            setIsLoading(true);
            const {id, ...remainOptions} = category;

            const options = {
                ...remainOptions,
                keyWords: values.keyWords.length !== 0 ?  values.keyWords.split(',') : [],
                primary_flag: remainOptions.primary_flag === 1
            }

            const resp = await updateCategories(id, options)

            if(resp) {
                await loadData();
                closeModal();
            }
            setIsLoading(false);
        }


        if(create) {
            setIsLoading(true);
            const {id, ...remainOptions} = category;

            const options = {
                ...remainOptions,
                keyWords: values.keyWords.length !== 0 ?  values.keyWords.split(',') : [],
                primary_flag: false
            }

            const resp = await createCategories(options)

            if(resp) {
                await loadData();
                closeModal();
            }
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(category.keyWords.length !== 0) {
            if(!create) {
                setValues({...values, keyWords: category.keyWords.join(',')})
            }
        }
    },[])

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            title={`${create ?'Create' :'Edit'} Category`}
        >
            {!create ? <div className='UpdateProfessionForm'>
                <Input placeholder='Key words' value={values.keyWords}
                       onChange={(value) => setValues({...values, keyWords: value})}/>
                <Button onClick={handleClickSave} >Save</Button>
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
