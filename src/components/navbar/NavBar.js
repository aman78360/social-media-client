import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./NavBar.scss";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

function NavBar() {
	const navigate = useNavigate();
	const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

	async function handleLogoutClick() {
		try {
			await axiosClient.post("/auth/logout");
			removeItem(KEY_ACCESS_TOKEN);
			navigate("/login");
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className="Navbar">
			<div className="container">
				<h2
					className="banner hover-link"
					onClick={() => {
						navigate("/");
					}}
				>
					Social Media
				</h2>
				<div className="right-side">
					<div
						className="profile hover-link"
						onClick={() => {
							navigate(`/profile/${myProfile?._id}`);
						}}
					>
						<Avatar src={myProfile?.avatar?.url} />
					</div>

					<div
						className="logout hover-link"
						onClick={handleLogoutClick}
					>
						<FiLogOut />
					</div>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
