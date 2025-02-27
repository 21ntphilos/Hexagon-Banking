import React from 'react'
import Headbox from '../components/Headbox'
import TotalBalanceBox from '../components/TotalBalanceBox'
import RigthSidebar from '../components/RigthSidebar'

const Main = () => {
    const loggedInUser = {firstName : "Nolly", lastName:"Brown", email:"Nollybrown@gmail.com" }
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
            RECENT TRANSACTION
        </div>
      <RigthSidebar user={loggedInUser} banks={[{ currentBalance: 6442.56 }, { currentBalance:64542.65}]} transactions={[]}/>
    </section>
  )
}

export default Main