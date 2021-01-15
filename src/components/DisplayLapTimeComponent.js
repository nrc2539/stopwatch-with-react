import React from 'react'
import { Table } from 'antd';

function DisplayLapTimeComponent({listLapTime}) {
	const columns = [
		{title: 'Lap', dataIndex: 'lap', key: 'lap'},
		{title: 'Lap Time', dataIndex:'lapTimeText', key:'lapTimeText', align: 'right'},
		{title: 'Split Time', dataIndex:'splitTimeText', key:'splitTimeText', align: 'right'}
	]
	const displayTable = listLapTime.length > 0 ? <Table columns={columns} dataSource={listLapTime} pagination={{ pageSize: 5, position: ['none','bottomCenter']}}></Table> : ''
	return (
		<div className="container-laptime">
			{displayTable}
		</div>
	)
}

export default DisplayLapTimeComponent
