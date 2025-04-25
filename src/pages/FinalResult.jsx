import React from 'react'
import { CgCheck } from 'react-icons/cg'

const FinalPage = () => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <CgCheck color='green' size={50} />
            <p>Thank you for attempting the assessment</p>
        </div>
    )
}

export default FinalPage