import React from 'react'
import Headbox from '../components/Headbox'
import TotalBalanceBox from '../components/TotalBalanceBox'

const Main = () => {
    const loggedInUser = {firstName : "Nolly"}
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <Headbox
                title='Welcome'
                subtext='Welcome to your Dashboard'
                type='greeting'
                user= {loggedInUser?.firstName || "Guest"}
                />
                <TotalBalanceBox
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1340.85}
                />
            </header>
        </div>
    </section>
  )
}

export default Main