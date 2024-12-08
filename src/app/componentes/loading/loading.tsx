import cat from '@/app/images/cat3.gif';
import Image from "next/image";
import styles from "./loading.module.css"; 

export default function loading() {
    return(
        <div className={styles.overlay}>
         
         <Image src={cat} alt="loading" className={styles.image} />

         </div>
         
      
        
    
    )
}