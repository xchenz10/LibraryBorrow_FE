import React from 'react'
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllRents from './AllRents';
import InStock from './InStock';
import { useNavigate } from 'react-router-dom';



function DashBords() {

  const nav = useNavigate()
  const SuperUser = JSON.parse(localStorage.getItem("isSuperUser"))
  const isSuerUser = SuperUser ?? false
  const [key, setKey] = useState('home')

  
    return (<>
    {isSuerUser ? (
      <div style={{direction: 'rtl'}}>
      <Tabs id="controlled-tab-example" activeKey={key}
        onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="home" title="מלאי ספרים">
        <InStock/>      
        </Tab>
        <Tab eventKey="profile" title="כל ההזמנות">
          <AllRents/>
        </Tab>
      </Tabs>
      </div>

    ) : (<div className='container' onChange={()=>{nav('')}}>
      אופס, חזרו לדף הבית
      
    </div>) }
    </>
  )
}

export default DashBords