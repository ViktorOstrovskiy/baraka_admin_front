import {deleteProfession, getProfessions, getProfessionsById} from "../../pages/Home/actions.js";
import {useEffect, useState} from "react";
import './Professions.scss';
import ReactPaginate from "react-paginate";
import EditSvg from "../UI/Icons/EditSvg.jsx";
import ModalUpdate from "./Modals/Update.jsx";
import CopySvg from "../UI/Icons/CopySvg.jsx";
import ArrowLeftSvg from "../UI/Icons/ArrowLeftSvg.jsx";
import DeleteSvg from "../UI/Icons/DeleteSvg.jsx";
import Input from "../UI/Input/index.jsx";

const Professions = ({selectedProfession, setSelectedProfession, step, setStep}) => {
    const [listProfession, setListProfession] = useState(null);
    const [page, setPage] = useState(1);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [currentProfession, setCurrentProfession] = useState(null);
    const [createCopyProfession, setCreateCopyProfession] = useState(false);
    const [keyWordsListForProfession, setKeyWordsListForProfession] = useState(null);
    const [pageKeyWords, setPageKeyWords] = useState(1);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [search, setSearch] = useState('');

    const handleClickSelectedProfession = async (profession) => {
        await setSelectedProfession(profession);
        setStep(2);
        loadProfessionsById(profession.profession_id);
    }

    const loadProfessionsById = async (profession_id) => {
        const resp = await getProfessionsById(pageKeyWords, profession_id);
        if (resp) {
            setKeyWordsListForProfession(resp)
        }
    };

    const handleOpenUpdate = (profession) => {
        setCurrentProfession(profession);
        setIsOpenUpdate(true);
    }

    const handleOpenCopy = (profession) => {
        if(!selectedProfession) return;
        setCreateCopyProfession(true);
        setCurrentProfession(profession);
        setIsOpenUpdate(true);
    }

    const handleCloseUpdate = (profession) => {
        setCreateCopyProfession(false);
        setCurrentProfession(null);
        setIsOpenUpdate(false);
    }

    const changePage = (pages) => {
        setPage(pages.selected + 1);
    };

    const loadData = async () => {
        const resp = await getProfessions(page, search);
        if (resp) {
            setListProfession(resp);
        }
    };

    useEffect(() => {
        loadData();
    }, [page]);


    const handleDeleteProfession = async (id) => {
        if(isLoadingDelete) return;
        setIsLoadingDelete(true);
        await deleteProfession(id);
        await loadProfessionsById(selectedProfession.profession_id);
        setIsLoadingDelete(false)
    }

    const handleClickBack = () => {
        setKeyWordsListForProfession(null);
        setStep(1);
        selectedProfession(null);
        setPageKeyWords(1);
    }


    useEffect(() => {
        if(selectedProfession !== null) {
            loadProfessionsById(selectedProfession.profession_id);
        }
    },[])


    const handleClickSearch = async () => {
        setIsLoadingSearch(true);
        setPage(1)
        const resp = await getProfessions(1, search);
        if (resp) {
            setListProfession(resp);
        }
        setIsLoadingSearch(false);
    }


    return (

        <div className='Profession'>
            {step === 1 &&
                <div className='Profession-form'>
                <div className='SearchProfessions-search-content'>
                    <div className='SearchProfessions-search'>
                        <Input placeholder='Enter a query to search for profession name...' onChange={(e) => setSearch(e.target.value)} value={search}/>
                        <button onClick={handleClickSearch} disabled={isLoadingSearch}>
                            {isLoadingSearch ? 'Searching' : 'Search'}
                        </button>
                    </div>
                </div>

                <div className="Table">
                <div className="Table-head">
                    <div className="Table-head-item AccountList-item">Category name</div>
                    <div className="Table-head-item AccountList-item">Profession name</div>
                    <div className="Table-head-actions AccountList-item"></div>
                </div>
                <div className="Table-body">
                    {(listProfession !== null  && (listProfession?.data || [])?.length !== 0) ? (
                        (listProfession?.data || []).map((item) => (
                            <div className="Table-body-row" key={item.id}>
                                <div className="Table-body-row-item  AccountList-item">{item.category_name ?? '-'}</div>
                                <div
                                    className="Table-body-row-item  AccountList-item">{item.profession_name ?? '-'}</div>
                                <div className="Table-body-row-actions  AccountList-item">

                                    <EditSvg onClick={() => handleClickSelectedProfession(item)}/>
                                </div>
                            </div>

                        ))
                    ) : (
                        <div className="Table-no-content">No data available yet</div>
                    )}
                </div>
                <div className="Table-footer">
                    <div className="Table-pagination">
                        {listProfession?.pagination.total > listProfession?.pagination.limit && (
                            <ReactPaginate
                                previousLabel="<"
                                nextLabel=">"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={listProfession.pagination.total / listProfession?.pagination.limit}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={1}
                                onPageChange={changePage}
                                containerClassName="pagination"
                                activeClassName="active"
                                forcePage={page - 1}
                            />
                        )}
                    </div>
                </div>
            </div>
                </div>
                }
            {step === 2 && <div className="Table">
                <div className="Table-head" style={{justifyContent: 'space-between'}}>
                    <div className="Table-head-item AccountList-item"> <div onClick={handleClickBack} className='Profession-back-title'><ArrowLeftSvg/> {selectedProfession?.profession_name}</div> </div>
                    <div className="Table-head-actions AccountList-item"><CopySvg onClick={() => handleOpenCopy(selectedProfession)}/></div>
                </div>
                <div className="Table-body">
                    {(keyWordsListForProfession !== null && (keyWordsListForProfession?.data || [])?.length !== 0) ? (
                        (keyWordsListForProfession.data || []).map((item) => (
                            <div className="Table-body-row"  style={{justifyContent: 'space-between'}} key={item.id}>
                                <div
                                    className="Table-body-row-item  AccountList-item">{item.id}: <em>{item.profession_name},</em> {item.keyWords.join(', ') ?? '-'}, <em>{item.category_name}</em> </div>
                                <div className="Table-body-row-actions  AccountList-item">

                                    <EditSvg onClick={() => handleOpenUpdate(item)}/>
                                    {item.primary_flag !== 1 && <DeleteSvg onClick={() => handleDeleteProfession(item.id)}/>}
                                </div>
                            </div>

                        ))
                    ) : (
                        <div className="Table-no-content">No data available yet</div>
                    )}
                </div>
                <div className="Table-footer">
                    <div className="Table-pagination">
                        {keyWordsListForProfession?.pagination.total > keyWordsListForProfession?.pagination.limit && (
                            <ReactPaginate
                                previousLabel="<"
                                nextLabel=">"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={keyWordsListForProfession.pagination.total / keyWordsListForProfession?.pagination.limit}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={1}
                                onPageChange={changePage}
                                containerClassName="pagination"
                                activeClassName="active"
                                forcePage={page - 1}
                            />
                        )}
                    </div>
                </div>
            </div>}
            {isOpenUpdate && <ModalUpdate create={createCopyProfession} isOpen={isOpenUpdate} closeModal={handleCloseUpdate} profession={currentProfession} loadData={() => loadProfessionsById(selectedProfession.profession_id)}/>}
        </div>
    )
}


export default Professions;
