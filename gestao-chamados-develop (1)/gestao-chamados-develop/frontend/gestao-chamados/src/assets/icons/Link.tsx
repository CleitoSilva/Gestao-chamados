import { FC } from "react";
import { IIcon } from "../../interfaces/Iicon";

export const Link:FC<IIcon> = ({size, color="#fff"}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path d="M18.2813 4.22405C17.9329 3.87445 17.5189 3.59706 17.0631 3.40779C16.6073 3.21852 16.1186 3.12109 15.6251 3.12109C15.1315 3.12109 14.6428 3.21852 14.187 3.40779C13.7312 3.59706 13.3172 3.87445 12.9688 4.22405L13.8563 5.11155C14.089 4.87887 14.3652 4.69429 14.6692 4.56836C14.9733 4.44243 15.2991 4.37762 15.6282 4.37762C15.9572 4.37762 16.2831 4.44243 16.5871 4.56836C16.8911 4.69429 17.1674 4.87887 17.4001 5.11155C17.6327 5.34424 17.8173 5.62048 17.9432 5.92449C18.0692 6.22851 18.134 6.55436 18.134 6.88343C18.134 7.21249 18.0692 7.53834 17.9432 7.84236C17.8173 8.14638 17.6327 8.42262 17.4001 8.6553L12.4001 13.6553C11.931 14.1252 11.2944 14.3896 10.6304 14.3902C9.96639 14.3907 9.32936 14.1275 8.85943 13.6584C8.3895 13.1893 8.12516 12.5528 8.12458 11.8888C8.12399 11.2248 8.3872 10.5877 8.8563 10.1178L9.73755 9.2303L8.8563 8.3428L7.9688 9.2303C7.6192 9.57869 7.34181 9.99266 7.15254 10.4485C6.96327 10.9043 6.86584 11.393 6.86584 11.8866C6.86584 12.3801 6.96327 12.8688 7.15254 13.3246C7.34181 13.7804 7.6192 14.1944 7.9688 14.5428C8.67598 15.2409 9.63135 15.6298 10.6251 15.6241C11.1205 15.6261 11.6114 15.5299 12.0695 15.3411C12.5276 15.1523 12.9437 14.8746 13.2938 14.5241L18.2938 9.52405C18.9944 8.81927 19.3866 7.86522 19.3843 6.87146C19.3819 5.87771 18.9852 4.92552 18.2813 4.22405Z" fill={color}/>
            <path d="M2.61879 15.5129C2.38541 15.2806 2.20022 15.0045 2.07386 14.7004C1.94749 14.3963 1.88244 14.0703 1.88244 13.741C1.88244 13.4117 1.94749 13.0857 2.07386 12.7816C2.20022 12.4775 2.38541 12.2014 2.61879 11.9691L7.61879 6.96913C7.85109 6.73575 8.1272 6.55056 8.43127 6.42419C8.73534 6.29783 9.06138 6.23278 9.39067 6.23278C9.71995 6.23278 10.046 6.29783 10.3501 6.42419C10.6541 6.55056 10.9302 6.73575 11.1625 6.96913C11.3944 7.20325 11.577 7.48154 11.6994 7.78751C11.8218 8.09348 11.8815 8.4209 11.875 8.75038C11.8769 9.08088 11.8133 9.40848 11.6878 9.71423C11.5623 10.02 11.3774 10.2978 11.1438 10.5316L9.81879 11.8754L10.7063 12.7629L12.0313 11.4379C12.7366 10.7326 13.1328 9.77596 13.1328 8.7785C13.1328 7.78104 12.7366 6.82444 12.0313 6.11913C11.326 5.41382 10.3694 5.01758 9.37192 5.01758C8.37446 5.01758 7.41785 5.41382 6.71254 6.11913L1.71254 11.1191C1.362 11.4676 1.08382 11.882 0.893994 12.3384C0.704168 12.7948 0.606445 13.2842 0.606445 13.7785C0.606445 14.2728 0.704168 14.7622 0.893994 15.2186C1.08382 15.675 1.362 16.0894 1.71254 16.4379C2.42431 17.1307 3.38185 17.5128 4.37504 17.5004C5.37698 17.5013 6.33862 17.1059 7.05004 16.4004L6.16254 15.5129C5.93025 15.7463 5.65413 15.9314 5.35006 16.0578C5.04599 16.1842 4.71995 16.2492 4.39067 16.2492C4.06138 16.2492 3.73534 16.1842 3.43127 16.0578C3.1272 15.9314 2.85109 15.7463 2.61879 15.5129Z" fill={color}/>
        </svg>
    );
};