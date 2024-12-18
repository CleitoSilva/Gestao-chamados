import { IoMdRefresh as RefreshIcon } from "react-icons/io";
import { FaPlus as PlusIcon } from "react-icons/fa";
import "./IndexUser.css";
import {Modal} from "../../../../components/Modal/Modal";
import TabAdmin from "../../User/components/TabAdmin/TabAdmin";
import { AdminEnum } from "../../enums/admin.enum";
import { useManageUserDataTable } from "../hooks/useManageDataTable";
import { UsersList } from "../components/UsersList/UsersList";
import { CreateUser } from "../components/CreateUser/CreateUser";
import { Button } from "../../../../components/Button";

export const IndexUser: React.FC = () => {
	const {
		users,
		currPage,
		setCurrPage,
		creating,
		setIsCreating,
		handleRefresh,
		handleUpdateUser,
		handleDeleteUser,
		selectedId,
		setSelectedId
	} = useManageUserDataTable();

	return (
		<article className="users-index-container">
			<header className="users-index-header">
				<TabAdmin activeTab={AdminEnum.User} />
				<div className="actions-users">
					<Button className="refresh">
						<RefreshIcon size={24} />
					</Button>
					<Button onClick={() => {
						setIsCreating(true);
						setSelectedId(undefined);
					}}>
						<PlusIcon size={24} />
					</Button>
					{/* <button>
                            <FilterIcon />
                        </button> 
					*/}
				</div>
			</header>
			<UsersList
				users={users}
				currPage={currPage}
				setCurrPage={setCurrPage}
				handleUpdateUser={handleUpdateUser}
				handleDeleteUser={handleDeleteUser}
			/>
			<Modal isOpen={creating} onClose={() => setIsCreating(false)}>
				<CreateUser close={() => setIsCreating(false)} refresh={handleRefresh} idUser={selectedId} />
			</Modal>
		</article>
		
	);
};