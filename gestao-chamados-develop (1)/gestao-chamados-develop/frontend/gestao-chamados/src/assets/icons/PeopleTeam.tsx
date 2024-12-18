import { FC } from "react";
import { IIcon } from "../../interfaces/Iicon";

export const PeopleTeam:FC<IIcon> = ({size, color="#fff"}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 160 160" fill="none">
            <path d="M98.86 66.6667C105.3 66.6667 110.527 71.8933 110.527 78.3333V109.993C110.527 117.952 107.365 125.584 101.738 131.211C96.1106 136.839 88.4783 140 80.52 140C72.5617 140 64.9294 136.839 59.3021 131.211C53.6747 125.584 50.5133 117.952 50.5133 109.993V78.3333C50.5133 71.8933 55.7333 66.6667 62.18 66.6667H98.86ZM98.86 76.6667H62.18C61.738 76.6667 61.314 76.8423 61.0015 77.1548C60.6889 77.4674 60.5133 77.8913 60.5133 78.3333V109.993C60.5133 115.299 62.6212 120.388 66.3732 124.14C70.1251 127.892 75.2139 130 80.52 130C85.8261 130 90.9149 127.892 94.6669 124.14C98.4188 120.388 100.527 115.299 100.527 109.993V78.3333C100.527 77.8913 100.351 77.4674 100.039 77.1548C99.726 76.8423 99.302 76.6667 98.86 76.6667ZM25.5 66.6667H48.04C45.688 69.5073 44.2516 72.9937 43.92 76.6667H25.5C25.058 76.6667 24.6341 76.8423 24.3215 77.1548C24.0089 77.4674 23.8333 77.8913 23.8333 78.3333V99.9933C23.8329 102.513 24.4034 104.999 25.5018 107.266C26.6003 109.533 28.1982 111.522 30.1755 113.083C32.1529 114.644 34.4582 115.737 36.9184 116.279C39.3786 116.821 41.9297 116.799 44.38 116.213C44.9467 119.573 45.98 122.78 47.4 125.76C43.4485 126.817 39.3069 126.951 35.2953 126.152C31.2837 125.353 27.5097 123.642 24.265 121.151C21.0203 118.66 18.3919 115.457 16.5831 111.788C14.7743 108.119 13.8334 104.084 13.8333 99.9933V78.3333C13.8333 71.8933 19.06 66.6667 25.5 66.6667ZM113 66.6667H135.5C141.94 66.6667 147.167 71.8933 147.167 78.3333V100C147.168 104.088 146.229 108.121 144.423 111.788C142.616 115.455 139.991 118.658 136.75 121.149C133.509 123.64 129.739 125.353 125.731 126.155C121.722 126.956 117.583 126.826 113.633 125.773C115.06 122.787 116.093 119.58 116.667 116.22C119.114 116.798 121.66 116.815 124.115 116.27C126.57 115.725 128.869 114.631 130.841 113.07C132.813 111.51 134.407 109.524 135.502 107.26C136.598 104.997 137.167 102.515 137.167 100V78.3333C137.167 77.8913 136.991 77.4674 136.679 77.1548C136.366 76.8423 135.942 76.6667 135.5 76.6667H117.12C116.788 72.9937 115.352 69.5073 113 66.6667ZM80.5 20C85.8043 20 90.8914 22.1071 94.6421 25.8579C98.3929 29.6086 100.5 34.6957 100.5 40C100.5 45.3043 98.3929 50.3914 94.6421 54.1421C90.8914 57.8929 85.8043 60 80.5 60C75.1957 60 70.1086 57.8929 66.3579 54.1421C62.6071 50.3914 60.5 45.3043 60.5 40C60.5 34.6957 62.6071 29.6086 66.3579 25.8579C70.1086 22.1071 75.1957 20 80.5 20ZM123.833 26.6667C128.254 26.6667 132.493 28.4226 135.618 31.5482C138.744 34.6738 140.5 38.9131 140.5 43.3333C140.5 47.7536 138.744 51.9928 135.618 55.1184C132.493 58.2441 128.254 60 123.833 60C119.413 60 115.174 58.2441 112.048 55.1184C108.923 51.9928 107.167 47.7536 107.167 43.3333C107.167 38.9131 108.923 34.6738 112.048 31.5482C115.174 28.4226 119.413 26.6667 123.833 26.6667ZM37.1667 26.6667C41.5869 26.6667 45.8262 28.4226 48.9518 31.5482C52.0774 34.6738 53.8333 38.9131 53.8333 43.3333C53.8333 47.7536 52.0774 51.9928 48.9518 55.1184C45.8262 58.2441 41.5869 60 37.1667 60C32.7464 60 28.5072 58.2441 25.3816 55.1184C22.2559 51.9928 20.5 47.7536 20.5 43.3333C20.5 38.9131 22.2559 34.6738 25.3816 31.5482C28.5072 28.4226 32.7464 26.6667 37.1667 26.6667ZM80.5 30C77.8478 30 75.3043 31.0536 73.4289 32.9289C71.5536 34.8043 70.5 37.3478 70.5 40C70.5 42.6522 71.5536 45.1957 73.4289 47.0711C75.3043 48.9464 77.8478 50 80.5 50C83.1522 50 85.6957 48.9464 87.5711 47.0711C89.4464 45.1957 90.5 42.6522 90.5 40C90.5 37.3478 89.4464 34.8043 87.5711 32.9289C85.6957 31.0536 83.1522 30 80.5 30ZM123.833 36.6667C122.065 36.6667 120.37 37.369 119.119 38.6193C117.869 39.8695 117.167 41.5652 117.167 43.3333C117.167 45.1014 117.869 46.7971 119.119 48.0474C120.37 49.2976 122.065 50 123.833 50C125.601 50 127.297 49.2976 128.547 48.0474C129.798 46.7971 130.5 45.1014 130.5 43.3333C130.5 41.5652 129.798 39.8695 128.547 38.6193C127.297 37.369 125.601 36.6667 123.833 36.6667ZM37.1667 36.6667C35.3986 36.6667 33.7029 37.369 32.4526 38.6193C31.2024 39.8695 30.5 41.5652 30.5 43.3333C30.5 45.1014 31.2024 46.7971 32.4526 48.0474C33.7029 49.2976 35.3986 50 37.1667 50C38.9348 50 40.6305 49.2976 41.8807 48.0474C43.131 46.7971 43.8333 45.1014 43.8333 43.3333C43.8333 41.5652 43.131 39.8695 41.8807 38.6193C40.6305 37.369 38.9348 36.6667 37.1667 36.6667Z" fill={color}/>
        </svg>
    );
};
