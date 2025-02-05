import './Home.scss';
import {useCallback, useEffect, useState} from "react";
import SearchProfessions from "../../components/SearchProfessions/index.jsx";
import Professions from "../../components/Professions/index.jsx";




const Home = () => {
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
        <div className='Home'>
            <div className='Home-tabs'>
                <div onClick={() => handleChangeTab(1)} className={`Home-tabs-item ${activeTab === 1 && 'active'}`}>
                    Professions
                </div>
                <div onClick={() => handleChangeTab(2)} className={`Home-tabs-item ${activeTab === 2 && 'active'}`}>
                    Profession Search
                </div>
            </div>
            <div className='Home-content'>
                {activeTab === 1 && <Professions selectedProfession={selectedProfession} setSelectedProfession={setSelectedProfession} step={step} setStep={setStep}/>}
                {activeTab === 2 && <SearchProfessions handleClickItemSearch={handleClickItemSearch}/>}
            </div>
        </div>
    )
}


export default Home
