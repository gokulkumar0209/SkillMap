"use client";
import React from "react";

const UserList = ({ users, onSelectUser }) => {
	return (
		<div
			className="p-4 bg-gray-100 border border-gray-300 rounded-md overflow-y-auto"
			style={{ maxHeight: "300px" }}
		>
			{users.map((user, index) => (
				<div
					key={index}
					className="cursor-pointer p-2 text-sm text-blue-600 hover:bg-blue-100"
					onClick={() => onSelectUser(user.id)}
				>
					{user.name}
				</div>
			))}
		</div>
	);
};

export default UserList;
