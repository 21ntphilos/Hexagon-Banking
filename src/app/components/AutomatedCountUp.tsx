'use client'
import React from 'react'
import CountUp from 'react-countup'

const AutomatedCountUp = ({amount}:{amount:number}) => {
  return (
    <div className="w-full">
        <CountUp 
        prefix='$'
        decimals={2}
        start={0}
        end={amount}/>
    </div>
  )
}

export default AutomatedCountUp