import './Categories.scss';
import CategoriesList from "./List/index.jsx";
import {useState,useEffect} from "react";
import SearchCategories from "./Search/index.jsx";


const Categories = () => {
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
        <div className='Categories'>
            <div className='Categories-tabs'>
                <div onClick={() => handleChangeTab(1)} className={`Categories-tabs-item ${activeTab === 1 && 'active'}`}>
                    Categories
                </div>
                <div onClick={() => handleChangeTab(2)} className={`Categories-tabs-item ${activeTab === 2 && 'active'}`}>
                    Categories Search
                </div>
            </div>
            <div className='Categories-content'>
                {activeTab === 1 && <CategoriesList selectedProfession={selectedProfession} setSelectedProfession={setSelectedProfession} step={step} setStep={setStep}/>}
                {activeTab === 2 && <SearchCategories handleClickItemSearch={handleClickItemSearch}/>}
            </div>
        </div>
    )
}


export default Categories
