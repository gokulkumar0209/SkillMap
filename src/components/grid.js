"use client";
import React from "react";

const GridVisualization = ({ dataMatrix, onSelectUser }) => {
	const renderTable = (matrix) => {
		if (!matrix.length) return null;

		const headers = matrix[0] || []; // First row is headers
		const rows = matrix.slice(1); // Rest are rows

		return (
			<div className="overflow-x-auto relative">
				{/* Scrollable table container */}
				<div className="overflow-x-auto">
					<table
						className="table-auto border-collapse border border-gray-300"
						style={{ width: "1200px", height: "600px" }}
					>
						{/* Table Header */}
						<thead className="bg-gray-200">
							<tr>
								{headers.slice(0, 20).map((header, index) => (
									<th
										key={index}
										className={`border border-gray-300 px-1 py-1 text-xs ${
											index === 0
												? "w-60 sticky left-0 bg-gray-200 z-10"
												: "w-10"
										}`}
									>
										{index > 0 ? (
											<button
												value={header}
												onClick={() => onSelectUser(header)}
												className="text-xs px-2 py-1 bg-blue-500 text-white rounded"
											>
												A-B
											</button>
										) : null}
									</th>
								))}
							</tr>
						</thead>
						{/* Table Body */}
						<tbody>
							{rows.map((row, rowIndex) => (
								<tr key={rowIndex}>
									{row.slice(0, 20).map((cell, colIndex) => (
										<td
											key={colIndex}
											className={`border border-gray-300 px-1 py-1 text-xs ${
												colIndex === 0
													? "w-40 font-bold sticky left-0 bg-white z-10" // Keep first column sticky
													: rowIndex >= 3
													? cell === 0
														? "bg-white w-20"
														: cell === 1
														? "bg-yellow-200 w-20"
														: cell === 2
														? "bg-green-300 w-20"
														: cell === 3
														? "bg-green-600 w-20"
														: cell === 4
														? "bg-green-950 w-20"
														: cell === 5
														? "bg-black w-20"
														: ""
													: ""
											}`}
										>
											{colIndex === 0 || rowIndex < 3 ? cell : ""}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	return <div>{renderTable(dataMatrix)}</div>;
};

export default GridVisualization;
