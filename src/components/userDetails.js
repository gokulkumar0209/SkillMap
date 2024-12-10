"use client";
import React, { useState } from "react";

const UserDetails = ({ selectedId }) => {
	const [userDetails, setUserDetails] = useState(null);

	React.useEffect(() => {
		if (selectedId) {
			const fetchUserDetails = async () => {
				try {
					const response = await fetch(
						`https://forinterview.onrender.com/people/${selectedId}`
					);
					const data = await response.json();
					setUserDetails(data);
				} catch (error) {
					console.error("Error fetching user details:", error);
				}
			};

			fetchUserDetails();
		}
	}, [selectedId]);

	if (!selectedId) {
		return <p className="text-gray-500">No user selected</p>;
	}

	if (!userDetails) {
		return <p className="text-gray-500">Loading user details...</p>;
	}

	return (
		<div className="border p-4 rounded bg-gray-100 shadow">
			<h3 className="text-lg font-bold">User Details</h3>
			<p>
				<strong>Name:</strong> {userDetails.name}
			</p>
			<p>
				<strong>Email:</strong> {userDetails.email}
			</p>
			<p>
				<strong>ID:</strong> {userDetails.id}
			</p>
		</div>
	);
};

export default UserDetails;
