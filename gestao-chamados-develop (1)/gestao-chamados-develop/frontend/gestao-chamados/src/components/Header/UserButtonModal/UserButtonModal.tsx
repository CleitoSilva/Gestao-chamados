import { FC, ReactNode } from "react";
import { AnimatedContainer } from "../../AnimatedContainer";
import { AiOutlineUser as UserIcon } from "react-icons/ai";
import "./UserButtonModal.css";
import { Divider } from "../../Divider/Divider";

interface UserButtonModal{
    children:ReactNode;
    isOpen:boolean;
    items:{label:string; icon:ReactNode}[];
    onClose:()=>void;
    onClickItem:(index:number)=>void;
    userName:string;
}
export const UserButtonModal:FC<UserButtonModal> = ({children, isOpen, items, onClickItem, onClose, userName}) => {
	return   (
		<div className="user-button-modal-container">
			{children}
			{isOpen && (
				<>
					<div onClick={()=>onClose()} className="user-button-modal-overlay">
					</div>
					<div className="user-button-modal">
						<AnimatedContainer style={{display:"flex", flexDirection:"column", padding:0 }}> 
							<div>
								<UserIcon size={20}/>
								{userName}
							</div>
							<Divider style={{height:1, backgroundColor:"#fff"}}/>
						</AnimatedContainer>
						{items.map((item, index)=>(
							<AnimatedContainer style={{display:"flex", padding:0}} key={index}> 
								<button onClick={()=>onClickItem(index)}>
									{item.icon}
									{item.label}
								</button>
							</AnimatedContainer>
						))}
					</div>
				</>
			)}
		</div>

	); 
};
