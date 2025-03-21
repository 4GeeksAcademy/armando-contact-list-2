import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light p-3 ">
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Crear nuevo Contacto</button>
				</Link>
			</div>
		</nav>
	);
};
