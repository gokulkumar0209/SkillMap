"use client";
import React, { useEffect, useState } from "react";
import GridVisualization from "@/components/grid";
import UserDetails from "@/components/userDetails";
import UserList from "@/components/userList";
import convertMatrix from "@/operation/convertMatrix";

function Page() {
	const [dataMatrix, setDataMatrix] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [userList, setUserList] = useState([]);

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const response = await fetch(
					"https://forinterview.onrender.com/people/"
				);
				const initialData = await response.json();
				setUserList(initialData); // Populate the user list

				const detailedData = await Promise.all(
					initialData.map((user) =>
						fetch(`https://forinterview.onrender.com/people/${user.id}`).then(
							(res) => res.json()
						)
					)
				);
				const matrix = convertMatrix(detailedData) || [];
				setDataMatrix(matrix);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchInitialData();
	}, []);

	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="col-span-1 space-y-4">
				<UserList
					users={userList}
					onSelectUser={(id) => setSelectedUserId(id)}
				/>
				<UserDetails selectedId={selectedUserId} />
			</div>
			<div className="col-span-2">
				<GridVisualization
					dataMatrix={dataMatrix}
					onSelectUser={(id) => setSelectedUserId(id)}
				/>
			</div>
		</div>
	);
}

export default Page;
