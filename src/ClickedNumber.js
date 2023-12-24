const ClickedNumber = ({type,payload,dispatcher}) => {
    return (
        <button onClick={() => dispatcher({type,payload})}>{payload}</button>
    )
}

export default ClickedNumber;
