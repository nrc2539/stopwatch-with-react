import React from 'react'
import { Row, Col } from 'antd';

function DisplayTimeComponent({time}) {
	const {hour, minute, second, millisec} = time
	const displayHour = hour === 0 ? '' : hour < 10 ? <Col><h1>{`0${hour}`}</h1></Col> : <Col><h1>{hour}</h1></Col>
	return (
		<div>
			<Row justify="center" gutter={[16]}>
				{displayHour}
				{displayHour ? <Col><h1>:</h1></Col> : ''}
				<Col><h1>{minute < 10 ? `0${minute}` : minute}</h1></Col>
				<Col><h1>:</h1></Col>
				<Col><h1>{second < 10 ? `0${second}` : second}</h1></Col>
				<Col><h1>:</h1></Col>
				<Col><h1 style={{color:'lightblue'}}>{millisec < 10 ? `0${millisec}` : millisec}</h1></Col>
			</Row>
		</div>
	)
}

export default DisplayTimeComponent;