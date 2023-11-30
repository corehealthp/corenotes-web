import ImageComponent from "../ImageComponent";
import styles from "./userimage.module.css";

export default function UserImage({
    imageUrl, fullname, size, fontSize
}:{imageUrl:string, fullname:string, size?:string, fontSize?:string}) {

    return (
        <div className={styles.container}>
            {
                !imageUrl
                ?   <ImageComponent
                        src={imageUrl}
                        width={size}
                        height={size}
                        extraStyles={styles.image}
                    />
                :   <div 
                        className={styles.image_placeholder} 
                        style={{width:size, height:size, fontSize:fontSize}}
                    >
                        { fullname?.split('')[0]?.toUpperCase() }
                    </div>
            }
        </div>
    );
}