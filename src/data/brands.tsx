import { ImageProps } from "react-native"

export interface IBrand {
    image?: ImageProps,
    name: string
}

export const brands: Array<IBrand> = [
    {
        name: "Adidas",
        image: require('../assets/images/adidas.png'),
    },
    {
        name: "Nike",
        image: require('../assets/images/nike.png'),
    },
    {
        name: "Adidas",
        image: require('../assets/images/adidas.png'),
    },
    {
        name: "Nike",
        image: require('../assets/images/nike.png'),
    },
    {
        name: "Adidas",
        image: require('../assets/images/adidas.png'),
    },
    {
        name: "Nike",
        image: require('../assets/images/nike.png'),
    },
    {
        name: "Nike",
        image: require('../assets/images/nike.png'),
    },
]