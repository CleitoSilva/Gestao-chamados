import { FC } from "react";
import { IIcon } from "../../interfaces/Iicon";


export const ToolKit:FC<IIcon> = ({size, color="#fff"}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 160 160" fill="none">
            <path d="M45.07 122.5L66.355 101.215L59.285 94.1445L38 115.43L34.035 111.465C33.0974 110.527 31.8258 110.001 30.5 110.001C29.1742 110.001 27.9026 110.527 26.965 111.465L6.965 131.465C6.02765 132.402 5.50107 133.674 5.50107 135C5.50107 136.325 6.02765 137.597 6.965 138.535L21.965 153.535C22.9026 154.472 24.1742 154.998 25.5 154.998C26.8258 154.998 28.0974 154.472 29.035 153.535L49.035 133.535C49.9724 132.597 50.4989 131.325 50.4989 130C50.4989 128.674 49.9724 127.402 49.035 126.465L45.07 122.5ZM25.5 142.93L17.57 135L30.5 122.07L38.43 130L25.5 142.93Z" fill={color}/>
            <path d="M120.5 150C112.546 149.991 104.921 146.827 99.297 141.203C93.673 135.579 90.5093 127.954 90.5 120C90.5022 117.386 90.8554 114.785 91.55 112.265L48.24 68.9501C45.7186 69.6447 43.1154 69.9978 40.5 70.0001C35.6122 70.0196 30.7941 68.8398 26.4684 66.564C22.1426 64.2881 18.4412 60.9859 15.6887 56.9467C12.9362 52.9075 11.2166 48.2547 10.6807 43.3963C10.1448 38.5378 10.809 33.6221 12.615 29.0801L15.405 21.9751L31.965 38.5351C32.9168 39.4453 34.1831 39.9532 35.5 39.9532C36.817 39.9532 38.0832 39.4453 39.035 38.5351C39.4997 38.0712 39.8684 37.5201 40.12 36.9136C40.3715 36.307 40.501 35.6568 40.501 35.0001C40.501 34.3434 40.3715 33.6932 40.12 33.0866C39.8684 32.4801 39.4997 31.929 39.035 31.4651L22.465 14.8951L29.58 12.1101C34.1225 10.3052 39.0383 9.64206 43.8966 10.1787C48.7549 10.7154 53.4075 12.4356 57.4464 15.1884C61.4854 17.9413 64.7875 21.6428 67.0633 25.9686C69.3391 30.2943 70.5191 35.1123 70.5 40.0001C70.4978 42.6138 70.1446 45.2154 69.45 47.7351L112.765 91.0501C115.285 90.3564 117.886 90.0032 120.5 90.0001C125.388 89.9806 130.206 91.1604 134.532 93.4362C138.857 95.7121 142.559 99.0143 145.311 103.054C148.064 107.093 149.783 111.746 150.319 116.604C150.855 121.462 150.191 126.378 148.385 130.92L145.6 138.025L129.035 121.465C128.083 120.556 126.818 120.049 125.503 120.049C124.187 120.049 122.922 120.556 121.97 121.465C121.505 121.929 121.136 122.479 120.884 123.086C120.632 123.692 120.502 124.342 120.502 124.999C120.501 125.656 120.63 126.306 120.881 126.913C121.132 127.52 121.501 128.071 121.965 128.535L138.53 145.1L131.42 147.89C127.945 149.272 124.24 149.988 120.5 150ZM50.815 57.3801L103.115 109.69L101.92 112.735C100.749 115.663 100.291 118.827 100.585 121.966C100.878 125.105 101.914 128.13 103.607 130.789C105.3 133.449 107.602 135.668 110.322 137.263C113.042 138.857 116.102 139.782 119.25 139.96L114.895 135.61C113.502 134.217 112.397 132.563 111.643 130.743C110.889 128.923 110.501 126.973 110.501 125.003C110.501 123.033 110.889 121.082 111.643 119.262C112.397 117.442 113.502 115.788 114.895 114.395C117.753 111.667 121.552 110.144 125.503 110.144C129.453 110.144 133.252 111.667 136.11 114.395L140.46 118.75C140.281 115.602 139.356 112.542 137.761 109.822C136.165 107.102 133.946 104.8 131.286 103.107C128.626 101.414 125.601 100.378 122.462 100.085C119.322 99.7916 116.158 100.249 113.23 101.42L110.185 102.615L57.885 50.3151L59.085 47.2651C60.255 44.3372 60.7118 41.1731 60.4177 38.0338C60.1236 34.8946 59.087 31.8703 57.3935 29.2107C55.7001 26.5511 53.3983 24.3325 50.6783 22.7379C47.9582 21.1433 44.8979 20.2186 41.75 20.0401L46.1 24.3901C47.4932 25.783 48.5983 27.4367 49.3523 29.2568C50.1062 31.0768 50.4943 33.0276 50.4943 34.9976C50.4943 36.9676 50.1062 38.9184 49.3523 40.7384C48.5983 42.5585 47.4932 44.2122 46.1 45.6051C43.2425 48.3336 39.4435 49.8561 35.4925 49.8561C31.5415 49.8561 27.7425 48.3336 24.885 45.6051L20.535 41.2501C20.7132 44.398 21.6378 47.4584 23.2324 50.1784C24.827 52.8984 27.0458 55.2001 29.7056 56.8932C32.3655 58.5863 35.3899 59.6223 38.5292 59.9156C41.6685 60.2089 44.8326 59.7511 47.76 58.5801L50.815 57.3801Z" fill={color}/>
            <path d="M146.115 14.251C143.257 11.5225 139.458 10 135.507 10C131.557 10 127.758 11.5225 124.9 14.251L87.5 51.651L94.57 58.721L131.97 21.321C132.922 20.412 134.188 19.9048 135.505 19.9048C136.822 19.9048 138.088 20.412 139.04 21.321C139.975 22.2599 140.5 23.531 140.5 24.856C140.5 26.181 139.975 27.452 139.04 28.391L101.64 65.791L108.71 72.866L146.11 35.466C148.92 32.6509 150.498 28.8359 150.498 24.8585C150.498 20.881 148.925 17.066 146.115 14.251Z" fill={color}/>
        </svg>
    );
};