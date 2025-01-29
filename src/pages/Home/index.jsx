import './Home.scss';
import {useEffect, useState} from "react";
import {searchNews} from "../Main/action.js";
import {getProfessions} from "./actions.js";
import SearchProfessions from "../../components/SearchProfessions/index.jsx";




const Home = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleChangeTab = (tab) => {
        setActiveTab(tab);
    }


    const loadData = async () => {
        const resp = await getProfessions();
        console.log('resp',resp)
    }

    useEffect(() => {
        loadData();
    },[])

    return (
        <div className='Home'>
            <div className='Home-tabs'>
                <div onClick={() => handleChangeTab(1)} className={`Home-tabs-item ${activeTab === 1 && 'active'}`}>
                    Primary Professions
                </div>
                <div onClick={() => handleChangeTab(2)} className={`Home-tabs-item ${activeTab === 2 && 'active'}`}>
                    Cloned Professions
                </div>
                <div onClick={() => handleChangeTab(3)} className={`Home-tabs-item ${activeTab === 3 && 'active'}`}>
                    Profession Search
                </div>
            </div>
            <div className='Home-content'>
                {activeTab === 3 && <SearchProfessions/>}
            </div>
        </div>
    )
}


export default Home
