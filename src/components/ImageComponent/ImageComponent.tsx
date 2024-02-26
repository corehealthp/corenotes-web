import { LazyLoadImage } from "react-lazy-load-image-component"

interface imageComponentType {
    src:string, 
    placeholder?:string,
    width?:string,
    height?:string,
    extraStyles?:string
}

export default function ImageComponent({src, placeholder, width, height, extraStyles}:imageComponentType) {
    return (
        <LazyLoadImage 
            src={src}
            placeholderSrc={placeholder}
            effect="blur"
            alt=""
            width={width}
            height={height}
            className={extraStyles}
            // onClick={()=> action?.()}
        />
    )
}