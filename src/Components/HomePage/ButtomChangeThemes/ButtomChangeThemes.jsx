import { useContext} from 'react'
import { TodoContext } from '@/src/Context/TodoContext'
import IconSun from '../../IconsSvgr/IconSun/IconSun'
import IconMoon from '../../IconsSvgr/IconMoon/IconMoon'


const ButtomChangeThemes = () => {

    const {isDarkModeActive,
           SwitchToDarkModeOrLightModeFunc} = useContext(TodoContext)

           
  return (
    <>
        <div onClick={SwitchToDarkModeOrLightModeFunc}>
            { 
            isDarkModeActive ? 
            (
                <IconSun/> 
            ) : (
                <IconMoon/>
            )
            }
        </div>
    </>
  )
}

export default ButtomChangeThemes