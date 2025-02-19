import {useEffect, useState} from "react";
import './WorkTypeList.scss';
import ReactPaginate from "react-paginate";
import ModalUpdate from "./Modals/Update.jsx";
import EditSvg from "../../../components/UI/Icons/EditSvg.jsx";
import DeleteSvg from "../../../components/UI/Icons/DeleteSvg.jsx";
import ArrowLeftSvg from "../../../components/UI/Icons/ArrowLeftSvg.jsx";
import CopySvg from "../../../components/UI/Icons/CopySvg.jsx";
import {deleteWorkType, getWorkType, getWorkTypeById} from "../action.js";

const WorkTypeList = ({selectedProfession, setSelectedProfession, step, setStep}) => {
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
        loadProfessionsById(profession.name);
    }

    const loadProfessionsById = async (name) => {
        const resp = await getWorkTypeById(pageKeyWords, name);
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
        const resp = await getWorkType(page, search);
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
        await deleteWorkType(id);
        await loadProfessionsById(selectedProfession.name);
        setIsLoadingDelete(false)
    }

    const handleClickBack = () => {
        setKeyWordsListForProfession(null);
        setStep(1);
        setSelectedProfession(null);
        setPageKeyWords(1);
    }


    useEffect(() => {
        if(selectedProfession !== null) {
            loadProfessionsById(selectedProfession.name);
        }
    },[])


    const handleClickSearch = async () => {
        setIsLoadingSearch(true);
        setPage(1)
        const resp = await getWorkType(1, search);
        if (resp) {
            setListProfession(resp);
        }
        setIsLoadingSearch(false);
    }


    return (

        <div className='WorkTypeList'>
            {step === 1 &&
                <div className='WorkTypeList-form'>
                <div className="Table">
                <div className="Table-head">
                    <div className="Table-head-item AccountList-item">Work type Name</div>
                    <div className="Table-head-actions AccountList-item"></div>
                </div>
                <div className="Table-body">
                    {(listProfession !== null  && (listProfession?.data || [])?.length !== 0) ? (
                        (listProfession?.data || []).map((item) => (
                            <div className="Table-body-row" style={{cursor: 'pointer'}} key={item.id}  onClick={() => handleClickSelectedProfession(item)}>
                                <div className="Table-body-row-item">{item.name ?? '-'}</div>
                                <div className="Table-body-row-actions">

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
                    <div className="Table-head-item AccountList-item"> <div onClick={handleClickBack} className='Profession-back-title'><ArrowLeftSvg/> {selectedProfession?.name}</div> </div>
                    <div className="Table-head-actions AccountList-item"><CopySvg onClick={() => handleOpenCopy(selectedProfession)}/></div>
                </div>
                <div className="Table-body">
                    {(keyWordsListForProfession !== null && (keyWordsListForProfession?.data || [])?.length !== 0) ? (
                        (keyWordsListForProfession.data || []).map((item) => (
                            <div className="Table-body-row"  style={{justifyContent: 'space-between'}} key={item.id}  onClick={() => handleOpenUpdate(item)}>
                                <div
                                    className="Table-body-row-item"><em>{item.id}:</em> {item.keyWords.join(', ') ?? '-'} </div>
                                <div className="Table-body-row-actions">

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
            {isOpenUpdate && <ModalUpdate create={createCopyProfession} isOpen={isOpenUpdate} closeModal={handleCloseUpdate} workType={currentProfession} loadData={() => loadProfessionsById(selectedProfession.name)}/>}
        </div>
    )
}


export default WorkTypeList;
