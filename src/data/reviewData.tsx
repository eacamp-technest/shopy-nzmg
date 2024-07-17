import { ImageProps } from "react-native"

export interface IReview {
    avatar?: ImageProps,
    name: string,
    date?: string,
    comment: string,
    rate: number,
}

export const reviews: Array<IReview> = [
    {
        name: "Robert Fox",
        avatar: require('../assets/images/reviewer_1.png'),
        date: 'yesterday',
        comment: "Customer service was great. From the moment we walked in to the moment we checked out everyone was nice and helpful. Shoe variety was good and loved the shoes.",
        rate: 4

    },
    {
        name: "Cameron Williamson",
        avatar: require('../assets/images/reviewer_2.png'),
        date: 'today',
        comment: " Andrew at the store was super helpful. Very quick and encouraging with a pair of shoes I was unsure of. They also had great sale going on. Shout outs to everyone there.",
        rate: 4.5
    },
    {
        name: "Tom Sawyer",
        avatar: require('../assets/images/reviewer_3.png'),
        date: '15 Jul, 2024',
        comment: "Steph was friendly and explained All of Shoppay reward programs in complete detail. I appreciated this. Truly wish would have been in the loop sooner!",
        rate: 5
    },
    {
        name: "Guy Hawkins",
        avatar: require('../assets/images/reviewer_4.png'),
        date: '01 May ,2024',
        comment: " Andrew at the store was super helpful. Very quick and encouraging with a pair of shoes I was unsure of. They also had great sale going on. Shout outs to everyone there.",
        rate: 4

    },
]