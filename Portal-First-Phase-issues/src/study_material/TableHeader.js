import React from 'react';
import './Trial.css';
function TableHeader()
{
	return(
		<table style={{backgroundColor:"#d9d9d9"}}>
		<tr>
		<th>FileName</th>
		<th>Branch</th>
		<th>CourseNumber</th>
		<th>Uploaded By</th>
		<th>Link</th>
		</tr>
		</table>
		)
}

export default TableHeader;