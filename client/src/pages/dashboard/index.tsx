import {useUser} from "@clerk/clerk-react" 
import { FinacialRecordForm } from "./financial-record-form"
import { FinacialRecordList } from "./financial-record-list"

export const Dashboard = () => {
    const {user} = useUser()
  return (
    <div className="dashboard-container">

        <h1>Welcome {user?.firstName}! Here Are Your Fiances: </h1>
        <FinacialRecordForm />
        <FinacialRecordList />
        
    </div>
  )
}


