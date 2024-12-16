import './Input.scss';



const Input = ({value, onChange, placeholder}) => {
    return (
        <div className='Input'>
            <input type="text" placeholder={placeholder} onChange={onChange} value={value}/>
        </div>
    )
}


export default Input;