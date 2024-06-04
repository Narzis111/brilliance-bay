import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'

const CreatorMenu = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label='Add Contest' address='addContest' />
      <MenuItem icon={MdHomeWork} label='My Created Contest' address='myCreated' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Submission Against My Contest'
        address='submitted'
      />
  
    </>
  )
}

export default CreatorMenu