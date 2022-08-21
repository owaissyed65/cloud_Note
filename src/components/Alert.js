import React from 'react'

const Alert = (props) => {
    const capitalize = (word) =>{
        if (word === 'danger'){
            word = 'Error'
        }
        const newWord = word.toLowerCase();
        return newWord.charAt(0).toUpperCase() + newWord.slice(1);
    }
  return (
    <div>
          <div style={{height:'50px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong> : {capitalize(props.alert.msg)}
            </div>}
            
            </div>
        );
    </div>
  )
}

export default Alert
