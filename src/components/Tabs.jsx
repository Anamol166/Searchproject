import React from 'react'

const Tabs = () => {
    const tabs = ['Photos', 'GIF', 'Videos']
    return (
        <div>
            {tabs.map(function(elem,index){
                return <button key={index}>{elem}</button>
            })}
        </div>
    )
}

export default Tabs
