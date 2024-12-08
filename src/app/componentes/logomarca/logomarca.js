import Image from "next/image";
import logo from '../../images/qmsalogo.jpeg'

export default function logomarca(){
    return(
    <Image 
          
    src={logo}
    alt="logo"
    width={450}
    height={250}         
   />      
    )  
}