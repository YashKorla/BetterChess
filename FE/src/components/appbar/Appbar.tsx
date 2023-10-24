import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { Modal, useTheme } from "@mui/material";
import Loginmodal from "../../utilities/Loginmodal";
import { Link } from "react-router-dom";

const Appbar = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const theme = useTheme();

	const Topbar = styled(AppBar)({
		zIndex: 3,
		boxShadow: "none",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "90px",
		padding: "32px 30px",
		[theme.breakpoints.up("laptop")]: {
			height: "120px",
			padding: "32px 40px",
		},
	});

	const TopbarText = styled(Typography)({
		fontWeight: 700,
		fontSize: "30px",
		lineHeight: "47px",
		[theme.breakpoints.up("laptop")]: {
			fontSize: "40px",
		},
	});

	const Login = styled(Button)({
		border: "solid white 1px",
		width: "100px",
		height: "42px",
	});

	const NavLink = styled(Link)({
		textDecoration: "none",
		underline: "none",
		color: "white",
	});

	return (
		<div>
			<Topbar position="fixed">
				<NavLink to="/">
					<TopbarText>Shatranj</TopbarText>
				</NavLink>
				<Login
					variant="contained"
					color="secondary"
					onClick={handleOpen}
				>
					Login
				</Login>
			</Topbar>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Loginmodal></Loginmodal>
			</Modal>
		</div>
	);
};

export default Appbar;

