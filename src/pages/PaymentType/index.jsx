import './PaymentType.scss';
import WorkTypeList from "./List/index.jsx";
import {useState,useEffect} from "react";
import SearchWorkType from "./Search/index.jsx";


const PaymentType = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [selectedProfession, setSelectedProfession] = useState(null);
    const [step, setStep] = useState(1);


    const handleChangeTab = (tab) => {
        setActiveTab(tab);
    }


    useEffect(() => {
        if(activeTab === 2) {
            setSelectedProfession(null);
            setStep(1)
        }
    },[activeTab])


    const handleClickItemSearch = (item) => {
        setActiveTab(1);
        setStep(2);
        setSelectedProfession(item);
    }

    return (
        <div className='PaymentType'>
            <div className='PaymentType-tabs'>
                <div onClick={() => handleChangeTab(1)} className={`PaymentType-tabs-item ${activeTab === 1 && 'active'}`}>
                    Payment type
                </div>
                <div onClick={() => handleChangeTab(2)} className={`PaymentType-tabs-item ${activeTab === 2 && 'active'}`}>
                    Payment type Search
                </div>
            </div>
            <div className='WorkType-content'>
                {activeTab === 1 && <WorkTypeList selectedProfession={selectedProfession} setSelectedProfession={setSelectedProfession} step={step} setStep={setStep}/>}
                {activeTab === 2 && <SearchWorkType handleClickItemSearch={handleClickItemSearch}/>}
            </div>
        </div>
    )
}


export default PaymentType;
